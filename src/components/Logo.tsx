import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { cn } from "@/lib/cn";

/** Simplified Saudi national emblem: a palm tree above two crossed swords. */
export function SaudiEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      fill="none"
      aria-hidden
    >
      {/* Palm trunk */}
      <path
        d="M32 20c-1 6-1 12 0 22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Palm fronds */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M32 20c-4-5-10-7-16-6 4 3 7 6 10 10" />
        <path d="M32 20c4-5 10-7 16-6-4 3-7 6-10 10" />
        <path d="M32 18c-3-6-8-9-14-10 3 4 5 8 7 13" />
        <path d="M32 18c3-6 8-9 14-10-3 4-5 8-7 13" />
        <path d="M32 16c-1-6-4-11-9-14 1 5 2 10 3 15" />
        <path d="M32 16c1-6 4-11 9-14-1 5-2 10-3 15" />
      </g>
      {/* Two crossed swords */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 44c10 6 30 6 40 0" />
        <path d="M12 50c10 6 30 6 40 0" />
      </g>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M10 43l2 8" />
        <path d="M54 43l-2 8" />
      </g>
    </svg>
  );
}

export function Logo() {
  const { t } = useLocale();
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <SaudiEmblem className="h-9 w-9 text-[#4b5a3f] dark:text-gray-300" />
      <span className="text-[15px] font-semibold text-gray-500 dark:text-gray-300">
        {t("brand_logo")}
      </span>
    </Link>
  );
}
