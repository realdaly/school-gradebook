/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "accent1": "#3D3A4B",
        "accent2": "#2e77ae",
        "accent3": "#0d2137",
        "accent4": "#d4ac66",
        "comp": "#D9D9D9",
        "domI": "#F3F3F3",
        "theme1": "#b0bf1a",
        "theme2": "#ffbf00",
        "theme3": "#318ce7",
        "theme4": "#79443b",
        "theme5": "#873260",
        "theme6": "#cb4154",
        "theme7": "#cc5500",
        "theme8": "#c95a49",
        "theme9": "#483d8b",
        "danger": "#DC3545",
        "success": "#4BB543"
      }
    },
  },
  plugins: [],
  safelist: [
    "text-accent1",
    "text-accent2",
    "text-accent3",
    "text-accent4",
    "bg-accent1",
    "bg-accent2",
    "bg-accent3",
    "bg-accent4",
    "text-theme1",
    "text-theme2",
    "text-theme3",
    "text-theme4",
    "text-theme5",
    "text-theme6",
    "text-theme7",
    "text-theme8",
    "text-theme9",
    "fill-theme1",
    "fill-theme2",
    "fill-theme3",
    "fill-theme4",
    "fill-theme5",
    "fill-theme6",
    "fill-theme7",
    "fill-theme8",
    "fill-theme9",
    "stroke-theme1",
    "stroke-theme2",
    "stroke-theme3",
    "stroke-theme4",
    "stroke-theme5",
    "stroke-theme6",
    "stroke-theme7",
    "stroke-theme8",
    "stroke-theme9",
    "bg-theme1",
    "bg-theme2",
    "bg-theme3",
    "bg-theme4",
    "bg-theme5",
    "bg-theme6",
    "bg-theme7",
    "bg-theme8",
    "bg-theme9",
  ]
}