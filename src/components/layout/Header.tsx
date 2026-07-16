import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Globe,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "@/components/icons";
import { useLocale } from "@/i18n/LocaleContext";
import { useTheme } from "@/theme/ThemeContext";
import { useAuth } from "@/auth/AuthContext";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

const navItems = [
  { to: "/", key: "nav_home" as const, end: true },
  { to: "/services", key: "nav_services" as const },
  { to: "/applications", key: "nav_apps" as const },
  { to: "/track", key: "nav_track" as const },
  { to: "/support", key: "nav_support" as const },
];

function isActivePath(pathname: string, to: string, end?: boolean) {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
}

export function Header() {
  const { t, locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile menu on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setOpen(false);
  }, [pathname]);

  const initials = user
    ? user.firstName.en
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Government utility top bar */}
      <div className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <div className="container-dga flex h-9 items-center gap-2 text-[13px]">
          <span
            className="inline-flex h-4 w-6 items-center justify-center rounded-[2px] bg-sa-600 text-[8px] font-bold text-white"
            aria-hidden
          >
            SA
          </span>
          <span>{t("topbar_gov")}</span>
          <button className="inline-flex items-center gap-0.5 font-medium text-sa-600 hover:underline dark:text-sa-400">
            {t("topbar_how")}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="container-dga flex h-[68px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav — only when signed in */}
          {isAuthenticated && (
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.to, item.end);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative inline-flex items-center gap-1 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors",
                      active
                        ? "bg-sa-600 text-white shadow-xs"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown className={cn("h-4 w-4", active ? "opacity-90" : "opacity-70")} />
                    {active && (
                      <span className="absolute bottom-1.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-[#6FC49B]" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">
                {theme === "dark" ? t("theme_light") : t("theme_dark")}
              </span>
            </button>

            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t("lang_toggle")}</span>
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 py-1 pe-3 ps-1 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sa-600 text-[13px] font-bold text-white">
                    {initials}
                  </span>
                  <span className="hidden max-w-[140px] truncate text-[14px] font-medium text-gray-800 dark:text-gray-100 sm:inline">
                    {user.firstName[locale]}
                  </span>
                  <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:inline" />
                </button>

                {menuOpen && (
                  <div className="absolute end-0 mt-2 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3 border-b border-gray-100 p-4 dark:border-gray-700">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sa-600 text-[14px] font-bold text-white">
                        {initials}
                      </span>
                      <div className="overflow-hidden">
                        <p className="truncate text-[14px] font-semibold text-gray-900 dark:text-white">
                          {user.name[locale]}
                        </p>
                        <p className="truncate text-[12px] text-gray-500 dark:text-gray-400" dir="ltr">
                          {user.nationalId}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/applications");
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-3 text-start text-[14px] text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <UserRound className="h-4 w-4" />
                      {t("account")}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 border-t border-gray-100 px-4 py-3 text-start text-[14px] font-medium text-error-text transition-colors hover:bg-error-bg dark:border-gray-700"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3.5 py-2 text-[14px] font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <LogIn className="h-4 w-4" />
                {t("login")}
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 lg:hidden"
                aria-label="menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {open && isAuthenticated && (
          <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
            <nav className="container-dga flex flex-col py-3">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.to, item.end);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "rounded-md px-3 py-3 text-[15px] font-medium",
                      active
                        ? "bg-sa-600 text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                    )}
                  >
                    {t(item.key)}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
