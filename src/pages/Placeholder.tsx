import { Construction } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import type { TranslationKey } from "@/i18n/translations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function Placeholder({ titleKey }: { titleKey: TranslationKey }) {
  const { t } = useLocale();
  return (
    <div className="container-dga animate-fade-in py-8">
      <Breadcrumb items={[{ label: t("bc_home"), to: "/" }, { label: t(titleKey) }]} />
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {t(titleKey)}
      </h1>
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
          <Construction className="h-7 w-7" />
        </span>
        <p className="text-[15px] text-gray-500 dark:text-gray-400">{t("coming_soon")}</p>
      </div>
    </div>
  );
}
