import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="container-dga flex flex-col items-center justify-center py-28 text-center">
      <p className="text-6xl font-bold text-sa-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {t("page_not_found")}
      </h1>
      <p className="mt-2 text-[15px] text-gray-500 dark:text-gray-400">
        {t("not_found_desc")}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
      >
        {t("back_home")}
      </Link>
    </div>
  );
}
