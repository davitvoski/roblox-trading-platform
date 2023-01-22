/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*"
  ],
  theme: {
    extend: {
      colors: {
        'action': "#D90368",
        'idk': "#541388",
        'background': "#2E294E",
      },
      backgroundImage: {
        'google-button': "url('https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png')",
      }
    },
  },
  plugins: [],
}
