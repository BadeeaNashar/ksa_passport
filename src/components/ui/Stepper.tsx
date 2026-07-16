import { Fragment } from "react";
import { Check, type IconType } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface Step {
  label: string;
  icon: IconType;
}

export function Stepper({
  steps,
  current,
}: {
  steps: Step[];
  current: number;
}) {
  return (
    <ol className="flex items-center">
      {steps.map((step, i) => {
        const completed = i < current;
        const active = i === current;
        const Icon = step.icon;
        return (
          <Fragment key={i}>
            <li className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  completed && "border-sa-600 bg-sa-600 text-white",
                  active && "border-sa-600 bg-sa-600 text-white",
                  !completed &&
                    !active &&
                    "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800",
                )}
              >
                {completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[14px] font-medium",
                  active || completed
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 dark:text-gray-500",
                )}
              >
                {step.label}
              </span>
            </li>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "mx-3 h-0.5 flex-1 min-w-6 rounded-full",
                  completed ? "bg-sa-600" : "bg-gray-200 dark:bg-gray-700",
                )}
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
