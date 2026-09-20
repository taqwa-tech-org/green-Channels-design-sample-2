import Image from "next/image";
import { Btn } from "./Btn";
import { Reveal } from "./Reveal";

/** Closing call to action on a full-bleed photograph. */
export function CtaBand({ image = "/images/cta.jpg", position = "center 50%" }: { image?: string; position?: string }) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden text-center text-white">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-black/60" />
      <Reveal className="relative px-6">
        <h2 className="wide text-[clamp(1.6rem,4.4vw,3.8rem)] leading-[1.35]">
          Bring
          <br />
          Your Programme
          <br />
          To Life
        </h2>
        <div className="mt-11">
          <Btn href="/contact" tone="light">
            Send us your tech pack
          </Btn>
        </div>
      </Reveal>
    </section>
  );
}
