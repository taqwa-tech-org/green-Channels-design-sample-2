import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Btn } from "@/components/Btn";
import { productGroups, secondary, toValue } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "Work jackets and vests, work trousers and shorts, bib & brace, coveralls, polo shirts, T-shirts and sweatshirts, developed and sourced in Bangladesh.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner image="/images/cta.jpg" position="center 55%" title="Products" tagline="Professional clothing programmes, garment by garment" />

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          {productGroups.map((g, i) => (
            <article
              key={g.slug}
              id={g.slug}
              className="grid scroll-mt-24 items-center gap-10 border-b border-black/10 py-16 last:border-b-0 md:grid-cols-2 md:gap-20 md:py-24"
            >
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <div className="relative aspect-[5/4] overflow-hidden bg-neutral-200">
                  <Image src={g.image} alt={g.name} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: g.position }} />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 ? "md:order-1" : ""}>
                <p className="wide-sm text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="wide mt-4 text-[clamp(1.2rem,2.3vw,1.9rem)] leading-snug">{g.name}</h2>
                <p className="mt-7 text-[16.5px] italic leading-[1.9] text-text">{g.summary}</p>
                <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-center gap-4 py-3.5 text-[15px] text-text">
                      <span className="h-1.5 w-1.5 shrink-0 bg-green" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Btn href={`/contact?garment=${toValue(g.garments[0])}`} tone="outline-dark">
                    Enquire about {g.garments[0].toLowerCase()}
                  </Btn>
                </div>
                <p className="wide-sm mt-7 text-[9.5px] text-muted">Indicative copy, to be confirmed with Green Channels</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="wide text-center text-[clamp(1.3rem,2.6vw,2.1rem)]">Also Sourced</h2>
            <p className="mx-auto mt-8 max-w-xl text-center text-[16px] italic leading-[1.9] text-text">
              Beyond workwear programmes, without diluting them.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {secondary.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.1}>
                <article id={s.id} className="scroll-mt-24 bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: s.position }} />
                  </div>
                  <div className="p-8 md:p-10">
                    <h3 className="wide text-[14px]">{s.title}</h3>
                    <p className="mt-5 text-[15.5px] italic leading-[1.85] text-text">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
