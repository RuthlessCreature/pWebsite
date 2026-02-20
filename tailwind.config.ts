import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4f9",
          100: "#dce7f2",
          200: "#b5cce1",
          300: "#88accb",
          400: "#5f8cb6",
          500: "#3e6f99",
          600: "#2d557a",
          700: "#1f3d5a",
          800: "#192f45",
          900: "#132334"
        }
      },
      maxWidth: {
        site: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
