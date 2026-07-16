# Saudi Passport Portal

A passport services web portal built to the **DGA (Digital Government Authority) National Design System** standards — Saudi Green identity, IBM Plex Sans Arabic typography, RTL-first, light/dark themes, and full Arabic/English support.

Screens are reproduced from the *Passport Portal — Low-Fi Wireframes* (Login · Dashboard · Renew Passport → Verify).

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (dev/build)
- **Tailwind CSS 3** with DGA design tokens (colors, typography, radius, shadows)
- **React Router 6** (routing)
- **Official DGA icons** — [`@platformscode/icons`](https://www.npmjs.com/package/@platformscode/icons) (National Design System "Platforms Code" set, CC BY 4.0), imported as React components via `vite-plugin-svgr` and re-exported from `src/components/icons.tsx`
- **IBM Plex Sans Arabic** — self-hosted TTFs in `public/fonts` (weights 100–700), declared via `@font-face` in `src/index.css`

## Getting started

```bash
npm install
npm run dev      # start dev server → http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Design system

DGA tokens live in `tailwind.config.js`:

- **Brand (Saudi Green):** `#1B8354` (`sa-600`), hover `#166A45`, active `#14573A`
- **Text:** `#111927` / `#384250` / `#6C737F`
- **Feedback:** success / warning / error / info scales
- **Typography:** `IBM Plex Sans Arabic`, weights 400/500/600/700

## Localization & theming

- `src/i18n/` — Arabic/English dictionary + `LocaleContext` (sets `dir`/`lang`, persists choice). Default is English/LTR to mirror the wireframes; toggle to Arabic/RTL from the header.
- `src/theme/` — `ThemeContext` for light/dark mode (persisted, respects system preference).

## Structure

```
src/
  components/
    layout/     Header, Footer, Layout
    ui/         Button, Card, Input, Badge, Breadcrumb, Stepper, Checkbox, Alert, ReadonlyField
    Logo.tsx    Saudi emblem + wordmark
  data/         services.ts (quick services)
  i18n/         translations.ts, LocaleContext.tsx
  theme/        ThemeContext.tsx
  pages/        Dashboard, Login, Services, RenewPassport, Placeholder, NotFound
  App.tsx       routes
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Dashboard (Welcome / passport status / quick services / recent activity) |
| `/login` | Login with Nafath |
| `/services` | Services listing |
| `/services/renew` | Renew Passport → Verify step (multi-step) |
| `/track`, `/applications`, `/support`, `/about`, … | Placeholder sections |

> Note: sample user data (name, masked contact/passport values) is placeholder content matching the wireframes; wire it to real APIs/Nafath as needed.
