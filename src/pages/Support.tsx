import { useState } from "react";
import { ChevronDown, Clock, Mail, Phone } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import type { TranslationKey } from "@/i18n/translations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const faqs: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faq_q1", a: "faq_a1" },
  { q: "faq_q2", a: "faq_a2" },
  { q: "faq_q3", a: "faq_a3" },
  { q: "faq_q4", a: "faq_a4" },
];

export default function Support() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-dga animate-fade-in py-8">
      <Breadcrumb items={[{ label: t("bc_home"), to: "/" }, { label: t("nav_support") }]} />
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {t("nav_support")}
      </h1>
      <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400">{t("support_intro")}</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* FAQ */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            {t("faq_title")}
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <Card key={i} className="overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
                      {t(item.q)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-gray-400 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[14px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {t(item.a)}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            {t("contact_title")}
          </h2>
          <Card className="flex flex-col gap-5 p-6">
            <ContactRow icon={<Phone className="h-5 w-5" />} label={t("contact_phone")}>
              <span dir="ltr" className="tabular-nums">
                920020405
              </span>
            </ContactRow>
            <ContactRow icon={<Mail className="h-5 w-5" />} label={t("contact_email")}>
              <span dir="ltr">care@jawaz.gov.sa</span>
            </ContactRow>
            <ContactRow icon={<Clock className="h-5 w-5" />} label={t("contact_hours")}>
              {t("contact_hours_val")}
            </ContactRow>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
        {icon}
      </span>
      <div>
        <p className="text-[13px] text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-[15px] font-medium text-gray-900 dark:text-white">{children}</p>
      </div>
    </div>
  );
}
