/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'xs':"420px"
      },
      colors: {
        "primary":"#2874f0",
        "prm-dark":"#2a55e5",
        "black-prm": "#212121",
        "white-prm": "#FAF9F6",
      },
      animation: {
        slideup: "slideup 270ms ease-in-out",
        slidedown: "slidedown 270ms ease-in-out",
        slideleft: "slideleft 100ms ease-in-out",
        slideright: "slideright 100ms ease-in-out",
        wave: "wave 0.3s linear ",
        slowfade: "slowfade 0.4s ease-in-out",
        slideOpen:" slideOpen 1s ease-in-out "
      },
      fontFamily: {
        neon: "Montserrat, sans-serif",
        roboto: "Roboto , sans-serif",
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: "translateY(25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slidedown: {
          from: { opacity: 0, transform: "translateY(-25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slideleft: {
          from: { opacity: 0, transform: "translateX(-20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideright: {
          from: { opacity: 0, transform: "translateX(20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        slideOpen:{
          "0%":{height:"0%"},
          "100%":{height:"100%"}
        }
      },
    },
  },
  plugins: [],
};
