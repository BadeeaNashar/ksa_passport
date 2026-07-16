import { useId, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export function Checkbox({ label, id, className, checked, ...props }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label
      htmlFor={inputId}
      className={cn("inline-flex cursor-pointer items-center gap-2.5", className)}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-[5px] border transition-colors",
            "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900",
            "peer-checked:border-sa-600 peer-checked:bg-sa-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-sa-500 peer-focus-visible:ring-offset-2",
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </span>
      </span>
      {label && (
        <span className="text-[14px] text-gray-700 dark:text-gray-200">{label}</span>
      )}
    </label>
  );
}
