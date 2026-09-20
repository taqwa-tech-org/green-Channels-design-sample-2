import Image from "next/image";
import Link from "next/link";
import { productGroups } from "@/lib/content";
import { Reveal } from "./Reveal";

/** 3 x 2 photographic grid with small centred captions; the last tile invites a quotation. */
export function ProductGrid() {
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {productGroups.map((g, i) => (
        <Reveal key={g.slug} delay={(i % 3) * 0.08}>
          <Link href={`/products#${g.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                src={g.image}
                alt={g.name}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                style={{ objectPosition: g.position }}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/15" />
            </div>
            <p className="wide-sm mt-5 text-center text-[11px] text-black">{g.name}</p>
          </Link>
        </Reveal>
      ))}

      <Reveal delay={0.16}>
        <Link href="/contact" className="group block">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
            <Image src="/images/p-rfq.jpg" alt="Fabric swatches" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="wide-sm rounded-full border border-white px-9 py-3.5 text-[11px] text-white transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                Send your tech pack
              </span>
            </div>
          </div>
          <p className="wide-sm mt-5 text-center text-[11px] text-black">Request a quotation</p>
        </Link>
      </Reveal>
    </div>
  );
}
