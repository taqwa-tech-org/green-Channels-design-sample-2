import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Product development, fabric and trim sourcing, sampling, factory selection, merchandising, production follow-up, quality control and shipment.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner image="/images/s-sampling.jpg" position="center 50%" title="Services" tagline="From the first sketch to the last carton" />

      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Our strength is not limited to sourcing finished garments. Every programme moves through the same chain, with one
            accountable team on the buyer&apos;s side of the table.
          </p>
        </Reveal>

        <div className="mx-auto mt-24 max-w-[1320px]">
          {services.map((s, i) => (
            <article key={s.n} className="grid items-center gap-8 border-t border-black/10 py-14 md:grid-cols-12 md:gap-14 md:py-20">
              <Reveal className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: s.position }} />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <p className="wide-sm text-[10px] text-muted">{s.n}</p>
                <h2 className="wide mt-4 text-[clamp(1.1rem,2vw,1.6rem)] leading-snug">{s.title}</h2>
                <p className="mt-6 text-[16.5px] italic leading-[1.9] text-text">{s.text}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
