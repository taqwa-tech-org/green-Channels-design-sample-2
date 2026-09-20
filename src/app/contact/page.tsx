import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBanner } from "@/components/PageBanner";
import { RfqForm } from "@/components/RfqForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Green Channels your tech pack: tell us what you need, add your files and we will reply with a development plan.",
  alternates: { canonical: "/contact" },
};

const next = [
  ["We read it", "The team who would run your programme reads your request and files."],
  ["We reply", "You get questions and a plan, not a standard letter."],
  ["We agree the details", "Samples, specification and price are settled before production starts."],
];

const waLink = `https://wa.me/${site.whatsapp.replace(/\D/g, "").replace(/^0+/, "")}`;

export default function ContactPage() {
  return (
    <>
      <PageBanner image="/images/hero-port.jpg" position="center 55%" title="Contact" tagline="Send us your tech pack and start a project" />

      <section className="bg-neutral-50 px-5 py-16 font-form sm:px-6 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-neutral-900">Send us your request</h2>
            <p className="mt-4 text-[18px] leading-relaxed text-neutral-600">
              It takes about two minutes. Three short steps, and you can skip anything you don&apos;t know yet.
            </p>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 sm:p-10">
                <Suspense fallback={<div className="h-96" />}>
                  <RfqForm />
                </Suspense>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-neutral-200">
                  <h3 className="text-[19px] font-bold text-neutral-900">Prefer to talk?</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-neutral-600">Message us directly. We are happy to help you fill this in.</p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex h-13 items-center justify-center gap-3 rounded-lg border-2 border-action px-5 text-[16.5px] font-semibold text-action transition hover:bg-action hover:text-white"
                  >
                    Chat on WhatsApp
                  </a>
                  <ul className="mt-6 space-y-3 text-[15.5px] text-neutral-700">
                    <li>
                      <span className="block text-[13.5px] font-semibold uppercase tracking-wide text-neutral-500">Email</span>
                      <a className="break-all font-medium text-neutral-900 underline underline-offset-4" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </li>
                    <li>
                      <span className="block text-[13.5px] font-semibold uppercase tracking-wide text-neutral-500">Phone</span>
                      <a className="font-medium text-neutral-900" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                        {site.phone}
                      </a>
                    </li>
                    <li>
                      <span className="block text-[13.5px] font-semibold uppercase tracking-wide text-neutral-500">Office</span>
                      <address className="not-italic">{site.address.join(", ")}</address>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-neutral-200">
                  <h3 className="text-[19px] font-bold text-neutral-900">What happens next</h3>
                  <ol className="mt-5 space-y-5">
                    {next.map(([t, d], i) => (
                      <li key={t} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[15px] font-bold text-white">{i + 1}</span>
                        <div>
                          <p className="text-[16.5px] font-semibold text-neutral-900">{t}</p>
                          <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
