import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, required, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-md border border-gray-300 bg-white px-3.5 text-[15px] text-gray-900",
            "placeholder:text-gray-400 transition-colors",
            "focus:border-sa-500 focus:outline-none focus:ring-2 focus:ring-sa-500/30",
            "disabled:cursor-not-allowed disabled:bg-gray-50",
            "dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:disabled:bg-gray-800",
            error && "border-error focus:border-error focus:ring-error/30",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-error-text">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
