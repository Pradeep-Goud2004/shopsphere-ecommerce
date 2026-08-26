import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://shopsphere-ecommerce-production.up.railway.app/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Do not force logout for every public request; protected pages can redirect.
      console.warn("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default api;
