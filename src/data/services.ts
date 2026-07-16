import {
  FileText,
  RefreshCw,
  AlertTriangle,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  to: string;
}

/** "What do you need?" quick services — mirrors the dashboard wireframe. */
export const services: ServiceItem[] = [
  {
    id: "new",
    icon: FileText,
    titleKey: "new_passport",
    descKey: "new_passport_desc",
    to: "/services/issue",
  },
  {
    id: "renew",
    icon: RefreshCw,
    titleKey: "renew_passport",
    descKey: "renew_passport_desc",
    to: "/services/renew",
  },
  {
    id: "lost",
    icon: AlertTriangle,
    titleKey: "report_lost",
    descKey: "report_lost_desc",
    to: "/services/lost",
  },
  {
    id: "track",
    icon: MapPin,
    titleKey: "track_status_title",
    descKey: "track_status_desc",
    to: "/track",
  },
];
