"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-black" : "bg-black/40"}`}
      >
        <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-5 md:h-[68px] md:px-9">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 xl:gap-10 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`nav-link relative py-2 text-white transition-opacity ${active(n.href) ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {n.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-green transition-transform duration-500 ${active(n.href) ? "scale-x-100" : "scale-x-0"}`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="wide-sm hidden border border-white/70 px-5 py-2.5 text-[10px] text-white transition-colors duration-500 hover:bg-white hover:text-black lg:inline-block"
            >
              Start a project
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className={`absolute h-px w-6 bg-white transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-px w-6 bg-white transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black px-6 pb-10 pt-24 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Start a project" }].map((n, i) => (
                <motion.div key={n.href + n.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.6 }}>
                  <Link href={n.href} className="wide flex items-center justify-between border-b border-white/15 py-4 text-[15px] text-white">
                    {n.label}
                    <span className="text-[10px] tracking-widest text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="wide-sm space-y-2 text-[10px] text-white/55">
              <p>{site.email}</p>
              <p>WhatsApp {site.whatsapp}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
