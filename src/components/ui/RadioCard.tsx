import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function RadioCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  trailing,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3.5 rounded-xl border p-4 text-start transition-all",
        selected
          ? "border-sa-600 bg-brand-subtle/60 ring-1 ring-sa-600 dark:bg-sa-600/10"
          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600",
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-sa-600" : "border-gray-300 dark:border-gray-500",
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-sa-600" />}
      </span>
      {icon && <span className="shrink-0 text-gray-500 dark:text-gray-300">{icon}</span>}
      <span className="flex-1">
        <span className="block text-[15px] font-semibold text-gray-900 dark:text-white">
          {title}
        </span>
        {description && (
          <span className="mt-0.5 block text-[13px] text-gray-500 dark:text-gray-400">
            {description}
          </span>
        )}
      </span>
      {trailing}
    </button>
  );
}
