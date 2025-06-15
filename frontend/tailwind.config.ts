import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        primaryHover: "#1d4ed8",
        secondary: "#f3f4f6",
        accent: "#10b981",
        text: "#1f2937",
        border: "#e5e7eb",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
