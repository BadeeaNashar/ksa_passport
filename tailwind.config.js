/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // DGA National Design System — Saudi Green brand scale
        sa: {
          25: "#F7FDF9",
          50: "#F3FCF6",
          100: "#DFF6E7",
          200: "#B8EACB",
          300: "#88D8AD",
          400: "#54C08A",
          500: "#25935F",
          600: "#1B8354",
          700: "#166A45",
          800: "#14573A",
          900: "#104631",
          950: "#092A1E",
        },
        // Neutral / gray scale
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D2D6DB",
          400: "#9DA4AE",
          500: "#6C737F",
          600: "#4D5761",
          700: "#384250",
          800: "#1F2A37",
          900: "#111927",
        },
        // Semantic brand
        brand: {
          DEFAULT: "#1B8354",
          hover: "#166A45",
          active: "#14573A",
          subtle: "#DFF6E7",
        },
        secondary: {
          DEFAULT: "#F5BD02",
          hover: "#DBA102",
        },
        // Feedback
        success: {
          DEFAULT: "#17B26A",
          bg: "#ECFDF3",
          border: "#ABEFC6",
          text: "#067647",
        },
        warning: {
          DEFAULT: "#F79009",
          bg: "#FFFAEB",
          border: "#FEDF89",
          text: "#B54708",
        },
        error: {
          DEFAULT: "#F04438",
          bg: "#FEF3F2",
          border: "#FECDCA",
          text: "#B42318",
        },
        info: {
          DEFAULT: "#2E90FA",
          bg: "#EFF8FF",
          border: "#B2DDFF",
          text: "#175CD3",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"Noto Sans Arabic"', "sans-serif"],
        en: ['"IBM Plex Sans"', '"Inter"', "sans-serif"],
        mono: ['"IBM Plex Mono"', '"Fira Code"', "monospace"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
        sm: "0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)",
        md: "0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)",
        xl: "0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-slow": "fade-in-slow 0.8s ease-out both",
        "scale-in": "scale-in 0.35s ease-out both",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("rtl", ':is([dir="rtl"] &)');
      addVariant("ltr", ':is([dir="ltr"] &)');
    },
  ],
};
