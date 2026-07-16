import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { services } from "@/data/services";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function Services() {
  const { t, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="container-dga animate-fade-in py-8">
      <Breadcrumb
        items={[{ label: t("bc_home"), to: "/" }, { label: t("nav_services") }]}
      />
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {t("nav_services")}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <Link
              key={svc.id}
              to={svc.to}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-sa-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-sa-600"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white">
                {t(svc.titleKey)}
              </h3>
              <p className="mt-1 flex-1 text-[14px] text-gray-500 dark:text-gray-400">
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
    </div>
  );
}
