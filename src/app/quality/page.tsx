import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { qcStages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quality",
  description: "Seven inspection stages, from pre-production review to shipment approval, with testing and verification coordinated between the factory, the laboratory and the buyer.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <PageBanner image="/images/quality.jpg" position="center 40%" title="Quality" tagline="Inspection at every stage, not just at the end" />

      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Quality is not a check at the end. It is a sequence of seven defined stages that follow the garment from the specification
            to the closed carton.
          </p>
        </Reveal>

        <ol className="mx-auto mt-20 max-w-[1100px] border-t border-black/10">
          {qcStages.map((q, i) => (
            <Reveal key={q.n} delay={i * 0.03}>
              <li className="grid gap-4 border-b border-black/10 py-9 md:grid-cols-[110px_1fr_1.4fr] md:items-baseline md:gap-10 md:py-11">
                <span className="wide text-[clamp(1.6rem,3vw,2.4rem)] text-black/25">{q.n}</span>
                <h2 className="wide text-[13px] leading-relaxed">{q.title}</h2>
                <p className="text-[16px] italic leading-[1.85] text-text">{q.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-black px-6 py-24 text-center text-white">
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="wide text-[clamp(1.2rem,2.3vw,1.9rem)]">Testing &amp; Verification</h2>
          <p className="mt-10 text-[17px] italic leading-[1.95] text-white/85">
            Where specific testing, certification or third-party conformity assessment is required, it is handled with the appropriate
            factory, laboratory or testing organisation and, where applicable, the buyer. Green Channels coordinates that process. It
            does not issue certificates or declarations of conformity.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
