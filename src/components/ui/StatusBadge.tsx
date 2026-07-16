import {
  CheckCircle2,
  Clock,
  Loader,
  PackageCheck,
  Send,
  XCircle,
  type IconType,
} from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { STATUS_LABEL, type RequestStatus } from "@/data/requests";
import { cn } from "@/lib/cn";

const config: Record<RequestStatus, { tone: string; icon: IconType }> = {
  submitted: { tone: "bg-info-bg text-info-text", icon: Send },
  under_review: { tone: "bg-warning-bg text-warning-text", icon: Clock },
  processing: { tone: "bg-info-bg text-info-text", icon: Loader },
  ready: { tone: "bg-brand-subtle text-sa-700", icon: PackageCheck },
  completed: { tone: "bg-success-bg text-success-text", icon: CheckCircle2 },
  rejected: { tone: "bg-error-bg text-error-text", icon: XCircle },
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const { t } = useLocale();
  const { tone, icon: Icon } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
        tone,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {t(STATUS_LABEL[status])}
    </span>
  );
}
