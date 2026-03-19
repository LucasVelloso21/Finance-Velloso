/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0f",
          card: "#12121a",
          "card-hover": "#1a1a25",
          sidebar: "#0e0e15",
          input: "#16161f",
        },
        border: {
          DEFAULT: "#1e1e2a",
          light: "#2a2a38",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#7577f5",
        },
        success: "#00d68f",
        danger: "#ff4d6a",
        warning: "#f59e0b",
        info: "#22d3ee",
        purple: "#a855f7",
      },
      fontFamily: {
        sans: ["DM Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
    },
  },
  plugins: [],
};
