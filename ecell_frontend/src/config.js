const apiBaseUrl = import.meta.env.VITE_BACKEND_API;

const config = {
  Backend_Api: apiBaseUrl,
  GoogleLoginUrl: import.meta.env.VITE_GOOGLE_LOGIN_URL,
  GoogleFavicon: "https://www.google.com/favicon.ico"
};

export default config;