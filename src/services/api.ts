import axios from "axios";
import { getToken } from "../utils/token";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
});

// автоматическое добавление токена в заголовки
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
