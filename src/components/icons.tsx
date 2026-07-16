/**
 * DGA (Digital Government Authority) icon set.
 *
 * Icons come from the official DGA "Platforms Code" icon library
 * (`@platformscode/icons`, National Design System, CC BY 4.0). The raw SVGs use
 * `fill="currentColor"` and a 0 0 24 24 viewBox, and are imported as React
 * components through `vite-plugin-svgr` (see vite.config.ts). Size them with
 * Tailwind `h-*`/`w-*` and color them with `text-*`.
 *
 * Names below mirror the previously-used lucide-react identifiers so the rest of
 * the app keeps a stable API; each maps to a specific DGA icon (stroke variant).
 */
import type { FunctionComponent, SVGProps } from "react";

import AlertTriangleIcon from "@platformscode/icons/dist/svg/alert-02-stroke.svg?react";
import ArrowLeftIcon from "@platformscode/icons/dist/svg/arrow-left-02-stroke.svg?react";
import ArrowRightIcon from "@platformscode/icons/dist/svg/arrow-right-02-stroke.svg?react";
import BookUserIcon from "@platformscode/icons/dist/svg/contact-book-stroke.svg?react";
import BriefcaseIcon from "@platformscode/icons/dist/svg/briefcase-01-stroke.svg?react";
import Building2Icon from "@platformscode/icons/dist/svg/building-02-stroke.svg?react";
import CalendarIcon from "@platformscode/icons/dist/svg/calendar-01-stroke.svg?react";
import CheckIcon from "@platformscode/icons/dist/svg/tick-02-stroke.svg?react";
import CheckCircle2Icon from "@platformscode/icons/dist/svg/checkmark-circle-01-stroke.svg?react";
import ChevronDownIcon from "@platformscode/icons/dist/svg/arrow-down-01-stroke.svg?react";
import ChevronLeftIcon from "@platformscode/icons/dist/svg/arrow-left-01-stroke.svg?react";
import ChevronRightIcon from "@platformscode/icons/dist/svg/arrow-right-01-stroke.svg?react";
import ClockIcon from "@platformscode/icons/dist/svg/clock-01-stroke.svg?react";
import ConstructionIcon from "@platformscode/icons/dist/svg/cone-01-stroke.svg?react";
import CopyIcon from "@platformscode/icons/dist/svg/copy-01-stroke.svg?react";
import CreditCardIcon from "@platformscode/icons/dist/svg/credit-card-stroke.svg?react";
import DownloadIcon from "@platformscode/icons/dist/svg/download-01-stroke.svg?react";
import EyeIcon from "@platformscode/icons/dist/svg/eye-stroke.svg?react";
import FileStackIcon from "@platformscode/icons/dist/svg/files-01-stroke.svg?react";
import FileTextIcon from "@platformscode/icons/dist/svg/file-01-stroke.svg?react";
import FlagIcon from "@platformscode/icons/dist/svg/flag-01-stroke.svg?react";
import GlobeIcon from "@platformscode/icons/dist/svg/globe-stroke.svg?react";
import HeadphonesIcon from "@platformscode/icons/dist/svg/customer-support-stroke.svg?react";
import HomeIcon from "@platformscode/icons/dist/svg/home-01-stroke.svg?react";
import InfoIcon from "@platformscode/icons/dist/svg/information-circle-stroke.svg?react";
import LinkIcon from "@platformscode/icons/dist/svg/link-01-stroke.svg?react";
import LoaderIcon from "@platformscode/icons/dist/svg/loading-01-stroke.svg?react";
import LockIcon from "@platformscode/icons/dist/svg/square-lock-01-stroke.svg?react";
import LogInIcon from "@platformscode/icons/dist/svg/login-01-stroke.svg?react";
import LogOutIcon from "@platformscode/icons/dist/svg/logout-01-stroke.svg?react";
import MailIcon from "@platformscode/icons/dist/svg/mail-01-stroke.svg?react";
import MapPinIcon from "@platformscode/icons/dist/svg/location-01-stroke.svg?react";
import MenuIcon from "@platformscode/icons/dist/svg/menu-01-stroke.svg?react";
import MoonIcon from "@platformscode/icons/dist/svg/moon-01-stroke.svg?react";
import PackageCheckIcon from "@platformscode/icons/dist/svg/package-02-stroke.svg?react";
import PencilIcon from "@platformscode/icons/dist/svg/pencil-edit-01-stroke.svg?react";
import PhoneIcon from "@platformscode/icons/dist/svg/telephone-stroke.svg?react";
import PlusIcon from "@platformscode/icons/dist/svg/add-01-stroke.svg?react";
import RefreshCwIcon from "@platformscode/icons/dist/svg/refresh-stroke.svg?react";
import SearchIcon from "@platformscode/icons/dist/svg/search-01-stroke.svg?react";
import SendIcon from "@platformscode/icons/dist/svg/sent-02-stroke.svg?react";
import ShieldCheckIcon from "@platformscode/icons/dist/svg/shield-01-stroke.svg?react";
import SmartphoneIcon from "@platformscode/icons/dist/svg/smart-phone-01-stroke.svg?react";
import SunIcon from "@platformscode/icons/dist/svg/sun-01-stroke.svg?react";
import Trash2Icon from "@platformscode/icons/dist/svg/delete-02-stroke.svg?react";
import TruckIcon from "@platformscode/icons/dist/svg/truck-delivery-stroke.svg?react";
import UploadCloudIcon from "@platformscode/icons/dist/svg/cloud-upload-stroke.svg?react";
import UserIcon from "@platformscode/icons/dist/svg/profile-stroke.svg?react";
import UserRoundIcon from "@platformscode/icons/dist/svg/profile-02-stroke.svg?react";
import WalletIcon from "@platformscode/icons/dist/svg/cash-01-stroke.svg?react";
import XIcon from "@platformscode/icons/dist/svg/cancel-01-stroke.svg?react";
import XCircleIcon from "@platformscode/icons/dist/svg/multiplication-sign-circle-stroke.svg?react";

export type IconType = FunctionComponent<SVGProps<SVGSVGElement>>;

export const AlertTriangle: IconType = AlertTriangleIcon;
export const ArrowLeft: IconType = ArrowLeftIcon;
export const ArrowRight: IconType = ArrowRightIcon;
export const BookUser: IconType = BookUserIcon;
export const Briefcase: IconType = BriefcaseIcon;
export const Building2: IconType = Building2Icon;
export const Calendar: IconType = CalendarIcon;
export const Check: IconType = CheckIcon;
export const CheckCircle2: IconType = CheckCircle2Icon;
export const ChevronDown: IconType = ChevronDownIcon;
export const ChevronLeft: IconType = ChevronLeftIcon;
export const ChevronRight: IconType = ChevronRightIcon;
export const Clock: IconType = ClockIcon;
export const Construction: IconType = ConstructionIcon;
export const Copy: IconType = CopyIcon;
export const CreditCard: IconType = CreditCardIcon;
export const Download: IconType = DownloadIcon;
export const Eye: IconType = EyeIcon;
export const FileStack: IconType = FileStackIcon;
export const FileText: IconType = FileTextIcon;
export const Flag: IconType = FlagIcon;
export const Globe: IconType = GlobeIcon;
export const Headphones: IconType = HeadphonesIcon;
export const Home: IconType = HomeIcon;
export const Info: IconType = InfoIcon;
export const Link: IconType = LinkIcon;
export const Loader: IconType = LoaderIcon;
export const Lock: IconType = LockIcon;
export const LogIn: IconType = LogInIcon;
export const LogOut: IconType = LogOutIcon;
export const Mail: IconType = MailIcon;
export const MapPin: IconType = MapPinIcon;
export const Menu: IconType = MenuIcon;
export const Moon: IconType = MoonIcon;
export const PackageCheck: IconType = PackageCheckIcon;
export const Pencil: IconType = PencilIcon;
export const Phone: IconType = PhoneIcon;
export const Plus: IconType = PlusIcon;
export const RefreshCw: IconType = RefreshCwIcon;
export const Search: IconType = SearchIcon;
export const Send: IconType = SendIcon;
export const ShieldCheck: IconType = ShieldCheckIcon;
export const Smartphone: IconType = SmartphoneIcon;
export const Sun: IconType = SunIcon;
export const Trash2: IconType = Trash2Icon;
export const Truck: IconType = TruckIcon;
export const UploadCloud: IconType = UploadCloudIcon;
export const User: IconType = UserIcon;
export const UserRound: IconType = UserRoundIcon;
export const Wallet: IconType = WalletIcon;
export const X: IconType = XIcon;
export const XCircle: IconType = XCircleIcon;
export const ZoomIn: IconType = SearchIcon;
