/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',   // 小型设备
        'md': '768px',   // 中型设备（平板）
        'lg': '1024px',  // 大型设备（笔记本）
        'xl': '1280px',  // 特大设备（台式机）
        '2xl': '1536px', // 超大设备
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // 添加排版插件支持
  ],
};