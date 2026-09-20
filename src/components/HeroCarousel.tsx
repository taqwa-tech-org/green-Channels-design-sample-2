"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { heroSlides } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 7500;

/** Full-screen photographic carousel with large, wide-spaced uppercase titles. */
export function HeroCarousel() {
  const reduce = !!useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });
  const n = heroSlides.length;

  useEffect(() => {
    if (paused || reduce || !inView) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [paused, reduce, inView, n, i]);

  const go = (d: number) => setI((p) => (p + d + n) % n);
  const s = heroSlides[i];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Green Channels highlights"
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 1.4, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0.01 : 9.5, ease: "linear" }}
          >
            <Image src={s.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.position }} />
          </motion.div>
          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 key={`t${i}`} className="wide text-[clamp(1.45rem,4.3vw,4.1rem)] leading-[1.4] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          {s.title.map((line, k) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.35 + k * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          key={`p${i}`}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="wide-sm mt-9 max-w-[46rem] text-[10.5px] leading-[2] tracking-[0.14em] text-white/90 md:text-[12px]"
        >
          {s.tagline}
        </motion.p>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-6 md:flex">
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d < 0 ? "Previous slide" : "Next slide"}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d={d < 0 ? "M10 2L4 8l6 6" : "M6 2l6 6-6 6"} stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 left-6 flex items-center gap-3 md:left-9" role="tablist" aria-label="Choose slide">
        {heroSlides.map((_, k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`Slide ${k + 1}`}
            onClick={() => setI(k)}
            className="group relative h-6 w-10"
          >
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/35" />
            <span
              key={k === i ? `on${i}` : "off"}
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-white"
              style={{
                width: k === i ? "100%" : "0%",
                transition: k === i && !paused && !reduce ? `width ${INTERVAL}ms linear` : "none",
              }}
              ref={(el) => {
                if (el && k === i) {
                  el.style.width = "0%";
                  requestAnimationFrame(() => requestAnimationFrame(() => (el.style.width = "100%")));
                }
              }}
            />
          </button>
        ))}
      </div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black md:right-9"
      >
        <svg className="bob" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 5l6 6 6-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </a>
    </section>
  );
}
