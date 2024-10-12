/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f9fafb",
          text: "#1f2937",
          primary: "#3b82f6",
          secondary: "#9333ea",
          accent: "#f59e0b",
          danger:"#ff0000",
          muted: "#6b7280",
        },
        dark: {
          background: "#1e293b",
          text: "#f1f5f9",
          primary: "#60a5fa",
          secondary: "#c084fc",
          accent: "#fbbf24",
          danger:"#ff0000",
          muted: "#9ca3af",
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
