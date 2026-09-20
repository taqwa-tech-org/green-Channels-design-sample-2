import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Responsible sourcing at Green Channels: compliance, worker welfare and environmental practice, with partner-factory certifications shown only once verified.",
  alternates: { canonical: "/sustainability" },
};

const considered = [
  ["Compliance", "Factory selection considers compliance standards and audit history for each programme."],
  ["Worker welfare", "We look at how a partner factory treats the people who make the garments."],
  ["Environmental practice", "Materials and processes are considered alongside price and lead time."],
  ["Verified claims only", "A certification appears on this website only after it has been individually verified."],
];

export default function SustainabilityPage() {
  return (
    <>
      <PageBanner image="/images/leaf.jpg" position="center 45%" title="Sustainability" tagline="Responsible sourcing, shown only when verified" />

      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Our factory selection considers compliance, worker welfare and environmental practice. Certifications belong to our
            partner factories, vary by factory and programme, and are published here only once they have been individually verified,
            always with their holder named.
          </p>
        </Reveal>

        <div className="mx-auto mt-24 grid max-w-[1200px] gap-x-12 gap-y-14 md:grid-cols-2">
          {considered.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.1}>
              <div className="border-t border-black pt-7">
                <p className="wide-sm text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="wide mt-4 text-[14px]">{t}</h2>
                <p className="mt-5 text-[16px] italic leading-[1.85] text-text">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="wide text-center text-[clamp(1.3rem,2.6vw,2.1rem)]">Certifications</h2>
            <p className="wide-sm mt-5 text-center text-[10.5px] tracking-[0.2em] text-muted">Held by our partner factories, varying by factory and programme</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-14 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-4">
              {certifications.map((c) => (
                <li key={c} className="wide-sm flex h-28 items-center justify-center bg-paper px-3 text-center text-[11px]">
                  {c}
                </li>
              ))}
              <li className="wide-sm flex h-28 items-center justify-center bg-paper px-3 text-center text-[10px] text-muted">Verified before shown</li>
            </ul>
            <p className="mt-6 text-center text-[13.5px] italic text-muted">These are certifications of our partner factories, not of Green Channels itself.</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
