import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: 'https://king-prawn-app-5jxjz.ondigitalocean.app',
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
},
  (error) => Promise.reject(error),
);

export default api;