import type { Locale, TranslationKey } from "@/i18n/translations";

export type RequestType = "renew" | "new" | "lost" | "address";

export type RequestStatus =
  | "submitted"
  | "under_review"
  | "processing"
  | "ready"
  | "completed"
  | "rejected";

export interface PassportRequest {
  id: string; // reference number, e.g. RNW-2026100233
  owner: string; // national ID of the requester
  type: RequestType;
  titleKey: TranslationKey;
  status: RequestStatus;
  submittedAt: string; // ISO date
  fee: number;
  delivery?: string; // localized-ish label captured at submit time
}

export const TYPE_TITLE: Record<RequestType, TranslationKey> = {
  renew: "renew_passport",
  new: "new_passport",
  lost: "report_lost",
  address: "act_address",
};

/** Order used for the status timeline (rejected is handled separately). */
export const STATUS_ORDER: RequestStatus[] = [
  "submitted",
  "under_review",
  "processing",
  "ready",
  "completed",
];

export const STATUS_LABEL: Record<RequestStatus, TranslationKey> = {
  submitted: "status_submitted",
  under_review: "status_under_review",
  processing: "status_processing",
  ready: "status_ready",
  completed: "status_completed",
  rejected: "status_rejected",
};

/** Seeded dummy requests so every tab has data out of the box. */
export const seedRequests: PassportRequest[] = [
  {
    id: "RNW-2026100233",
    owner: "1012345678",
    type: "renew",
    titleKey: "renew_passport",
    status: "under_review",
    submittedAt: "2026-07-08",
    fee: 300,
    delivery: "delivery_home",
  },
  {
    id: "ADR-2026044120",
    owner: "1012345678",
    type: "address",
    titleKey: "act_address",
    status: "completed",
    submittedAt: "2026-06-21",
    fee: 0,
  },
  {
    id: "NEW-2025098340",
    owner: "1012345678",
    type: "new",
    titleKey: "new_passport",
    status: "completed",
    submittedAt: "2025-02-12",
    fee: 300,
    delivery: "delivery_pickup",
  },
  {
    id: "LST-2026072210",
    owner: "1045678912",
    type: "lost",
    titleKey: "report_lost",
    status: "processing",
    submittedAt: "2026-07-11",
    fee: 500,
    delivery: "delivery_pickup",
  },
];

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    calendar: "gregory",
  }).format(date);
}
