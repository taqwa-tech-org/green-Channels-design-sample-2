import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { Reveal } from "./Reveal";

/** Four tall photographic tiles: the development-team block. */
export function ServiceTiles({ limit = 4 }: { limit?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.slice(0, limit).map((s, i) => (
        <Reveal key={s.n} delay={i * 0.08}>
          <Link href="/services" className="group relative block aspect-[3/4] overflow-hidden bg-neutral-900 text-white">
            <Image
              src={s.image}
              alt={s.title}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
              style={{ objectPosition: s.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-colors duration-700 group-hover:from-black/90 group-hover:via-black/55" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="wide-sm text-[10px] text-white/60">{s.n}</p>
              <h3 className="wide mt-2 text-[14px] leading-snug">{s.title}</h3>
              <p className="mt-0 max-h-0 overflow-hidden text-[14px] leading-relaxed text-white/85 opacity-0 transition-all duration-700 group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100">
                {s.text}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
