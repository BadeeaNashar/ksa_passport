import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Globe, LogIn, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { useTheme } from "@/theme/ThemeContext";
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
  const { t, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.to, item.end);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors",
                    active
                      ? "bg-sa-600 text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                  )}
                >
                  {t(item.key)}
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </NavLink>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
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

            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3.5 py-2 text-[14px] font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              <LogIn className="h-4 w-4" />
              {t("login")}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 lg:hidden"
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
            <nav className="container-dga flex flex-col py-3">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.to, item.end);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
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
