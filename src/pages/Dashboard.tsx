import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookUser, Clock, RefreshCw } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useAuth } from "@/auth/AuthContext";
import { useRequests } from "@/store/RequestsContext";
import { services } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { RequestCard } from "@/components/RequestCard";

export default function Dashboard() {
  const { t, dir, locale } = useLocale();
  const { user } = useAuth();
  const { getByOwner } = useRequests();
  const navigate = useNavigate();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (!user) return null;

  const recent = getByOwner(user.nationalId).slice(0, 3);

  return (
    <div className="container-dga animate-fade-in py-8">
      {/* Welcome */}
      <p className="text-[14px] text-gray-500 dark:text-gray-400">{t("welcome_back")}</p>
      <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
        {user.firstName[locale]}
      </h1>

      {/* Passport status card */}
      <Card className="mt-6 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
              <BookUser className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t("passport_expires")}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {user.passportExpiryLong[locale]}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {user.validityRemaining[locale]}
                </span>
                {user.renewSoon && (
                  <span className="inline-flex items-center rounded-full bg-warning-bg px-2.5 py-0.5 text-[12px] font-medium text-warning-text">
                    {t("renew_soon")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/services/renew")}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-sa-600 px-5 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-sa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            {t("renew_now")}
          </button>
        </div>
      </Card>

      {/* What do you need */}
      <h2 className="mt-9 mb-4 text-lg font-bold text-gray-900 dark:text-white">
        {t("what_you_need")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <Link
              key={svc.id}
              to={svc.to}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-sa-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-sa-600"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                {t(svc.titleKey)}
              </h3>
              <p className="mt-1 flex-1 text-[13px] text-gray-500 dark:text-gray-400">
                {t(svc.descKey)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-sa-600 dark:text-sa-300">
                {t("start")}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Recent activity */}
      {recent.length > 0 && (
        <>
          <h2 className="mt-10 mb-4 text-lg font-bold text-gray-900 dark:text-white">
            {t("recent_activity")}
          </h2>
          <div className="flex flex-col gap-4">
            {recent.map((r) => (
              <RequestCard
                key={r.id}
                request={r}
                onView={(id) => navigate(`/track?ref=${encodeURIComponent(id)}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
