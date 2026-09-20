"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { rfqOptions } from "@/lib/content";

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["pdf", "xlsx", "xls", "docx", "doc", "jpg", "jpeg", "png", "webp", "zip", "ai"];
const STEPS = ["What you need", "Your files", "Your details"];

type Values = {
  category: string;
  description: string;
  quantity: string;
  target_price: string;
  delivery: string;
  materials: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  website: string;
};
const EMPTY: Values = {
  category: "",
  description: "",
  quantity: "",
  target_price: "",
  delivery: "",
  materials: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  website: "",
};

const fmt = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const extOf = (name: string) => (name.split(".").pop() ?? "").toLowerCase();

/* ---------- small pieces ---------- */
const box =
  "w-full rounded-lg border-2 bg-white px-4 text-[17px] text-neutral-900 placeholder:text-neutral-400 transition focus:outline-none focus:ring-4 focus:ring-action/15";
const boxOk = "border-neutral-300 focus:border-action";
const boxBad = "border-red-600 focus:border-red-600";

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const CHECK = "M5 13l4 4L19 7";
const ARROW = "M5 12h14M13 6l6 6-6 6";
const BACK = "M19 12H5M11 18l-6-6 6-6";
const CLOSE = "M6 6l12 12M18 6L6 18";

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15.5px] font-semibold text-neutral-900">
        {label}
        {optional && <span className="ml-2 text-[14px] font-normal text-neutral-500">(optional)</span>}
      </label>
      {hint && <p className="mt-1 text-[14.5px] leading-snug text-neutral-600">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-2 text-[14.5px] font-medium text-red-700">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

function fileBadge(ext: string) {
  if (ext === "pdf") return ["PDF", "bg-red-100 text-red-700"];
  if (["xls", "xlsx"].includes(ext)) return ["XLS", "bg-green-100 text-green-800"];
  if (["doc", "docx"].includes(ext)) return ["DOC", "bg-blue-100 text-blue-800"];
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return ["IMG", "bg-amber-100 text-amber-800"];
  return [ext.toUpperCase().slice(0, 3), "bg-neutral-200 text-neutral-700"];
}

/* ---------- the form ---------- */
export function RfqForm() {
  const params = useSearchParams();
  const reduce = !!useReducedMotion();
  const preset = useMemo(() => {
    const g = params.get("garment") ?? "";
    return rfqOptions.find((o) => o.value === g || o.match.includes(g))?.value ?? "";
  }, [params]);

  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>({ ...EMPTY, category: preset });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState("");
  const [drag, setDrag] = useState(false);
  const started = useRef(0);
  const top = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const picker = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  // when the step changes, bring the top of the form into view and move focus there
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    heading.current?.focus({ preventScroll: true });
  }, [step, status, reduce]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const addFiles = (list: FileList | File[]) => {
    const next = [...files];
    let err: string | null = null;
    for (const f of Array.from(list)) {
      if (!ALLOWED.includes(extOf(f.name))) err = `We can't accept "${f.name}". Please use PDF, Excel, Word, JPG, PNG or ZIP files.`;
      else if (f.size > MAX_BYTES) err = `"${f.name}" is too large. Each file can be up to 10 MB.`;
      else if (next.length >= MAX_FILES) {
        err = `You can add up to ${MAX_FILES} files. Please remove one first.`;
        break;
      } else if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    setFiles(next);
    setFileError(err);
    if (next.length && errors.description) setErrors((p) => ({ ...p, description: "" }));
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !v.category) e.category = "Please tap one option so we know what to prepare.";
    if (s === 1 && !v.description.trim() && files.length === 0) e.description = "Please write a few words about what you need, or add a file. Either one is fine.";
    if (s === 2) {
      if (!v.name.trim()) e.name = "Please tell us your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter your email address, like name@company.com.";
    }
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      requestAnimationFrame(() => document.getElementById(first)?.focus());
    }
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  async function send() {
    if (!validate(2)) return;
    const fd = new FormData();
    (Object.keys(v) as (keyof Values)[]).forEach((k) => fd.set(k, v[k]));
    files.forEach((f) => fd.append("files", f));
    fd.set("elapsed", String(Date.now() - started.current));
    fd.set("company_website", (document.getElementById("company_website") as HTMLInputElement | null)?.value ?? "");
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
    } catch {
      setStatus("error");
    }
  }

  const chosen = rfqOptions.find((o) => o.value === v.category);
  const firstName = v.name.trim().split(/\s+/)[0];

  /* ---------- success ---------- */
  if (status === "done") {
    return (
      <div ref={top} className="scroll-mt-28 font-form">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border-2 border-action/30 bg-green-50 p-8 sm:p-12" role="status">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-action text-white">
            <Icon d={CHECK} className="h-9 w-9" />
          </span>
          <h2 ref={heading} tabIndex={-1} style={{ outline: "none" }} className="mt-8 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-tight text-neutral-900">
            Thank you{firstName ? `, ${firstName}` : ""}! We&apos;ve got your request.
          </h2>
          <p className="mt-4 text-[18px] leading-relaxed text-neutral-700">
            A member of the Green Channels team will read it and reply to <strong>{v.email}</strong>.
          </p>
          <p className="mt-6 inline-block rounded-lg bg-white px-4 py-2.5 text-[15px] text-neutral-600">
            Your reference: <strong className="text-neutral-900">{reference}</strong>
          </p>
          <p className="mt-8 max-w-xl text-[14.5px] leading-relaxed text-neutral-500">
            This is a prototype, so nothing has actually been sent. On the live website your request is emailed to the team and saved securely.
          </p>
          <Link href="/" className="mt-8 inline-flex h-14 items-center rounded-lg bg-action px-8 text-[17px] font-semibold text-white transition hover:bg-action-dark">
            Back to the homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  const slide = reduce ? {} : { initial: { opacity: 0, x: 28 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -28 }, transition: { duration: 0.35 } };

  return (
    <div ref={top} className="scroll-mt-28 font-form">
      {/* progress */}
      <nav aria-label="Progress" className="mb-10">
        <ol className="flex items-center gap-3">
          {STEPS.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className="flex flex-1 items-center gap-3 last:flex-none" aria-current={current ? "step" : undefined}>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-bold transition-colors ${
                    done ? "bg-action text-white" : current ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {done ? <Icon d={CHECK} /> : i + 1}
                </span>
                <span className={`hidden text-[15px] font-semibold sm:block ${current ? "text-neutral-900" : "text-neutral-500"}`}>{label}</span>
                {i < STEPS.length - 1 && (
                  <span className="h-1 flex-1 overflow-hidden rounded bg-neutral-200">
                    <span className={`block h-full bg-action transition-all duration-500 ${done ? "w-full" : "w-0"}`} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-[15px] font-medium text-neutral-600 sm:hidden">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
      </nav>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) next();
          else send();
        }}
      >
        {/* honeypot, invisible to people */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this empty
            <input id="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} {...slide}>
            {/* ---------------- STEP 1 ---------------- */}
            {step === 0 && (
              <div>
                <h2 ref={heading} tabIndex={-1} style={{ outline: "none" }} className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight text-neutral-900">
                  What are you looking for?
                </h2>
                <p className="mt-3 text-[17px] text-neutral-600">Tap the one that fits best. You can tell us more in the next step.</p>

                <div role="radiogroup" aria-label="What are you looking for?" aria-describedby={errors.category ? "category-error" : undefined} className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                  {rfqOptions.map((o, i) => {
                    const on = v.category === o.value;
                    return (
                      <label
                        key={o.value}
                        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-white text-left transition ${
                          on ? "border-action shadow-[0_0_0_4px_rgba(29,122,62,0.15)]" : "border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                        } focus-within:ring-4 focus-within:ring-action/25`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={o.value}
                          checked={on}
                          onChange={() => {
                            setV((p) => ({ ...p, category: o.value }));
                            setErrors((p) => ({ ...p, category: "" }));
                          }}
                          className="sr-only"
                          id={i === 0 ? "category" : undefined}
                        />
                        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                          {o.image ? (
                            <Image src={o.image} alt="" fill sizes="(min-width:768px) 15vw, 45vw" className="object-cover transition duration-500 group-hover:scale-105" style={{ objectPosition: o.position }} />
                          ) : (
                            <span className="flex h-full items-center justify-center text-neutral-400">
                              <Icon d="M12 5v14M5 12h14" className="h-10 w-10" />
                            </span>
                          )}
                          {on && (
                            <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-action text-white shadow">
                              <Icon d={CHECK} />
                            </span>
                          )}
                        </span>
                        <span className={`block px-3 py-3.5 text-[15.5px] font-semibold leading-snug ${on ? "text-action" : "text-neutral-900"}`}>{o.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.category && (
                  <p id="category-error" role="alert" className="mt-4 flex items-start gap-2 text-[15px] font-medium text-red-700">
                    <span aria-hidden="true">⚠</span>
                    {errors.category}
                  </p>
                )}
              </div>
            )}

            {/* ---------------- STEP 2 ---------------- */}
            {step === 1 && (
              <div className="space-y-9">
                <div>
                  <h2 ref={heading} tabIndex={-1} style={{ outline: "none" }} className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight text-neutral-900">
                    Tell us about it
                  </h2>
                  <p className="mt-3 text-[17px] text-neutral-600">
                    You asked about: <strong className="text-neutral-900">{chosen?.label}</strong>{" "}
                    <button type="button" onClick={() => setStep(0)} className="ml-1 text-[15px] font-semibold text-action underline underline-offset-4">
                      Change
                    </button>
                  </p>
                </div>

                <Field
                  id="description"
                  label="What do you need?"
                  hint="A few words is fine. For example: 500 navy work jackets with two chest pockets, needed by March."
                  error={errors.description}
                >
                  <textarea
                    id="description"
                    rows={5}
                    value={v.description}
                    onChange={set("description")}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "description-error" : undefined}
                    className={`${box} ${errors.description ? boxBad : boxOk} min-h-36 resize-y py-3.5 leading-relaxed`}
                  />
                </Field>

                {/* upload */}
                <div>
                  <p className="text-[15.5px] font-semibold text-neutral-900">
                    Add your tech pack or pictures <span className="ml-1 text-[14px] font-normal text-neutral-500">(optional)</span>
                  </p>
                  <p className="mt-1 text-[14.5px] leading-snug text-neutral-600">
                    A tech pack is the document with your garment drawings and measurements. No tech pack? A sketch, a photo or a sample picture works too.
                  </p>

                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Add files. Drag files here or press Enter to browse your computer."
                    onClick={() => picker.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        picker.current?.click();
                      }
                    }}
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
                    className={`mt-4 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition focus:outline-none focus-visible:ring-4 focus-visible:ring-action/25 ${
                      drag ? "scale-[1.01] border-action bg-green-50" : "border-neutral-400 bg-neutral-50 hover:border-action hover:bg-green-50/60"
                    }`}
                  >
                    <input
                      ref={picker}
                      type="file"
                      multiple
                      accept={ALLOWED.map((x) => "." + x).join(",")}
                      className="sr-only"
                      tabIndex={-1}
                      aria-hidden="true"
                      onChange={(e) => {
                        if (e.target.files) addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                    <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full transition ${drag ? "bg-action text-white" : "bg-white text-action shadow-sm"}`}>
                      <Icon d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" className="h-8 w-8" />
                    </span>
                    <p className="mt-5 text-[21px] font-bold text-neutral-900">{drag ? "Drop your files here" : "Drag files here"}</p>
                    <p className="mt-1.5 text-[16.5px] text-neutral-600">
                      or <span className="font-semibold text-action underline underline-offset-4">browse your computer</span>
                    </p>
                    <p className="mt-5 text-[14px] text-neutral-500">
                      PDF, Excel, Word, JPG, PNG or ZIP · up to {MAX_FILES} files · 10 MB each
                    </p>
                  </div>

                  {fileError && (
                    <p role="alert" className="mt-3 flex items-start gap-2 text-[15px] font-medium text-red-700">
                      <span aria-hidden="true">⚠</span>
                      {fileError}
                    </p>
                  )}

                  {files.length > 0 && (
                    <div className="mt-5">
                      <p className="text-[14.5px] font-semibold text-neutral-700">
                        {files.length} {files.length === 1 ? "file" : "files"} added
                      </p>
                      <ul className="mt-2 space-y-2">
                        {files.map((f, i) => {
                          const [tag, cls] = fileBadge(extOf(f.name));
                          return (
                            <li key={f.name + f.size} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
                              <span className={`flex h-10 w-12 shrink-0 items-center justify-center rounded-md text-[12px] font-bold ${cls}`}>{tag}</span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[15.5px] font-medium text-neutral-900">{f.name}</span>
                                <span className="block text-[13.5px] text-neutral-500">{fmt(f.size)}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                                className="flex h-10 items-center gap-1.5 rounded-lg px-3 text-[14.5px] font-semibold text-neutral-600 transition hover:bg-red-50 hover:text-red-700"
                                aria-label={`Remove ${f.name}`}
                              >
                                <Icon d={CLOSE} className="h-4 w-4" /> Remove
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* optional extras, tucked away so the form stays short */}
                <details className="group rounded-xl border-2 border-neutral-200 bg-white open:border-neutral-300">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16.5px] font-semibold text-neutral-900 [&::-webkit-details-marker]:hidden">
                    <span>
                      Add quantity, date or price <span className="ml-1 text-[14px] font-normal text-neutral-500">(optional)</span>
                    </span>
                    <span className="text-action transition group-open:rotate-45" aria-hidden="true">
                      <Icon d="M12 5v14M5 12h14" className="h-6 w-6" />
                    </span>
                  </summary>
                  <div className="grid gap-6 border-t border-neutral-200 px-5 pb-6 pt-6 sm:grid-cols-2">
                    <Field id="quantity" label="How many pieces?" optional hint="A rough number is fine.">
                      <input id="quantity" value={v.quantity} onChange={set("quantity")} inputMode="numeric" className={`${box} ${boxOk} h-14`} />
                    </Field>
                    <Field id="delivery" label="Needed by" optional hint="Roughly when you need them.">
                      <input id="delivery" type="date" value={v.delivery} onChange={set("delivery")} className={`${box} ${boxOk} h-14`} />
                    </Field>
                    <Field id="target_price" label="Target price per piece" optional hint="For example: USD 8.50">
                      <input id="target_price" value={v.target_price} onChange={set("target_price")} className={`${box} ${boxOk} h-14`} />
                    </Field>
                    <Field id="materials" label="Fabric or material" optional hint="For example: 100% cotton twill.">
                      <input id="materials" value={v.materials} onChange={set("materials")} className={`${box} ${boxOk} h-14`} />
                    </Field>
                  </div>
                </details>
              </div>
            )}

            {/* ---------------- STEP 3 ---------------- */}
            {step === 2 && (
              <div className="space-y-9">
                <div>
                  <h2 ref={heading} tabIndex={-1} style={{ outline: "none" }} className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight text-neutral-900">
                    How can we reach you?
                  </h2>
                  <p className="mt-3 text-[17px] text-neutral-600">We only use your details to reply to this request.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Your name" error={errors.name}>
                    <input
                      id="name"
                      value={v.name}
                      onChange={set("name")}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${box} ${errors.name ? boxBad : boxOk} h-14`}
                    />
                  </Field>
                  <Field id="email" label="Email address" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      value={v.email}
                      onChange={set("email")}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${box} ${errors.email ? boxBad : boxOk} h-14`}
                    />
                  </Field>
                  <Field id="company" label="Company" optional>
                    <input id="company" value={v.company} onChange={set("company")} autoComplete="organization" className={`${box} ${boxOk} h-14`} />
                  </Field>
                  <Field id="phone" label="Phone or WhatsApp" optional>
                    <input id="phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" placeholder="With country code" className={`${box} ${boxOk} h-14`} />
                  </Field>
                  <Field id="country" label="Country" optional>
                    <input id="country" value={v.country} onChange={set("country")} autoComplete="country-name" className={`${box} ${boxOk} h-14`} />
                  </Field>
                  <Field id="website" label="Website" optional>
                    <input id="website" type="url" inputMode="url" value={v.website} onChange={set("website")} placeholder="https://" className={`${box} ${boxOk} h-14`} />
                  </Field>
                </div>

                <div className="rounded-xl bg-neutral-100 p-5">
                  <p className="text-[14.5px] font-semibold uppercase tracking-wide text-neutral-500">Your request</p>
                  <ul className="mt-3 space-y-1.5 text-[16px] text-neutral-800">
                    <li>
                      <strong>Looking for:</strong> {chosen?.label}{" "}
                      <button type="button" onClick={() => setStep(0)} className="ml-1 text-[14.5px] font-semibold text-action underline underline-offset-4">
                        Change
                      </button>
                    </li>
                    <li>
                      <strong>Details:</strong> {v.description.trim() ? (v.description.trim().length > 90 ? v.description.trim().slice(0, 90) + "…" : v.description.trim()) : "No description added"}{" "}
                      <button type="button" onClick={() => setStep(1)} className="ml-1 text-[14.5px] font-semibold text-action underline underline-offset-4">
                        Change
                      </button>
                    </li>
                    <li>
                      <strong>Files:</strong> {files.length ? `${files.length} attached` : "None added"}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* buttons */}
        <div className="mt-11 flex flex-col-reverse items-stretch gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg px-5 text-[17px] font-semibold text-neutral-700 transition hover:bg-neutral-100">
              <Icon d={BACK} /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-action px-10 text-[17.5px] font-semibold text-white shadow-sm transition hover:bg-action-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-action/30 disabled:cursor-wait disabled:opacity-70"
          >
            {step < 2 ? (
              <>
                Next <Icon d={ARROW} />
              </>
            ) : status === "sending" ? (
              "Sending…"
            ) : (
              <>
                Send my request <Icon d={ARROW} />
              </>
            )}
          </button>
        </div>
        {status === "error" && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[15.5px] font-medium text-red-800">
            Sorry, something went wrong and your request was not sent. Please check the form and try again, or write to us by email.
          </p>
        )}
      </form>
    </div>
  );
}
