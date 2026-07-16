import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Copy,
  CreditCard,
  FileText,
  Flag,
  Mail,
  Pencil,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stepper, type Step } from "@/components/ui/Stepper";
import { Card } from "@/components/ui/Card";
import { ReadonlyField } from "@/components/ui/ReadonlyField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";

export default function RenewPassport() {
  const { t, dir } = useLocale();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(true);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const steps: Step[] = [
    { label: t("step_verify"), icon: Check },
    { label: t("step_documents"), icon: FileText },
    { label: t("step_delivery"), icon: Truck },
    { label: t("step_review"), icon: Pencil },
    { label: t("step_pay"), icon: CreditCard },
  ];

  return (
    <div className="container-dga animate-fade-in py-6">
      <Breadcrumb
        items={[
          { label: t("bc_home"), to: "/" },
          { label: t("bc_services"), to: "/services" },
          { label: t("bc_renew"), to: "/services/renew" },
          { label: t("bc_verify") },
        ]}
      />

      {/* Stepper */}
      <div className="mt-5 overflow-x-auto pb-2">
        <Stepper steps={steps} current={0} />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
        {t("renew_title")}
      </h1>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
        <span className="text-gray-400">ⓘ</span>
        {t("verify_intro")}
      </p>

      {/* Details grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          {/* Personal information */}
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("personal_info")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField label={t("full_name")} value={t("full_name_val")} icon={User} />
              <ReadonlyField label={t("dob")} value={t("dob_val")} icon={Calendar} />
              <ReadonlyField
                label={t("nationality")}
                value={t("nationality_val")}
                icon={Flag}
              />
            </div>
          </Card>

          {/* Passport information */}
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("passport_info")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField
                label={t("current_passport_no")}
                value={t("current_passport_val")}
                icon={Copy}
              />
              <ReadonlyField
                label={t("passport_expiry")}
                value={t("passport_expiry_val")}
                icon={Calendar}
              />
            </div>
          </Card>
        </div>

        {/* Contact details */}
        <div>
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("contact_details")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField label={t("mobile")} value={t("mobile_val")} icon={Phone} />
              <ReadonlyField label={t("email")} value={t("email_val")} icon={Mail} />
            </div>
          </Card>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-6">
        <Alert tone="info" dismissible>
          <span className="font-semibold">{t("important_label")}</span>{" "}
          <button className="font-medium text-info-text underline-offset-2 hover:underline">
            {t("something_wrong")}
          </button>
        </Alert>
      </div>

      {/* Confirm + actions */}
      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
        <Checkbox
          label={t("confirm_correct")}
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <div className="mt-5 flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex h-11 items-center justify-center rounded-md border border-error/40 px-6 text-[15px] font-medium text-error-text transition-colors hover:bg-error-bg dark:border-error/50"
          >
            {t("cancel")}
          </button>
          <button
            disabled={!confirmed}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-sa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {t("confirm_continue")}
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
