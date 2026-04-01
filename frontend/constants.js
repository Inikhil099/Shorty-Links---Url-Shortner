import axios from "axios";
// export const backend_url = "http://3.111.197.208:3002"
const baseURL = "http://3.111.197.208:3002";
export const backend_url = axios.create({ baseURL });
backend_url.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
