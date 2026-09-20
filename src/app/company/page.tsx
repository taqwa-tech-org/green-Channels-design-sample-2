import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Company",
  description: "Green Channels is a buying house in Dhaka with 35+ years of experience, working on the buyer's side of the table for professional clothing programmes.",
  alternates: { canonical: "/company" },
};

const principles = [
  ["On the buyer's side of the table", "We work for the buyer, managing the chain rather than selling one factory's capacity. That is what a buying house is for."],
  ["Development to shipment", "Product development, sourcing, sampling, factory selection, merchandising, production follow-up and quality control sit with one team."],
  ["A long-established network", "We work through partner factories selected for each garment and programme, not a factory of our own."],
];

export default function CompanyPage() {
  return (
    <>
      <PageBanner image="/images/hero-yarn.jpg" position="center 45%" title="Company" tagline="A buying house on the buyer's side of the table" />

      <section className="bg-white px-6 py-28 md:py-36">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 className="wide text-[clamp(1.3rem,2.6vw,2.1rem)]">About</h2>
          <p className="mt-12 text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Green Channels is a buying house in Dhaka with more than 35 years of experience in Bangladesh, working with international
            apparel buyers on professional clothing programmes: workwear, corporate wear and uniforms.
          </p>
          <p className="mt-8 text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Our strength is not limited to sourcing finished garments. It also includes product development, fabric and trim sourcing,
            sampling, factory selection, merchandising, production follow-up and quality control.
          </p>
        </Reveal>
      </section>

      <section className="bg-black px-6 py-28 text-center text-white">
        <Reveal>
          <p className="wide text-[clamp(4rem,14vw,11rem)] leading-none">35+</p>
          <p className="wide-sm mt-8 text-[11px] tracking-[0.3em] text-white/80">Years of experience in Bangladesh</p>
        </Reveal>
      </section>

      <section className="bg-white px-6 py-28 md:py-36">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="wide text-center text-[clamp(1.3rem,2.6vw,2.1rem)]">How We Work</h2>
          </Reveal>
          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {principles.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="border-t border-black pt-8">
                  <p className="wide-sm text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="wide mt-4 text-[14px] leading-relaxed">{t}</h3>
                  <p className="mt-6 text-[16px] italic leading-[1.85] text-text">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
