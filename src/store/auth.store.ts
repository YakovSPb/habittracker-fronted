import { create } from "zustand";
import { api } from "../services/api";
import { getToken, removeToken, setToken } from "../utils/token";

interface AuthResponse {
  success: boolean;
  message?: string;
}

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;

  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, full_name: string) =>
    Promise<AuthResponse>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getToken(),
  user: null,
  loading: false,

  // Инициализация при старте
  init: async () => {
    const token = getToken();
    if (!token) return;

    try {
      set({ loading: true });

      const { data } = await api.get("/auth/me");

      set({
        token,
        user: data,
      });
    } catch {
      console.warn("Token expired → logout");
      get().logout();
    } finally {
      set({ loading: false });
    }
  },

  // Логин
  login: async (email, password) => {
    set({ loading: true });

    try {
      const { data } = await api.post("/auth/login", { email, password });

      setToken(data.access_token);

      set({
        token: data.access_token,
        user: data.user ?? null,
      });

      return { success: true };
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Ошибка входа. Проверьте данные.";

      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // Регистрация
  register: async (email, password, full_name) => {
    set({ loading: true });

    try {
      const { data } = await api.post("/auth/register", {
        email,
        password,
        full_name,
      });

      setToken(data.access_token);

      set({
        token: data.access_token,
        user: data.user ?? null,
      });

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.response?.data?.detail || "Ошибка регистрации",
      };
    } finally {
      set({ loading: false });
    }
  },

  // Выход
  logout: () => {
    removeToken();

    set({
      token: null,
      user: null,
    });
  },
}));
