import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  FileText,
  MapPin,
  RefreshCw,
  type IconType,
} from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { formatDate, type PassportRequest, type RequestType } from "@/data/requests";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";

const TYPE_ICON: Record<RequestType, IconType> = {
  renew: RefreshCw,
  new: FileText,
  lost: AlertTriangle,
  address: MapPin,
};

export function RequestCard({
  request,
  onView,
}: {
  request: PassportRequest;
  onView?: (id: string) => void;
}) {
  const { t, locale, dir } = useLocale();
  const Icon = TYPE_ICON[request.type];
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-gray-900 dark:text-white">
              {t(request.titleKey)}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-gray-500 dark:text-gray-400">
              <span className="font-mono" dir="ltr">
                {request.id}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                {t("app_submitted_on")} {formatDate(request.submittedAt, locale)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                {t("app_fee_label")}:{" "}
                {request.fee > 0 ? `${request.fee} ${t("currency")}` : t("free")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <StatusBadge status={request.status} />
          {onView && (
            <button
              onClick={() => onView(request.id)}
              className="inline-flex items-center gap-1 text-[13px] font-medium text-sa-600 hover:underline dark:text-sa-300"
            >
              {t("view_details")}
              <Arrow className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
