import axios from "axios";
const baseURL = "https://hire-offset-trout-techno.trycloudflare.com";
export const backend_url = axios.create({ baseURL });
backend_url.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
