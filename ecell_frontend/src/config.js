const apiBaseUrl = import.meta.env.VITE_BACKEND_API;

const config = {
  Backend_Api: apiBaseUrl.endsWith("/") ? apiBaseUrl : apiBaseUrl + "/",
};

export default config;