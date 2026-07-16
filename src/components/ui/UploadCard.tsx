import { useRef, useState } from "react";
import { CheckCircle2, Trash2, UploadCloud } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { cn } from "@/lib/cn";

export function UploadCard({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value?: string;
  onChange: (fileName?: string) => void;
}) {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) onChange(files[0].name);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3">
        <p className="text-[15px] font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-success-border bg-success-bg px-3.5 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-[14px] font-medium text-success-text">{value}</p>
            <p className="text-[12px] text-success-text/80">{t("uploaded")}</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[13px] font-medium text-sa-700 hover:underline"
          >
            {t("replace")}
          </button>
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-error-text hover:opacity-80"
            aria-label={t("remove")}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors",
            dragging
              ? "border-sa-500 bg-brand-subtle/50"
              : "border-gray-300 bg-gray-50 hover:border-sa-400 dark:border-gray-600 dark:bg-gray-900/40",
          )}
        >
          <UploadCloud className="h-6 w-6 text-gray-400" />
          <span className="text-[13px] text-gray-500 dark:text-gray-400">
            {t("upload_cta")}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
