import { useNavigate } from "react-router-dom";
import { FileStack, Plus } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useAuth } from "@/auth/AuthContext";
import { useRequests } from "@/store/RequestsContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RequestCard } from "@/components/RequestCard";

export default function MyApplications() {
  const { t } = useLocale();
  const { user } = useAuth();
  const { getByOwner } = useRequests();
  const navigate = useNavigate();
  if (!user) return null;

  const requests = getByOwner(user.nationalId);

  return (
    <div className="container-dga animate-fade-in py-8">
      <Breadcrumb items={[{ label: t("bc_home"), to: "/" }, { label: t("nav_apps") }]} />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {t("nav_apps")}
          </h1>
          <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400">{t("apps_intro")}</p>
        </div>
        <button
          onClick={() => navigate("/services")}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
        >
          <Plus className="h-4 w-4" />
          {t("new_request")}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-700">
            <FileStack className="h-7 w-7" />
          </span>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">{t("apps_empty")}</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {requests.map((r) => (
            <RequestCard
              key={r.id}
              request={r}
              onView={(id) => navigate(`/track?ref=${encodeURIComponent(id)}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
