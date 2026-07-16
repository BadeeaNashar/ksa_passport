import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-xs hover:bg-brand-hover active:bg-brand-active",
  secondary:
    "bg-secondary text-gray-900 shadow-xs hover:bg-secondary-hover",
  outline:
    "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent text-brand hover:bg-brand-subtle dark:text-sa-300 dark:hover:bg-gray-800",
  danger: "bg-error text-white shadow-xs hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", fullWidth, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
