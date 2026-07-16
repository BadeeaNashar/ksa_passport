import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { cn } from "@/lib/cn";

/** Official Saudi national emblem (palm tree above two crossed swords). */
export function SaudiEmblem({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Saudi national emblem"
      className={cn("h-9 w-9 object-contain", className)}
    />
  );
}

export function Logo() {
  const { t } = useLocale();
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <SaudiEmblem className="h-10 w-10" />
      <span className="text-[15px] font-semibold text-gray-500 dark:text-gray-300">
        {t("brand_logo")}
      </span>
    </Link>
  );
}
