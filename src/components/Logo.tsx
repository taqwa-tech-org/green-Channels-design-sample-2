import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 40" aria-hidden="true" className={className} fill="currentColor">
      {[0, 10, 20, 30].map((x) => (
        <polygon key={x} points={`${x},40 ${x + 6},40 ${x + 22},0 ${x + 16},0`} />
      ))}
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Green Channels — home" className={`group inline-flex shrink-0 items-center gap-3 text-white ${className}`}>
      <LogoMark className="h-[18px] w-auto text-green transition-transform duration-500 group-hover:-skew-x-6" />
      <span className="font-heading whitespace-nowrap text-[13px] font-light uppercase tracking-[0.14em] md:text-[15px]">
        Green Channels <span className="hidden sm:inline">Ltd</span>
      </span>
    </Link>
  );
}
