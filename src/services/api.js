import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.SERVICE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('auth-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
);

export default api;