import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Headphones, Mail, Phone } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { Card } from "@/components/ui/Card";

const HELPLINE = "920020405";

export default function Help() {
  const { t } = useLocale();
  const navigate = useNavigate();

  return (
    <div className="container-dga flex min-h-[calc(100dvh-105px)] items-start justify-center py-16">
      <div className="w-full max-w-[520px] animate-fade-in">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
          <Headphones className="h-7 w-7" />
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("help_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-[400px] text-center text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
          {t("help_intro")}
        </p>

        <Card className="mt-7 flex flex-col gap-5 p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
              <Phone className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t("contact_phone")}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white tabular-nums" dir="ltr">
                {HELPLINE}
              </p>
            </div>
            <a
              href={`tel:${HELPLINE}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-sa-600 px-4 text-[14px] font-semibold text-white transition-colors hover:bg-sa-700"
            >
              <Phone className="h-4 w-4" />
              {t("help_call_now")}
            </a>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-5 dark:border-gray-700">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
              <Mail className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t("contact_email")}
              </p>
              <p className="text-[15px] font-medium text-gray-900 dark:text-white" dir="ltr">
                care@jawaz.gov.sa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-5 dark:border-gray-700">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
              <Clock className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t("contact_hours")}
              </p>
              <p className="text-[15px] font-medium text-gray-900 dark:text-white">
                {t("contact_hours_val")}
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-sa-600 hover:underline dark:text-sa-300"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("help_back_login")}
          </button>
        </div>
      </div>
    </div>
  );
}
