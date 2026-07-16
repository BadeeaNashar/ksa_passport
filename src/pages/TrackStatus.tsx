import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useAuth } from "@/auth/AuthContext";
import { useRequests } from "@/store/RequestsContext";
import { formatDate, type PassportRequest } from "@/data/requests";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusTimeline } from "@/components/ui/StatusTimeline";
import { RequestCard } from "@/components/RequestCard";

export default function TrackStatus() {
  const { t, locale } = useLocale();
  const { user } = useAuth();
  const { getById, getByOwner } = useRequests();
  const [params] = useSearchParams();

  const [query, setQuery] = useState("");
  // undefined = not searched yet, null = searched but not found
  const [result, setResult] = useState<PassportRequest | null | undefined>(undefined);

  useEffect(() => {
    const ref = params.get("ref");
    if (ref) {
      setQuery(ref);
      setResult(getById(ref) ?? null);
    }
  }, [params, getById]);

  const doSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setResult(getById(query) ?? null);
  };

  const pick = (id: string) => {
    setQuery(id);
    setResult(getById(id) ?? null);
    window.scrollTo({ top: 0 });
  };

  const recent = user ? getByOwner(user.nationalId) : [];

  return (
    <div className="container-dga animate-fade-in py-8">
      <Breadcrumb items={[{ label: t("bc_home"), to: "/" }, { label: t("nav_track") }]} />
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {t("nav_track")}
      </h1>
      <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400">{t("track_intro")}</p>

      {/* Search */}
      <form onSubmit={doSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-11 flex-1 items-center gap-2.5 rounded-md border border-gray-300 bg-white px-3.5 focus-within:border-sa-500 focus-within:ring-2 focus-within:ring-sa-500/30 dark:border-gray-600 dark:bg-gray-900">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("track_ref_ph")}
            aria-label={t("track_ref_label")}
            className="h-full flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
            dir="ltr"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
        >
          {t("track_btn")}
        </button>
      </form>

      {/* Result */}
      {result === null && (
        <div className="mt-5">
          <Alert tone="error">{t("track_not_found")}</Alert>
        </div>
      )}

      {result && (
        <Card className="mt-5 p-6">
          <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[16px] font-bold text-gray-900 dark:text-white">
                {t(result.titleKey)}
              </p>
              <p className="mt-1 font-mono text-[13px] text-gray-500 dark:text-gray-400" dir="ltr">
                {result.id}
              </p>
              <p className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                {t("app_submitted_on")} {formatDate(result.submittedAt, locale)}
              </p>
            </div>
            <StatusBadge status={result.status} />
          </div>
          <div className="pt-5">
            <h2 className="mb-3 text-[14px] font-semibold text-gray-700 dark:text-gray-200">
              {t("status_timeline")}
            </h2>
            <StatusTimeline status={result.status} />
          </div>
        </Card>
      )}

      {/* Recent requests */}
      {recent.length > 0 && (
        <>
          <h2 className="mb-4 mt-10 text-lg font-bold text-gray-900 dark:text-white">
            {t("your_requests")}
          </h2>
          <div className="flex flex-col gap-4">
            {recent.map((r) => (
              <RequestCard key={r.id} request={r} onView={pick} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
