import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const { dir } = useLocale();
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[13px]">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {item.to && !last ? (
              <Link
                to={item.to}
                className="text-gray-500 transition-colors hover:text-sa-600 dark:text-gray-400"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  last
                    ? "font-semibold text-gray-800 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {item.label}
              </span>
            )}
            {!last && <Chevron className="h-3.5 w-3.5 text-gray-400" />}
          </Fragment>
        );
      })}
    </nav>
  );
}
