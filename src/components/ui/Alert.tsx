import { useState, type ReactNode } from "react";
import { Info, X } from "@/components/icons";
import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "warning" | "error";

const tones: Record<Tone, string> = {
  info: "bg-info-bg border-info-border text-info-text dark:bg-info/10",
  success: "bg-success-bg border-success-border text-success-text dark:bg-success/10",
  warning: "bg-warning-bg border-warning-border text-warning-text dark:bg-warning/10",
  error: "bg-error-bg border-error-border text-error-text dark:bg-error/10",
};

export function Alert({
  tone = "info",
  children,
  dismissible,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  dismissible?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-[14px]",
        tones[tone],
        className,
      )}
      role="status"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex-1 leading-relaxed">{children}</div>
      {dismissible && (
        <button
          onClick={() => setOpen(false)}
          className="shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
          aria-label="dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
