import axios from "axios";

const API_URL = "http://localhost:5000/api"; // đổi lại nếu backend chạy port khác

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
});

// Gắn token tự động từ localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
