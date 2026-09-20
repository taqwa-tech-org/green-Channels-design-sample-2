import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1320px] px-6 py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-7 max-w-xs text-[15px] italic leading-relaxed text-white/70">
              Specialist buying house for professional clothing programmes. Developed, sourced and controlled in Bangladesh.
            </p>
          </div>
          <div>
            <p className="wide-sm text-[10px] text-white/45">Office</p>
            <address className="mt-5 space-y-1 text-[14.5px] not-italic text-white/80">
              {site.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
          </div>
          <div>
            <p className="wide-sm text-[10px] text-white/45">Contact</p>
            <ul className="mt-5 space-y-1 text-[14.5px] text-white/80">
              <li>
                <a className="hover:text-white" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>WhatsApp {site.whatsapp}</li>
              <li>Office {site.phone}</li>
            </ul>
          </div>
          <div>
            <p className="wide-sm text-[10px] text-white/45">Explore</p>
            <ul className="mt-5 space-y-1 text-[14.5px] text-white/80">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="hover:text-white" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wide-sm flex flex-col justify-between gap-4 pt-8 text-[10px] text-white/45 md:flex-row">
          <p>© 2026 {site.name}</p>
          <p className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
          <p className="max-w-sm md:text-right">Prototype by Taqwa Tech · placeholder photography (Unsplash)</p>
        </div>
      </div>
    </footer>
  );
}
