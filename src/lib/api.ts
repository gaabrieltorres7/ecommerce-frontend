import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  // const { "ecommerce.token": token } = parseCookies();
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
