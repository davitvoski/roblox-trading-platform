/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        action: "#D90368",
        purple: "#541388",
        background: "#2E294E",
        error: "#fa0532",
        success: "#2FF923",
      },
      backgroundImage: {
        "google-button":
          "url('https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png')",
      },
    },
  },
  plugins: [],
};
