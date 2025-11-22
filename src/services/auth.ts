import { api } from "./api";

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { access_token, token_type }
};
