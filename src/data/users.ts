import type { Locale } from "@/i18n/translations";

export interface Localized {
  en: string;
  ar: string;
}

export interface SampleUser {
  nationalId: string;
  name: Localized;
  firstName: Localized;
  dob: string;
  nationality: Localized;
  mobile: string;
  email: string;
  passportNo: string;
  passportExpiry: string; // dd / mm / yyyy
  passportExpiryLong: Localized;
  validityRemaining: Localized;
  renewSoon: boolean;
}

/**
 * Hardcoded demo accounts. Login validates the National ID against this list.
 * (Replace with a real Nafath / API integration in production.)
 */
export const sampleUsers: SampleUser[] = [
  {
    nationalId: "1012345678",
    name: { en: "Fatimah Abdullah Al-Otaibi", ar: "فاطمة عبدالله العتيبي" },
    firstName: { en: "Fatimah Al-Otaibi", ar: "فاطمة العتيبي" },
    dob: "04 / 08 / 1990",
    nationality: { en: "Saudi", ar: "سعودية" },
    mobile: "+966 55 123 4421",
    email: "fatimah@email.com",
    passportNo: "P1234821",
    passportExpiry: "12 / 03 / 2026",
    passportExpiryLong: { en: "12 March 2026", ar: "12 مارس 2026" },
    validityRemaining: {
      en: "8 months of validity remaining",
      ar: "متبقٍ 8 أشهر على الانتهاء",
    },
    renewSoon: true,
  },
  {
    nationalId: "1045678912",
    name: { en: "Mohammed Saud Al-Qahtani", ar: "محمد سعود القحطاني" },
    firstName: { en: "Mohammed Al-Qahtani", ar: "محمد القحطاني" },
    dob: "21 / 11 / 1985",
    nationality: { en: "Saudi", ar: "سعودية" },
    mobile: "+966 50 987 6612",
    email: "m.saud@email.com",
    passportNo: "P7788345",
    passportExpiry: "03 / 09 / 2027",
    passportExpiryLong: { en: "03 September 2027", ar: "03 سبتمبر 2027" },
    validityRemaining: {
      en: "14 months of validity remaining",
      ar: "متبقٍ 14 شهراً على الانتهاء",
    },
    renewSoon: false,
  },
];

export const DEMO_NATIONAL_ID = sampleUsers[0].nationalId;

export function findUserByNationalId(nationalId: string): SampleUser | undefined {
  return sampleUsers.find((u) => u.nationalId === nationalId.trim());
}

/** Pick a localized string for the active locale. */
export function loc(value: Localized, locale: Locale): string {
  return value[locale];
}
