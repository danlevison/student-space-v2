/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"]
      },
      colors: {
          primaryTextClr: "#fff", 
          secondaryTextClr: "#333",
          tertiaryTextClr: "#8f9093",
          buttonClr: "#5065A8",
          iconClr: "#5065A8",
          inputOutlineClr: "#000", 
          modalBgClr: "rgb(219, 234, 254)",
          modalBackdropClr: "rgba(50, 65, 108, 0.9)"
      },  
    },
  },
  plugins: [],
}
