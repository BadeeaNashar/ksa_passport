import type { IconType } from "@/components/icons";

export function ReadonlyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: IconType;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <div className="flex h-11 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3.5 dark:border-gray-700 dark:bg-gray-900/50">
        <span className="flex-1 text-[15px] text-gray-800 dark:text-gray-100" dir="auto">
          {value}
        </span>
        {Icon && <Icon className="h-4 w-4 shrink-0 text-gray-400" />}
      </div>
    </div>
  );
}
