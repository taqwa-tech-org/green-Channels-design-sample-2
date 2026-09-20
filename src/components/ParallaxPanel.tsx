"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./Reveal";

/**
 * Full-bleed photograph with a slow parallax and a translucent text panel,
 * the way large apparel-manufacturer sites present a single theme.
 */
export function ParallaxPanel({
  id,
  image,
  position = "center",
  title,
  children,
  align = "center",
  tall = false,
}: {
  id?: string;
  image: string;
  position?: string;
  title: string;
  children: ReactNode;
  align?: "center" | "left" | "right";
  tall?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex items-center overflow-hidden px-5 py-24 md:px-12 ${tall ? "min-h-[110vh]" : "min-h-[88vh]"} ${
        align === "center" ? "justify-center" : align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[14%] inset-x-0 will-change-transform">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
      <div className="absolute inset-0 bg-black/20" />

      <Reveal className="relative w-full max-w-[760px]">
        <div className="bg-white/90 p-8 md:p-14">
          <h2 className="wide text-[clamp(1.2rem,2.3vw,1.9rem)] leading-snug text-black">{title}</h2>
          <div className="mt-8 text-[15.5px] italic leading-[1.85] text-black/80">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
