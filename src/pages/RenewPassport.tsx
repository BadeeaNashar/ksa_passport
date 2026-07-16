import { useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  FileText,
  Flag,
  Headphones,
  Home,
  Info,
  Link,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  RefreshCw,
  ShieldCheck,
  Truck,
  UploadCloud,
  User,
  XCircle,
  type IconType,
} from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useAuth } from "@/auth/AuthContext";
import { useRequests } from "@/store/RequestsContext";
import type { TranslationKey } from "@/i18n/translations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stepper, type Step } from "@/components/ui/Stepper";
import { Card } from "@/components/ui/Card";
import { ReadonlyField } from "@/components/ui/ReadonlyField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";

type DeliveryMethod = "home" | "locker";
type PayMethod = "sadad" | "applepay" | "madavisa";
type Result = "success" | "fail";

interface FormState {
  confirmed: boolean;
  photoUploaded: boolean;
  appointment: { date: string; time: string; office: "office1" | "office2" };
  delivery: {
    method: DeliveryMethod;
    street: string;
    building: string;
    floor: string;
    city: string;
    phone: string;
    zip: string;
  };
  payment: { method: PayMethod; name: string; cardNo: string; expiry: string; cvv: string };
}

// Fixed wireframe fees (SAR).
const FEE_ISSUANCE = 300;
const FEE_SERVICE = 20;
const FEE_VAT = 30;
const FEE_TOTAL = FEE_ISSUANCE + FEE_SERVICE + FEE_VAT; // 350

interface Receipt {
  requestNo: string;
  reference: string;
  date: string;
}

export default function RenewPassport() {
  const { t, dir, locale } = useLocale();
  const { user } = useAuth();
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [paying, setPaying] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const [form, setForm] = useState<FormState>(() => ({
    confirmed: true,
    photoUploaded: true,
    appointment: { date: "2026-07-18", time: "19:00", office: "office1" },
    delivery: {
      method: "home",
      street: locale === "ar" ? "طريق العروبة" : "Al Urubah Road",
      building: "2841",
      floor: "4B",
      city: locale === "ar" ? "الرياض" : "Riyadh",
      phone: "+966 5• ••• ••21",
      zip: "57475",
    },
    payment: { method: "madavisa", name: "", cardNo: "", expiry: "", cvv: "" },
  }));

  const steps: Step[] = [
    { label: t("step_verify"), icon: Check },
    { label: t("step_documents"), icon: FileText },
    { label: t("step_appointment"), icon: Calendar },
    { label: t("step_delivery"), icon: Truck },
    { label: t("step_review"), icon: Pencil },
    { label: t("step_pay"), icon: CreditCard },
  ];
  const stepLabels: TranslationKey[] = [
    "step_verify",
    "step_documents",
    "step_appointment",
    "step_delivery",
    "step_review",
  ];

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return form.confirmed;
      case 1:
        return form.photoUploaded;
      case 2:
        return !!(form.appointment.date && form.appointment.time && form.appointment.office);
      case 3:
        return !!form.delivery.method;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, 4));
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

  const makeReceipt = (): Receipt => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const weekday = now.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      weekday: "short",
    });
    return {
      requestNo: String(Math.floor(100000 + Math.random() * 900000)),
      reference: `REF-${yyyy}-${mm}${dd}-003`,
      date: `${weekday} ${dd} / ${mm} / ${yyyy}`,
    };
  };

  const onPay = () => {
    if (paying) return;
    setPaying(true);
    const r = makeReceipt();
    const { method, name, cardNo, expiry, cvv } = form.payment;
    const digits = cardNo.replace(/\D/g, "");
    const cardComplete =
      name.trim().length > 1 && digits.length >= 12 && expiry.length >= 4 && cvv.length >= 3;
    const declined = digits === "4000000000000002";
    const ok = method === "madavisa" ? cardComplete && !declined : true;

    window.setTimeout(() => {
      setPaying(false);
      setReceipt(r);
      if (ok) {
        addRequest({
          id: r.reference,
          owner: user?.nationalId ?? "",
          type: "renew",
          titleKey: "renew_passport",
          status: "submitted",
          submittedAt: new Date().toISOString().slice(0, 10),
          fee: FEE_TOTAL,
          delivery: form.delivery.method === "home" ? "delivery_home" : "delivery_pickup",
        });
        setResult("success");
      } else {
        setResult("fail");
      }
      window.scrollTo({ top: 0 });
    }, 1000);
  };

  if (result && receipt) {
    return (
      <ResultScreen
        result={result}
        receipt={receipt}
        onRetry={() => {
          setResult(null);
          setReceipt(null);
        }}
      />
    );
  }

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

      <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">{t("renew_title")}</h1>

      <div className="mt-5 overflow-x-auto pb-2">
        <Stepper steps={steps} current={step} />
      </div>

      <div className="mt-5">
        {step === 0 && <VerifyStep form={form} setForm={setForm} />}
        {step === 1 && <DocumentsStep setForm={setForm} />}
        {step === 2 && <AppointmentStep form={form} setForm={setForm} />}
        {step === 3 && <DeliveryStep form={form} setForm={setForm} />}
        {step === 4 && (
          <ReviewStep
            form={form}
            setForm={setForm}
            paying={paying}
            onBack={goBack}
            onEdit={setStep}
            onPay={onPay}
          />
        )}
      </div>

      {/* Bottom actions (steps 0–3; the Review step pays inline) */}
      {step <= 3 && (
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div
            className={
              step === 1
                ? "flex justify-end"
                : "flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center"
            }
          >
            {step !== 1 && (
              <button
                onClick={goBack}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                {step === 0 ? (
                  t("cancel")
                ) : (
                  <>
                    <Arrow className="h-4 w-4 rotate-180" />
                    {t("back")}
                  </>
                )}
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-sa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {step === 0 ? t("confirm_continue") : t("continue_btn")}
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
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
  const { t, locale } = useLocale();
  const { user } = useAuth();
  if (!user) return null;
  return (
    <>
      <p className="mb-5 flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
        <Info className="h-4 w-4" />
        {t("verify_intro")}
      </p>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("personal_info")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField label={t("full_name")} value={user.name[locale]} icon={User} />
              <ReadonlyField label={t("dob")} value={user.dob} icon={Calendar} />
              <ReadonlyField label={t("nationality")} value={user.nationality[locale]} icon={Flag} />
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("passport_info")}
            </h2>
            <div className="flex flex-col gap-4">
              <ReadonlyField label={t("current_passport_no")} value={user.passportNo} icon={Copy} />
              <ReadonlyField
                label={t("passport_expiry")}
                value={user.passportExpiry}
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
              <ReadonlyField label={t("mobile")} value={user.mobile} icon={Phone} />
              <ReadonlyField label={t("email")} value={user.email} icon={Mail} />
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
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t } = useLocale();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <p className="mb-5 text-[13px] text-gray-500 dark:text-gray-400">{t("docs_intro_v2")}</p>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-bg text-success">
            <Check className="h-5 w-5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("doc_passport_photo")}
            </p>
            <p className="text-[13px] font-medium text-success-text">{t("uploaded")}</p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => setForm((f) => ({ ...f, photoUploaded: true }))}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-300 px-4 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          <UploadCloud className="h-4 w-4" />
          {t("replace")}
        </button>
      </div>

      <div className="mt-4">
        <Alert tone="info" dismissible>
          <span className="font-semibold">{t("important_label")}</span>{" "}
          <button className="font-medium text-info-text underline-offset-2 hover:underline">
            {t("docs_absher_note")}
          </button>
        </Alert>
      </div>
    </>
  );
}

/* ---------- Step 3: Appointment ---------- */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function AppointmentStep({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t, locale } = useLocale();
  const loc = locale === "ar" ? "ar-SA" : "en-US";
  const appt = form.appointment;
  const setAppt = (patch: Partial<FormState["appointment"]>) =>
    setForm((f) => ({ ...f, appointment: { ...f.appointment, ...patch } }));

  const [view, setView] = useState(() => {
    const d = new Date(appt.date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const minDate = new Date(2026, 6, 13); // earliest bookable day

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(loc, { weekday: "short" }).format(new Date(2024, 0, 7 + i)),
  );
  const monthTitle = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric" }).format(view);

  const times: { key: TranslationKey; slots: string[] }[] = [
    { key: "appt_morning", slots: ["08:00", "09:00", "10:00"] },
    { key: "appt_afternoon", slots: ["12:00", "13:30", "14:00"] },
    { key: "appt_evening", slots: ["17:00", "18:30", "19:00"] },
  ];
  const offices: { id: "office1" | "office2"; name: TranslationKey; meta: TranslationKey }[] = [
    { id: "office1", name: "office1_name", meta: "office1_meta" },
    { id: "office2", name: "office2_name", meta: "office2_meta" },
  ];

  return (
    <>
      <p className="mb-5 text-[13px] text-gray-500 dark:text-gray-400">{t("appt_intro")}</p>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        {/* Left: calendar + offices */}
        <div className="flex flex-col gap-5">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
                <Calendar className="h-4 w-4 text-gray-400" />
                {monthTitle}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView(new Date(year, month - 1, 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  aria-label="previous month"
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => setView(new Date(year, month + 1, 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  aria-label="next month"
                >
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdays.map((w) => (
                <div key={w} className="py-1 text-[12px] font-medium text-gray-400">
                  {w}
                </div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`b${i}`} />;
                const ds = `${year}-${pad2(month + 1)}-${pad2(day)}`;
                const dayDate = new Date(year, month, day);
                const disabled = dayDate < minDate;
                const selected = ds === appt.date;
                return (
                  <button
                    key={ds}
                    disabled={disabled}
                    onClick={() => setAppt({ date: ds })}
                    className={
                      "mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-[13px] transition-colors " +
                      (selected
                        ? "bg-sa-600 font-semibold text-white"
                        : disabled
                          ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800")
                    }
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("appt_nearby")}
            </h2>
            <div className="flex flex-col gap-3">
              {offices.map((o) => {
                const selected = appt.office === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setAppt({ office: o.id })}
                    className={
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-start transition-colors " +
                      (selected
                        ? "border-sa-600 ring-1 ring-sa-600"
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700")
                    }
                  >
                    <RadioDot selected={selected} />
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="flex-1">
                      <span className="block text-[14px] font-semibold text-gray-900 dark:text-white">
                        {t(o.name)}
                      </span>
                      <span className="block text-[12px] text-gray-500 dark:text-gray-400">
                        {t(o.meta)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <button className="inline-flex items-center gap-1 self-start text-[14px] font-medium text-sa-600 hover:underline dark:text-sa-300">
            {t("appt_skip")}
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>

        {/* Right: time picker */}
        <Card className="p-5">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
            <Clock className="h-4 w-4 text-gray-400" />
            {t("appt_pick_time")}
          </h2>

          <div className="flex flex-col gap-4">
            {times.map((group) => (
              <div key={group.key}>
                <p className="mb-2 text-[13px] font-medium text-gray-600 dark:text-gray-300">
                  {t(group.key)}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {group.slots.map((slot) => {
                    const selected = appt.time === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setAppt({ time: slot })}
                        className={
                          "h-11 rounded-lg border text-[14px] font-medium tabular-nums transition-colors " +
                          (selected
                            ? "border-sa-600 bg-sa-600 text-white"
                            : "border-gray-300 text-gray-700 hover:border-sa-400 dark:border-gray-600 dark:text-gray-200")
                        }
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-gray-50 p-3.5 dark:bg-gray-800/60">
            <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
            <div>
              <p className="text-[14px] font-medium text-gray-900 dark:text-white">
                {fmtApptLong(appt.date, appt.time, loc)}
              </p>
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                {t(appt.office === "office1" ? "office1_name" : "office2_name")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

/* ---------- Step 4: Delivery ---------- */
function DeliveryStep({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const { t } = useLocale();
  const method = form.delivery.method;
  const setDelivery = (patch: Partial<FormState["delivery"]>) =>
    setForm((f) => ({ ...f, delivery: { ...f.delivery, ...patch } }));

  return (
    <>
      <p className="mb-5 text-[13px] text-gray-500 dark:text-gray-400">{t("delivery_intro")}</p>

      <div className="flex flex-col gap-4">
        {/* Home delivery */}
        <div
          className={
            "rounded-xl border p-5 transition-colors " +
            (method === "home"
              ? "border-sa-600 ring-1 ring-sa-600"
              : "border-gray-200 dark:border-gray-700")
          }
        >
          <button
            type="button"
            onClick={() => setDelivery({ method: "home" })}
            className="flex w-full items-center gap-3 text-start"
          >
            <RadioDot selected={method === "home"} />
            <Home className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            <span className="flex-1 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("delivery_home_title")}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-gray-400">
              <Truck className="h-4 w-4" />
              {t("delivery_home_badge")}
            </span>
          </button>

          {method === "home" && (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TextField
                label={t("addr_street")}
                icon={MapPin}
                value={form.delivery.street}
                onChange={(v) => setDelivery({ street: v })}
              />
              <TextField
                label={t("addr_building")}
                value={form.delivery.building}
                onChange={(v) => setDelivery({ building: v })}
              />
              <TextField
                label={t("addr_floor")}
                value={form.delivery.floor}
                onChange={(v) => setDelivery({ floor: v })}
              />
              <TextField
                label={t("addr_city")}
                value={form.delivery.city}
                onChange={(v) => setDelivery({ city: v })}
              />
              <TextField
                label={t("addr_phone")}
                icon={Phone}
                value={form.delivery.phone}
                onChange={(v) => setDelivery({ phone: v })}
              />
              <TextField
                label={t("addr_zip")}
                value={form.delivery.zip}
                onChange={(v) => setDelivery({ zip: v })}
              />
            </div>
          )}
        </div>

        {/* Smart locker */}
        <div
          className={
            "rounded-xl border p-5 transition-colors " +
            (method === "locker"
              ? "border-sa-600 ring-1 ring-sa-600"
              : "border-gray-200 dark:border-gray-700")
          }
        >
          <button
            type="button"
            onClick={() => setDelivery({ method: "locker" })}
            className="flex w-full items-center gap-3 text-start"
          >
            <RadioDot selected={method === "locker"} />
            <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            <span className="flex-1 text-[15px] font-semibold text-gray-900 dark:text-white">
              {t("delivery_locker_title")}
            </span>
          </button>

          <div className="mt-4 flex h-28 items-center justify-center rounded-lg bg-gray-100 text-[13px] text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {t("delivery_locker_map")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Step 4: Review + Payment ---------- */
function ReviewStep({
  form,
  setForm,
  paying,
  onBack,
  onEdit,
  onPay,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  paying: boolean;
  onBack: () => void;
  onEdit: (step: number) => void;
  onPay: () => void;
}) {
  const { t, locale } = useLocale();
  const { user } = useAuth();
  const method = form.payment.method;
  const setPay = (patch: Partial<FormState["payment"]>) =>
    setForm((f) => ({ ...f, payment: { ...f.payment, ...patch } }));
  const applicant = `${user ? user.firstName[locale] : ""} · ${t("id_masked")}`;
  const loc = locale === "ar" ? "ar-SA" : "en-US";
  const apptShort = fmtApptShort(form.appointment.date, form.appointment.time, loc);

  return (
    <>
      <p className="mb-4 text-[13px] text-gray-500 dark:text-gray-400">{t("review_subtitle")}</p>

      <button
        onClick={onBack}
        className="mb-5 inline-flex h-10 items-center gap-2 rounded-md border border-gray-300 px-4 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t("back")}
      </button>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
              <FileText className="h-4 w-4 text-gray-400" />
              {t("svc_details")}
            </h2>
            <div className="flex flex-col">
              <SvcRow label={t("svc_service")} value={t("svc_service_val")} />
              <SvcRow label={t("svc_type")} value={t("svc_type_val")} />
              <SvcRow
                label={t("svc_appointment")}
                value={apptShort}
                action={
                  <button
                    onClick={() => onEdit(2)}
                    className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-sa-600 hover:underline dark:text-sa-300"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {t("edit")}
                  </button>
                }
              />
              <SvcRow label={t("svc_applicant")} value={applicant} last />
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
                <Truck className="h-4 w-4 text-gray-400" />
                {t("review_delivery")}
              </h2>
              <button
                onClick={() => onEdit(3)}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-sa-600 hover:underline dark:text-sa-300"
              >
                <Pencil className="h-3.5 w-3.5" />
                {t("edit")}
              </button>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-gray-900 dark:text-white">
                  {t("delivery_summary_title")}
                </p>
                <p className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                  {form.delivery.street}, {form.delivery.city}
                </p>
              </div>
              <span className="whitespace-nowrap text-[12px] text-gray-500 dark:text-gray-400">
                {t("delivery_eta")}
              </span>
            </div>
          </Card>
        </div>

        {/* Right column — Payment */}
        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
            <CreditCard className="h-4 w-4 text-gray-400" />
            {t("payment")}
          </h2>

          <p className="mb-1 text-[13px] text-gray-500 dark:text-gray-400">{t("pay_method")}</p>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/60">
            <MethodRow
              selected={method === "sadad"}
              onSelect={() => setPay({ method: "sadad" })}
              label={t("pay_sadad")}
              brand={<SadadMark />}
            />
            <MethodRow
              selected={method === "applepay"}
              onSelect={() => setPay({ method: "applepay" })}
              label={t("pay_applepay")}
              brand={<ApplePayMark />}
            />
            <MethodRow
              selected={method === "madavisa"}
              onSelect={() => setPay({ method: "madavisa" })}
              label={t("pay_madavisa")}
              brand={<MadaMark />}
            />
          </div>

          {method === "madavisa" && (
            <div className="mt-4 flex flex-col gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <TextField
                label={t("cardholder_name")}
                placeholder={t("cardholder_ph")}
                value={form.payment.name}
                onChange={(v) => setPay({ name: v })}
              />
              <TextField
                label={t("card_number")}
                placeholder={t("card_number_ph")}
                inputMode="numeric"
                value={form.payment.cardNo}
                onChange={(v) => setPay({ cardNo: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label={t("card_expiry")}
                  placeholder={t("card_expiry_ph")}
                  value={form.payment.expiry}
                  onChange={(v) => setPay({ expiry: v })}
                />
                <TextField
                  label={t("card_cvv")}
                  placeholder={t("card_cvv_ph")}
                  inputMode="numeric"
                  value={form.payment.cvv}
                  onChange={(v) => setPay({ cvv: v })}
                />
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2.5 border-t border-gray-200 pt-4 text-[14px] dark:border-gray-700">
            <FeeRow label={t("fee_issuance")} amount={FEE_ISSUANCE} />
            <FeeRow label={t("fee_service2")} amount={FEE_SERVICE} />
            <FeeRow label={t("fee_vat")} amount={FEE_VAT} />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
            <span className="text-[16px] font-bold text-gray-900 dark:text-white">
              {t("fee_total")}
            </span>
            <Money value={FEE_TOTAL} className="text-[18px] font-bold text-gray-900 dark:text-white" />
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-400">
            <Info className="h-3.5 w-3.5" />
            {t("fee_note")}
          </p>

          <button
            onClick={onPay}
            disabled={paying}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-sa-600 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {paying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                {t("pay")} <Money value={FEE_TOTAL} className="" />
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-gray-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t("secure_note")}
          </p>
        </Card>
      </div>
    </>
  );
}

/* ---------- Result: Success / Failure ---------- */
function ResultScreen({
  result,
  receipt,
  onRetry,
}: {
  result: Result;
  receipt: Receipt;
  onRetry: () => void;
}) {
  const { t } = useLocale();
  const navigate = useNavigate();
  const success = result === "success";
  const amount = `${FEE_TOTAL.toFixed(2)} ${t("currency")}`;

  return (
    <div className="container-dga animate-scale-in py-12">
      <Card className="mx-auto max-w-xl p-8 text-center">
        <div
          className={
            "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full " +
            (success ? "bg-success-bg text-success" : "bg-error-bg text-error")
          }
        >
          {success ? <CheckCircle2 className="h-9 w-9" /> : <XCircle className="h-9 w-9" />}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {success ? t("pay_success_title") : t("pay_fail_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
          {success ? t("pay_success_desc").replace("{amount}", amount) : t("pay_fail_desc")}
        </p>

        <div className="mx-auto mt-6 overflow-hidden rounded-xl border border-gray-200 text-start dark:border-gray-700">
          {success ? (
            <>
              <ResultRow icon={CreditCard} label={t("res_amount_paid")} value={amount} />
              <ResultRow icon={CreditCard} label={t("res_paid_with")} value={t("pay_mada_pay")} alt />
              <ResultRow icon={Calendar} label={t("res_payment_date")} value={receipt.date} />
              <ResultRow icon={FileText} label={t("res_request_no")} value={receipt.requestNo} alt />
              <ResultRow icon={Link} label={t("res_reference")} value={receipt.reference} />
            </>
          ) : (
            <>
              <ResultRow icon={CreditCard} label={t("res_amount")} value={amount} />
              <ResultRow
                icon={CreditCard}
                label={t("res_attempted_with")}
                value={t("pay_mada_pay")}
                alt
              />
              <ResultRow icon={FileText} label={t("res_request_no")} value={receipt.requestNo} />
              <ResultRow
                icon={AlertTriangle}
                label={t("res_status")}
                value={t("res_not_submitted")}
                alt
                danger
              />
            </>
          )}
        </div>

        {success && (
          <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
            <Truck className="h-4 w-4" />
            {t("res_est_delivery")}{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {t("res_est_delivery_val")}
            </span>
          </p>
        )}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {success ? (
            <>
              <button
                onClick={() => navigate(`/track?ref=${encodeURIComponent(receipt.reference)}`)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
              >
                <MapPin className="h-4 w-4" />
                {t("res_track")}
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <Download className="h-4 w-4" />
                {t("res_download")}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sa-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-sa-700"
              >
                <RefreshCw className="h-4 w-4" />
                {t("fail_try_again")}
              </button>
              <button
                onClick={() => navigate("/support")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <Headphones className="h-4 w-4" />
                {t("fail_contact_support")}
              </button>
            </>
          )}
        </div>

        {success ? (
          <button
            onClick={() => navigate("/services")}
            className="mx-auto mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-sa-600 hover:underline dark:text-sa-300"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("res_back_services")}
          </button>
        ) : (
          <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-1.5 text-[12px] text-gray-400">
            <Info className="h-3.5 w-3.5 shrink-0" />
            {t("fail_note")}
          </p>
        )}
      </Card>
    </div>
  );
}

/* ---------- Small building blocks ---------- */
function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors " +
        (selected ? "border-sa-600" : "border-gray-300 dark:border-gray-500")
      }
    >
      {selected && <span className="h-2.5 w-2.5 rounded-full bg-sa-600" />}
    </span>
  );
}

function MethodRow({
  selected,
  onSelect,
  label,
  brand,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  brand: ReactNode;
}) {
  return (
    <button type="button" onClick={onSelect} className="flex w-full items-center gap-3 py-3 text-start">
      <RadioDot selected={selected} />
      <span className="flex-1 text-[14px] font-medium text-gray-900 dark:text-white">{label}</span>
      {brand}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: IconType;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <span className="relative flex items-center">
        {Icon && (
          <Icon className="pointer-events-none absolute start-3 h-4 w-4 text-gray-400" />
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          className={
            "h-11 w-full rounded-md border border-gray-300 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-sa-500 focus:outline-none focus:ring-2 focus:ring-sa-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 " +
            (Icon ? "px-3.5 ps-9" : "px-3.5")
          }
        />
      </span>
    </label>
  );
}

function SvcRow({
  label,
  value,
  action,
  last,
}: {
  label: string;
  value: string;
  action?: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={"py-3 " + (last ? "" : "border-b border-gray-100 dark:border-gray-700/60")}>
      <div className="flex items-start justify-between gap-4 text-[14px]">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-end font-medium text-gray-900 dark:text-white" dir="auto">
          {value}
        </span>
      </div>
      {action}
    </div>
  );
}

function Money({ value, className }: { value: number; className?: string }) {
  const { t } = useLocale();
  return (
    <span className={"tabular-nums " + (className ?? "")}>
      {value.toFixed(2)} {t("currency")}
    </span>
  );
}

function FeeRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <Money value={amount} className="font-medium text-gray-900 dark:text-white" />
    </div>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
  alt,
  danger,
}: {
  icon: IconType;
  label: string;
  value: string;
  alt?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-between gap-4 px-5 py-3 text-[14px] " +
        (alt ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-transparent")
      }
    >
      <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span
        className={
          "font-semibold tabular-nums " +
          (danger ? "text-error-text" : "text-gray-900 dark:text-white")
        }
        dir="auto"
      >
        {value}
      </span>
    </div>
  );
}

/* ---------- Payment brand marks (approximations) ---------- */
function SadadMark() {
  return (
    <span className="text-[16px] font-bold" style={{ color: "#EA6A24" }} dir="rtl">
      سداد
    </span>
  );
}

function ApplePayMark() {
  return (
    <span className="inline-flex items-center gap-1 text-gray-900 dark:text-white">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      <span className="text-[15px] font-medium">Pay</span>
    </span>
  );
}

function MadaMark() {
  return (
    <span className="text-[16px] font-extrabold lowercase tracking-tight">
      <span style={{ color: "#159BD7" }}>ma</span>
      <span style={{ color: "#84BD00" }}>da</span>
    </span>
  );
}

/* ---------- Date/time formatting ---------- */
function to12(time: string, loc: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return new Intl.DateTimeFormat(loc, { hour: "numeric", minute: "2-digit", hour12: true }).format(
    d,
  );
}

function fmtApptShort(dateStr: string, time: string, loc: string) {
  const d = new Date(dateStr);
  const mon = new Intl.DateTimeFormat(loc, { month: "short" }).format(d);
  return `${d.getDate()} ${mon} ${d.getFullYear()} · ${to12(time, loc)}`;
}

function fmtApptLong(dateStr: string, time: string, loc: string) {
  const d = new Date(dateStr);
  const mon = new Intl.DateTimeFormat(loc, { month: "long" }).format(d);
  return `${d.getDate()} ${mon} ${d.getFullYear()} · ${to12(time, loc)}`;
}
