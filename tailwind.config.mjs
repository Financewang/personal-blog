/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      sm: "640px", // 针对小屏幕设备
      md: "768px", // 针对平板设备
      lg: "1024px", // 针对大屏幕设备
      xl: "1280px", // 更大屏幕设备
      "2xl": "1536px", // 超大屏幕设备
    },
  },
  plugins: [],
};
