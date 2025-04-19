// src/services/auth.ts
import { api } from "@/lib/api";

type LoginData = {
  email: string;
  password: string;
};

export const authService = {
  async login(data: LoginData) {
    const response = await api.post("/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  },

  async logout() {
    await api.post("/logout");
    localStorage.removeItem("token");
  },

  async getCurrentUser() {
    const response = await api.get("/user");
    return response.data;
  },
};
