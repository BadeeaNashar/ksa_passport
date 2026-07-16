import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "brand" | "success" | "warning" | "error" | "info" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-subtle text-sa-700",
  success: "bg-success-bg text-success-text",
  warning: "bg-warning-bg text-warning-text",
  error: "bg-error-bg text-error-text",
  info: "bg-info-bg text-info-text",
  neutral: "bg-gray-100 text-gray-700",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
