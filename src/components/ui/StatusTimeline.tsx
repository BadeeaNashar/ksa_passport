import { Check, X } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { STATUS_LABEL, STATUS_ORDER, type RequestStatus } from "@/data/requests";
import { cn } from "@/lib/cn";

export function StatusTimeline({ status }: { status: RequestStatus }) {
  const { t } = useLocale();

  if (status === "rejected") {
    return (
      <ol className="flex flex-col gap-0">
        <TimelineNode label={t(STATUS_LABEL.submitted)} state="done" first />
        <TimelineNode label={t(STATUS_LABEL.rejected)} state="rejected" last />
      </ol>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(status);
  return (
    <ol className="flex flex-col gap-0">
      {STATUS_ORDER.map((s, i) => (
        <TimelineNode
          key={s}
          label={t(STATUS_LABEL[s])}
          state={i < currentIndex ? "done" : i === currentIndex ? "current" : "pending"}
          first={i === 0}
          last={i === STATUS_ORDER.length - 1}
        />
      ))}
    </ol>
  );
}

function TimelineNode({
  label,
  state,
  first,
  last,
}: {
  label: string;
  state: "done" | "current" | "pending" | "rejected";
  first?: boolean;
  last?: boolean;
}) {
  const isDone = state === "done";
  const isCurrent = state === "current";
  const isRejected = state === "rejected";
  return (
    <li className="flex gap-3">
      {/* Rail */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "h-3 w-px",
            first ? "opacity-0" : isDone ? "bg-sa-600" : "bg-gray-200 dark:bg-gray-700",
          )}
        />
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border-2",
            (isDone || isCurrent) && "border-sa-600 bg-sa-600 text-white",
            isRejected && "border-error bg-error text-white",
            state === "pending" &&
              "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800",
          )}
        >
          {isDone && <Check className="h-3.5 w-3.5" />}
          {isCurrent && <span className="h-2 w-2 rounded-full bg-white" />}
          {isRejected && <X className="h-3.5 w-3.5" />}
        </span>
        <span
          className={cn(
            "w-px flex-1",
            last ? "opacity-0" : isDone ? "bg-sa-600" : "bg-gray-200 dark:bg-gray-700",
          )}
        />
      </div>
      {/* Label */}
      <span
        className={cn(
          "py-2 text-[14px]",
          isCurrent
            ? "font-semibold text-gray-900 dark:text-white"
            : isDone
              ? "font-medium text-gray-700 dark:text-gray-200"
              : isRejected
                ? "font-semibold text-error-text"
                : "text-gray-400 dark:text-gray-500",
        )}
      >
        {label}
      </span>
    </li>
  );
}
