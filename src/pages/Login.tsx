import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Headphones,
  Info,
  User,
} from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useAuth } from "@/auth/AuthContext";

export default function Login() {
  const { t, dir, toggleLocale } = useLocale();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [nid, setNid] = useState("");
  const [error, setError] = useState<string | null>(null);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(nid);
    if (ok) {
      navigate("/", { replace: true });
    } else {
      setError(t("login_error"));
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-105px)] items-start justify-center bg-gray-50 px-4 py-16 dark:bg-gray-900">
      <div className="w-full max-w-[460px] animate-scale-in rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-10">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle text-sa-600 dark:bg-sa-600/20 dark:text-sa-300">
          <User className="h-7 w-7" />
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("login_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-[340px] text-center text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
          {t("login_subtitle")}
        </p>

        <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="nid"
              className="text-[13px] font-medium text-gray-700 dark:text-gray-200"
            >
              {t("login_nid_label")}
            </label>
            <div
              className={`flex h-11 items-center gap-2.5 rounded-md border bg-white px-3.5 focus-within:ring-2 dark:bg-gray-900 ${
                error
                  ? "border-error focus-within:border-error focus-within:ring-error/30"
                  : "border-gray-300 focus-within:border-sa-500 focus-within:ring-sa-500/30 dark:border-gray-600"
              }`}
            >
              <User className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                id="nid"
                inputMode="numeric"
                value={nid}
                onChange={(e) => {
                  setNid(e.target.value.replace(/[^\d]/g, ""));
                  if (error) setError(null);
                }}
                placeholder={t("login_nid_ph")}
                className="h-full flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
              />
            </div>
            {error && <p className="text-[12px] text-error-text">{error}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-sa-600 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-sa-700 active:bg-sa-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-500 focus-visible:ring-offset-2"
          >
            {t("login_with_nafath")}
            <Arrow className="h-4 w-4" />
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[12px] text-gray-400 dark:text-gray-500">
            <Info className="h-3.5 w-3.5" />
            {t("login_nafath_note")}
          </p>

          <p className="rounded-md bg-brand-subtle/60 px-3 py-2 text-center text-[12px] font-medium text-sa-700 dark:bg-sa-600/10 dark:text-sa-300">
            {t("login_demo_hint")}
          </p>
        </form>

        <div className="my-6 h-px w-full bg-gray-100 dark:bg-gray-700" />

        <div className="flex items-center justify-center gap-6 text-[13px] font-medium text-sa-600 dark:text-sa-300">
          <button
            onClick={() => navigate("/help")}
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <Headphones className="h-4 w-4" />
            {t("need_help")}
          </button>
          <button
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <Globe className="h-4 w-4" />
            {t("lang_toggle")}
          </button>
        </div>
      </div>
    </div>
  );
}
