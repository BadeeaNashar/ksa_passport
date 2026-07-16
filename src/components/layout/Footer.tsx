import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Eye, ZoomIn } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import type { TranslationKey } from "@/i18n/translations";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 border-b border-white/15 pb-3 text-[15px] font-semibold text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              to={l.to}
              className="text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconBtn({ children }: { children: ReactNode }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white">
      {children}
    </button>
  );
}

export function Footer() {
  const { t } = useLocale();

  const overview: { to: string; label: string; key: TranslationKey }[] = [
    { to: "/about", label: t("footer_about_name"), key: "footer_about_name" },
    { to: "/services", label: t("footer_eservices"), key: "footer_eservices" },
    { to: "/sitemap", label: t("footer_sitemap"), key: "footer_sitemap" },
  ];
  const support = [
    { to: "/support", label: t("footer_contact_support") },
    { to: "/support", label: t("footer_sla") },
    { to: "/support", label: t("footer_faq") },
  ];

  return (
    <footer className="mt-16 bg-sa-900 text-white">
      <div className="container-dga grid grid-cols-1 gap-10 py-14 md:grid-cols-3">
        <FooterCol title={t("footer_overview")} links={overview} />
        <FooterCol title={t("footer_help")} links={support} />

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="mb-4 border-b border-white/15 pb-3 text-[15px] font-semibold text-white">
              {t("footer_contact_us")}
            </h3>
            <div className="flex items-center gap-3">
              <IconBtn>
                <Phone className="h-4 w-4" />
              </IconBtn>
              <IconBtn>
                <Mail className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
          <div>
            <h3 className="mb-4 border-b border-white/15 pb-3 text-[15px] font-semibold text-white">
              {t("footer_accessibility")}
            </h3>
            <div className="flex items-center gap-3">
              <IconBtn>
                <Eye className="h-4 w-4" />
              </IconBtn>
              <IconBtn>
                <ZoomIn className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
        </div>
      </div>

      <div className="container-dga pb-10">
        <p className="text-[13px] font-semibold text-white">{t("footer_rights")}</p>
        <div className="mt-3 flex items-center gap-6 text-[13px] text-white/70">
          <Link to="/terms" className="hover:text-white">
            {t("footer_terms")}
          </Link>
          <Link to="/privacy" className="hover:text-white">
            {t("footer_privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
