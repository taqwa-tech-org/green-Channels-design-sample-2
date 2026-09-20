import Image from "next/image";
import { Reveal } from "./Reveal";

/** Photographic opening band for inner pages. */
export function PageBanner({
  image,
  position = "center",
  title,
  tagline,
}: {
  image: string;
  position?: string;
  title: string;
  tagline?: string;
}) {
  return (
    <section className="relative flex h-[58vh] min-h-[380px] items-center justify-center overflow-hidden bg-black text-center text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      <Reveal className="relative px-6 pt-8">
        <h1 className="wide text-[clamp(1.6rem,4.2vw,3.6rem)] leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">{title}</h1>
        {tagline && <p className="wide-sm mx-auto mt-7 max-w-2xl text-[10.5px] leading-[2] tracking-[0.14em] text-white/90 md:text-[12px]">{tagline}</p>}
      </Reveal>
    </section>
  );
}
