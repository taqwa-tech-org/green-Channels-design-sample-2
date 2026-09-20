import Link from "next/link";
import type { ReactNode } from "react";

const tones = {
  dark: "border-black bg-black text-white hover:bg-transparent hover:text-black",
  light: "border-white bg-white text-black hover:bg-transparent hover:text-white",
  "outline-light": "border-white/80 text-white hover:bg-white hover:text-black",
  "outline-dark": "border-black/70 text-black hover:bg-black hover:text-white",
} as const;

export function Btn({
  href,
  children,
  tone = "dark",
  className = "",
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = `wide-sm inline-flex items-center justify-center gap-3 border px-8 py-4 text-[11px] transition-colors duration-500 ${tones[tone]} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

/** "LEARN MORE →" style text link */
export function More({ href, children = "Learn more", tone = "dark" }: { href: string; children?: ReactNode; tone?: "dark" | "light" }) {
  return (
    <Link href={href} className={`wide-sm group inline-flex items-center gap-3 text-[11px] ${tone === "dark" ? "text-black" : "text-white"}`}>
      <span className="border-b border-current pb-1">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
        →
      </span>
    </Link>
  );
}
