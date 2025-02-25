import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#616EF5",
        secondaryColor: "#8590FF",
        dangerColor: "#FF4949",
        successColor: "#4455FF",
        backgroundPrimaryColor: "#FFFFFF",
        backgroundSecondaryColor: "#DBDBDB",
        primaryTextColor: "#303030",
        secondaryTextColor: "#F1F0F2",
        tertiaryTextColor: "#A0A0A0",
      },
    },
  },
  plugins: [],
} satisfies Config;
