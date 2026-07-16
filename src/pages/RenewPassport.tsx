import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  FileText,
  Flag,
  Home,
  Mail,
  Pencil,
  Phone,
  Smartphone,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import type { TranslationKey } from "@/i18n/translations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stepper, type Step } from "@/components/ui/Stepper";
import { Card } from "@/components/ui/Card";
import { ReadonlyField } from "@/components/ui/ReadonlyField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";
import { RadioCard } from "@/components/ui/RadioCard";
import { UploadCard } from "@/components/ui/UploadCard";
import { Input } from "@/components/ui/Input";

type DeliveryMethod = "pickup" | "home";
type PayMethod = "mada" | "card" | "applepay" | "stcpay";

interface FormState {
  confirmed: boolean;
  docs: { photo?: string; id?: string; passport?: string };
  delivery: { method?: DeliveryMethod; branch?: string; address: string };
  payment: { method?: PayMethod; cardNo: string; expiry: string; cvv: string; name: string };
}

const SERVICE_FEE = 300;
const DELIVERY_FEE = 30;

export default function RenewPassport() {
  const { t, dir } = useLocale();
  const navigate = useNavigate();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [form, setForm] = useState<FormState>({
    confirmed: true,
    docs: {},
    delivery: { method: undefined, branch: undefined, address: "" },
    payment: { method: undefined, cardNo: "", expiry: "", cvv: "", name: "" },
  });

  const stepLabels: TranslationKey[] = [
    "step_verify",
    "step_documents",
    "step_delivery",
    "step_review",
    "step_pay",
  ];
  const steps: Step[] = [
    { label: t("step_verify"), icon: Check },
    { label: t("step_documents"), icon: FileText },
    { label: t("step_delivery"), icon: Truck },
    { label: t("step_review"), icon: Pencil },
    { label: t("step_pay"), icon: CreditCard },
  ];

  const deliveryFee = form.delivery.method === "home" ? DELIVERY_FEE : 0;
  const total = SERVICE_FEE + deliveryFee;

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return form.confirmed;
      case 1:
        return !!(form.docs.photo && form.docs.id && form.docs.passport);
      case 2:
        if (form.delivery.method === "pickup") return !!form.delivery.branch;
        if (form.delivery.method === "home") return form.delivery.address.trim().length > 5;
        return false;
      case 3:
        return true;
      case 4: {
        const { method, cardNo, expiry, cvv, name } = form.payment;
        if (!method) return false;
        if (method === "mada" || method === "card")
          return cardNo.length >= 12 && expiry.length >= 4 && cvv.length >= 3 && name.trim().length > 2;
        return true;
      }
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step === 4) {
      setRefNo("RNW-2026" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
      window.scrollTo({ top: 0 });
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo({ top: 0 });
  };
  const goBack = () => {
    if (step === 0) {
      navigate("/");
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0 });
  };

  const nextLabel =
    step === 0
      ? t("confirm_continue")
      : step === 3
        ? t("to_payment")
        : step === 4
          ? t("pay_now")
          : t("continue_btn");

  if (submitted) return <SuccessScreen refNo={refNo} />;

  return (
    <div className="container-dga animate-fade-in py-6">
      <Breadcrumb
        items={[
          { label: t("bc_home"), to: "/" },
          { label: t("bc_services"), to: "/services" },
          { label: t("bc_renew"), to: "/services/renew" },
          { label: t(stepLabels[step]) },
        ]}
      />

      <div className="mt-5 overflow-x-auto pb-2">
        <Stepper steps={steps} current={step} />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
        {t("renew_title")}
      </h1>

      <div className="mt-5">
        {step === 0 && <VerifyStep form={form} setForm={setForm} />}
        {step === 1 && <DocumentsStep form={form} setForm={setForm} />}
        {step === 2 && <DeliveryStep form={form} setForm={setForm} />}
        {step === 3 && (
          <ReviewStep form={form} deliveryFee={deliveryFee} total={total} onEdit={setStep} />
        )}
        {step === 4 && <PayStep form={form} setForm={setForm} total={total} />}
      </div>

      {/* Actions */}
      <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
        <div className="flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center">
          <button
            onClick={goBack}
            className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 px-6 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {step === 0 ? t("cancel") : t("previous")}
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-sa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {nextLabel}
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: Verify ---------- */
function VerifyStep({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t } = useLocale();
  return (
    <>
      <p className="mb-5 flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
        <span className="text-gray-400">ⓘ</span>
        {t("verify_intro")}
      </p>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("personal_info")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField label={t("full_name")} value={t("full_name_val")} icon={User} />
              <ReadonlyField label={t("dob")} value={t("dob_val")} icon={Calendar} />
              <ReadonlyField label={t("nationality")} value={t("nationality_val")} icon={Flag} />
            </div>
          </Card>
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

      <div className="mt-6">
        <Alert tone="info" dismissible>
          <span className="font-semibold">{t("important_label")}</span>{" "}
          <button className="font-medium text-info-text underline-offset-2 hover:underline">
            {t("something_wrong")}
          </button>
        </Alert>
      </div>

      <div className="mt-6">
        <Checkbox
          label={t("confirm_correct")}
          checked={form.confirmed}
          onChange={(e) => setForm((f) => ({ ...f, confirmed: e.target.checked }))}
        />
      </div>
    </>
  );
}

/* ---------- Step 2: Documents ---------- */
function DocumentsStep({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t } = useLocale();
  const set = (key: keyof FormState["docs"]) => (fileName?: string) =>
    setForm((f) => ({ ...f, docs: { ...f.docs, [key]: fileName } }));

  return (
    <>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("docs_title")}</h2>
      <p className="mb-5 mt-1 text-[13px] text-gray-500 dark:text-gray-400">{t("docs_intro")}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UploadCard
          title={t("doc_photo")}
          description={t("doc_photo_desc")}
          value={form.docs.photo}
          onChange={set("photo")}
        />
        <UploadCard
          title={t("doc_id")}
          description={t("doc_id_desc")}
          value={form.docs.id}
          onChange={set("id")}
        />
        <UploadCard
          title={t("doc_old_passport")}
          description={t("doc_old_passport_desc")}
          value={form.docs.passport}
          onChange={set("passport")}
        />
      </div>
    </>
  );
}

/* ---------- Step 3: Delivery ---------- */
function DeliveryStep({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t } = useLocale();
  const method = form.delivery.method;
  const branches: { id: string; key: TranslationKey }[] = [
    { id: "riyadh", key: "branch_riyadh" },
    { id: "jeddah", key: "branch_jeddah" },
    { id: "dammam", key: "branch_dammam" },
  ];

  return (
    <>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("delivery_title")}</h2>
      <p className="mb-5 mt-1 text-[13px] text-gray-500 dark:text-gray-400">
        {t("delivery_intro")}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RadioCard
          selected={method === "pickup"}
          onSelect={() => setForm((f) => ({ ...f, delivery: { ...f.delivery, method: "pickup" } }))}
          title={t("delivery_pickup")}
          description={t("delivery_pickup_desc")}
          icon={<Building2 className="h-5 w-5" />}
        />
        <RadioCard
          selected={method === "home"}
          onSelect={() => setForm((f) => ({ ...f, delivery: { ...f.delivery, method: "home" } }))}
          title={t("delivery_home")}
          description={t("delivery_home_desc")}
          icon={<Home className="h-5 w-5" />}
        />
      </div>

      {method === "pickup" && (
        <div className="mt-5 max-w-md">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t("delivery_branch_label")}
          </label>
          <select
            value={form.delivery.branch ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, delivery: { ...f.delivery, branch: e.target.value } }))
            }
            className="h-11 w-full rounded-md border border-gray-300 bg-white px-3.5 text-[15px] text-gray-900 focus:border-sa-500 focus:outline-none focus:ring-2 focus:ring-sa-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="" disabled>
              —
            </option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {t(b.key)}
              </option>
            ))}
          </select>
        </div>
      )}

      {method === "home" && (
        <div className="mt-5 max-w-md">
          <Input
            label={t("delivery_address_label")}
            placeholder={t("delivery_address_ph")}
            value={form.delivery.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, delivery: { ...f.delivery, address: e.target.value } }))
            }
          />
        </div>
      )}
    </>
  );
}

/* ---------- Step 4: Review ---------- */
function ReviewStep({
  form,
  deliveryFee,
  total,
  onEdit,
}: {
  form: FormState;
  deliveryFee: number;
  total: number;
  onEdit: (step: number) => void;
}) {
  const { t } = useLocale();
  const branchLabels: Record<string, TranslationKey> = {
    riyadh: "branch_riyadh",
    jeddah: "branch_jeddah",
    dammam: "branch_dammam",
  };
  const deliveryText =
    form.delivery.method === "pickup"
      ? t("delivery_pickup") +
        (form.delivery.branch ? " — " + t(branchLabels[form.delivery.branch]) : "")
      : form.delivery.method === "home"
        ? t("delivery_home") + " — " + form.delivery.address
        : "";
  const docCount = Object.values(form.docs).filter(Boolean).length;

  return (
    <>
      <p className="mb-5 text-[13px] text-gray-500 dark:text-gray-400">{t("review_intro")}</p>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReviewCard title={t("personal_info")} onEdit={() => onEdit(0)}>
          <ReviewRow label={t("full_name")} value={t("full_name_val")} />
          <ReviewRow label={t("dob")} value={t("dob_val")} />
          <ReviewRow label={t("nationality")} value={t("nationality_val")} />
          <ReviewRow label={t("mobile")} value={t("mobile_val")} />
          <ReviewRow label={t("email")} value={t("email_val")} />
        </ReviewCard>

        <div className="flex flex-col gap-5">
          <ReviewCard title={t("review_docs")} onEdit={() => onEdit(1)}>
            <ReviewRow label={t("doc_photo")} value={form.docs.photo ?? "—"} />
            <ReviewRow label={t("doc_id")} value={form.docs.id ?? "—"} />
            <ReviewRow label={t("doc_old_passport")} value={form.docs.passport ?? "—"} />
            <p className="pt-1 text-[12px] text-gray-400">{docCount}/3</p>
          </ReviewCard>

          <ReviewCard title={t("review_delivery")} onEdit={() => onEdit(2)}>
            <ReviewRow label={t("delivery_title")} value={deliveryText || "—"} />
          </ReviewCard>
        </div>
      </div>

      {/* Fees */}
      <Card className="mt-5 p-6">
        <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
          {t("review_fees")}
        </h2>
        <div className="flex flex-col gap-2.5 text-[14px]">
          <FeeRow label={t("fee_service")} amount={`${SERVICE_FEE} ${t("currency")}`} />
          <FeeRow label={t("fee_delivery")} amount={`${deliveryFee} ${t("currency")}`} />
          <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white">
              {t("fee_total")}
            </span>
            <span className="text-[15px] font-bold text-sa-700 dark:text-sa-300 tabular-nums">
              {total} {t("currency")}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">{title}</h2>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-sa-600 hover:underline dark:text-sa-300"
        >
          <Pencil className="h-3.5 w-3.5" />
          {t("edit")}
        </button>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </Card>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-[14px]">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-end font-medium text-gray-900 dark:text-white" dir="auto">
        {value}
      </span>
    </div>
  );
}

function FeeRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white tabular-nums">{amount}</span>
    </div>
  );
}

/* ---------- Step 5: Pay ---------- */
function PayStep({
  form,
  setForm,
  total,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  total: number;
}) {
  const { t } = useLocale();
  const method = form.payment.method;
  const setPay = (patch: Partial<FormState["payment"]>) =>
    setForm((f) => ({ ...f, payment: { ...f.payment, ...patch } }));

  const methods: { id: PayMethod; key: TranslationKey; icon: React.ReactNode }[] = [
    { id: "mada", key: "pay_mada", icon: <CreditCard className="h-5 w-5" /> },
    { id: "card", key: "pay_card", icon: <CreditCard className="h-5 w-5" /> },
    { id: "applepay", key: "pay_applepay", icon: <Wallet className="h-5 w-5" /> },
    { id: "stcpay", key: "pay_stcpay", icon: <Smartphone className="h-5 w-5" /> },
  ];

  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("pay_title")}</h2>
        <p className="text-[13px] text-gray-500 dark:text-gray-400">{t("pay_intro")}</p>
      </div>

      {/* Amount due banner */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-subtle px-5 py-4 dark:bg-sa-600/15">
        <span className="text-[14px] font-medium text-sa-800 dark:text-sa-200">
          {t("amount_due")}
        </span>
        <span className="text-xl font-bold text-sa-700 dark:text-sa-200 tabular-nums">
          {total} {t("currency")}
        </span>
      </div>

      <h3 className="mb-3 mt-6 text-[14px] font-semibold text-gray-700 dark:text-gray-200">
        {t("pay_method")}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {methods.map((m) => (
          <RadioCard
            key={m.id}
            selected={method === m.id}
            onSelect={() => setPay({ method: m.id })}
            title={t(m.key)}
            icon={m.icon}
          />
        ))}
      </div>

      {(method === "mada" || method === "card") && (
        <Card className="mt-5 max-w-lg p-6">
          <div className="flex flex-col gap-4">
            <Input
              label={t("pay_name_on_card")}
              value={form.payment.name}
              onChange={(e) => setPay({ name: e.target.value })}
            />
            <Input
              label={t("pay_card_number")}
              inputMode="numeric"
              placeholder="•••• •••• •••• ••••"
              value={form.payment.cardNo}
              onChange={(e) => setPay({ cardNo: e.target.value.replace(/[^\d]/g, "") })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t("pay_expiry")}
                placeholder="MM/YY"
                value={form.payment.expiry}
                onChange={(e) => setPay({ expiry: e.target.value })}
              />
              <Input
                label={t("pay_cvv")}
                inputMode="numeric"
                placeholder="•••"
                value={form.payment.cvv}
                onChange={(e) => setPay({ cvv: e.target.value.replace(/[^\d]/g, "") })}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

/* ---------- Success ---------- */
function SuccessScreen({ refNo }: { refNo: string }) {
  const { t } = useLocale();
  const navigate = useNavigate();
  return (
    <div className="container-dga animate-scale-in py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("success_title")}</h1>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-gray-500 dark:text-gray-400">
          {t("success_desc")}
        </p>

        <div className="mx-auto mt-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
          <span className="text-[14px] text-gray-500 dark:text-gray-400">{t("success_ref")}</span>
          <span className="font-mono text-[15px] font-bold text-gray-900 dark:text-white" dir="ltr">
            {refNo}
          </span>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/track")}
            className="inline-flex h-11 items-center justify-center rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
          >
            {t("success_track")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 px-6 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {t("success_home")}
          </button>
        </div>
      </div>
    </div>
  );
}
