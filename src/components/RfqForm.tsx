"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { rfqCategories } from "@/lib/content";
import { Btn } from "./Btn";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["pdf", "xlsx", "xls", "docx", "jpg", "jpeg", "png", "webp", "zip", "ai"];

type Status = "idle" | "sending" | "done" | "error";

const fmt = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

const input =
  "w-full border-0 border-b border-black/25 bg-transparent px-0 pb-3 pt-2 text-[16px] text-black placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-0 transition-colors";
const lbl = "wide-sm block text-[10px] text-muted";

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={lbl}>
        {label}
        {required && <span className="text-green"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}

export function RfqForm() {
  const params = useSearchParams();
  const preset = params.get("garment") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");
  const [drag, setDrag] = useState(false);
  const started = useRef(0);
  const picker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const category = useMemo(() => rfqCategories.find((c) => c.value === preset)?.value ?? "", [preset]);

  const addFiles = (list: FileList | File[]) => {
    const next = [...files];
    let err: string | null = null;
    for (const f of Array.from(list)) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED.includes(ext)) err = `"${f.name}" is not an accepted file type.`;
      else if (f.size > MAX_BYTES) err = `"${f.name}" is larger than 10 MB.`;
      else if (next.length >= MAX_FILES) {
        err = `You can attach up to ${MAX_FILES} files.`;
        break;
      } else next.push(f);
    }
    setFiles(next);
    setFileError(err);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    for (const [k, msg] of [
      ["name", "Please enter your name."],
      ["company", "Please enter your company."],
      ["email", "Please enter a valid email address."],
      ["category", "Please choose a product category."],
      ["description", "Please describe the product."],
    ] as const) {
      const v = String(fd.get(k) ?? "").trim();
      if (!v || (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))) errs[k] = msg;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));
    fd.set("elapsed", String(Date.now() - started.current));
    setStatus("sending");
    try {
      const res = await fetch("/api/rfq", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        if (data?.errors) setErrors(data.errors);
        return;
      }
      setReference(data.reference);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-black/15 p-10 md:p-14" role="status">
        <h2 className="wide text-[clamp(1.2rem,2.3vw,1.8rem)] leading-snug">Thank you.</h2>
        <p className="mt-7 text-[17px] italic leading-[1.9] text-text">Your enquiry has been received.</p>
        <p className="wide-sm mt-6 text-[10px] text-muted">Reference {reference}</p>
        <p className="mt-8 max-w-xl text-[15.5px] leading-[1.8] text-text">
          In the live site this submission is emailed securely to the Green Channels team and stored in the CMS, where it can be searched and
          exported. Nothing has been sent from this prototype.
        </p>
        <div className="mt-10">
          <Btn href="/" tone="dark">
            Back to home
          </Btn>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.form onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-14" encType="multipart/form-data">
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company website
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <fieldset className="space-y-8">
          <legend className="wide mb-8 text-[13px]">About you</legend>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <Field id="name" label="Full name" required error={errors.name}>
              <input id="name" name="name" autoComplete="name" className={input} />
            </Field>
            <Field id="company" label="Company" required error={errors.company}>
              <input id="company" name="company" autoComplete="organization" className={input} />
            </Field>
            <Field id="email" label="Email" required error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" className={input} />
            </Field>
            <Field id="phone" label="Phone / WhatsApp">
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
            </Field>
            <Field id="country" label="Country">
              <input id="country" name="country" autoComplete="country-name" className={input} />
            </Field>
            <Field id="website" label="Website">
              <input id="website" name="website" type="url" placeholder="https://" className={input} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-8">
          <legend className="wide mb-8 text-[13px]">The product</legend>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <Field id="category" label="Product category" required error={errors.category}>
              <select id="category" name="category" defaultValue={category} className={`${input} appearance-none`}>
                <option value="" disabled>
                  Select a category
                </option>
                {rfqCategories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="quantity" label="Estimated order quantity">
              <input id="quantity" name="quantity" className={input} placeholder="Per style / per programme" />
            </Field>
            <Field id="target_price" label="Target price">
              <input id="target_price" name="target_price" className={input} placeholder="Currency and unit price" />
            </Field>
            <Field id="delivery" label="Target delivery date">
              <input id="delivery" name="delivery" type="date" className={input} />
            </Field>
          </div>
          <Field id="description" label="Product description" required error={errors.description}>
            <textarea id="description" name="description" rows={4} className={`${input} resize-none`} />
          </Field>
          <Field id="materials" label="Fabric / material requirements">
            <textarea id="materials" name="materials" rows={3} className={`${input} resize-none`} />
          </Field>
          <Field id="comments" label="Additional comments">
            <textarea id="comments" name="comments" rows={3} className={`${input} resize-none`} />
          </Field>
        </fieldset>

        <fieldset>
          <legend className="wide mb-8 text-[13px]">Tech pack &amp; references</legend>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`border border-dashed p-10 text-center transition-colors ${drag ? "border-green bg-green/10" : "border-black/30 bg-paper"}`}
          >
            <input
              ref={picker}
              type="file"
              multiple
              accept={ALLOWED.map((x) => "." + x).join(",")}
              className="sr-only"
              aria-label="Attach files"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <p className="wide text-[13px]">Drag files here</p>
            <p className="mt-3 text-[15px] italic text-muted">
              or{" "}
              <button type="button" onClick={() => picker.current?.click()} className="border-b border-black text-black">
                browse your computer
              </button>
            </p>
            <p className="wide-sm mt-5 text-[9.5px] text-muted">Tech packs · PDF · XLSX · images · up to {MAX_FILES} files, 10 MB each</p>
          </div>
          {fileError && (
            <p className="mt-3 text-[13px] text-red-700" role="alert">
              {fileError}
            </p>
          )}
          {files.length > 0 && (
            <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
              {files.map((f, i) => (
                <li key={f.name + i} className="flex items-center justify-between gap-4 py-3 text-[14.5px]">
                  <span className="truncate">{f.name}</span>
                  <span className="flex shrink-0 items-center gap-5">
                    <span className="wide-sm text-[9.5px] text-muted">{fmt(f.size)}</span>
                    <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="wide-sm text-[9.5px] hover:text-green">
                      Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <div className="flex flex-col gap-6 border-t border-black/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-[13px] leading-relaxed text-muted">
            Your files are validated for type and size and delivered securely to Green Channels. We use your details only to respond to this
            enquiry. See our Privacy Policy.
          </p>
          <div className="flex flex-col items-start gap-3">
            <Btn type="submit" tone="dark" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send request"}
            </Btn>
            {status === "error" && (
              <p className="text-[13px] text-red-700" role="alert">
                Something went wrong. Please check the form and try again.
              </p>
            )}
          </div>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
