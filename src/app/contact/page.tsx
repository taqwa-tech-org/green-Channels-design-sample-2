import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBanner } from "@/components/PageBanner";
import { RfqForm } from "@/components/RfqForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Green Channels your tech pack: request a quotation, upload specifications and reference images, and start a professional clothing programme.",
  alternates: { canonical: "/contact" },
};

const next = [
  ["We review", "Your enquiry and tech pack are read by the team who would run the programme."],
  ["We respond", "You receive questions and a development plan, not a form letter."],
  ["We agree", "Samples, specification and quotation are settled before anything goes into production."],
];

export default function ContactPage() {
  return (
    <>
      <PageBanner image="/images/hero-port.jpg" position="center 55%" title="Contact" tagline="Send us your tech pack and start a project" />

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-96" />}>
              <RfqForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="wide-sm text-[10px] text-muted">What happens next</p>
                <ol className="mt-6 divide-y divide-black/10 border-y border-black/10">
                  {next.map(([t, d], i) => (
                    <li key={t} className="flex gap-5 py-6">
                      <span className="wide text-[1.4rem] text-black/25">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="wide text-[12px]">{t}</h3>
                        <p className="mt-3 text-[15px] italic leading-[1.7] text-text">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-10 bg-black p-8 text-white">
                  <p className="wide-sm text-[10px] text-white/55">Green Channels Ltd</p>
                  <address className="mt-4 space-y-1 text-[14.5px] not-italic text-white/85">
                    {site.address.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </address>
                  <p className="mt-5 text-[14.5px] leading-relaxed text-white/85">
                    <a className="hover:text-white" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    <br />
                    WhatsApp {site.whatsapp}
                    <br />
                    Office {site.phone}
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
