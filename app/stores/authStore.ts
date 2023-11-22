import { create } from "zustand";
import { UserLogin, UserPayload, UserRegister } from "../types";
import { login } from "../api/auth";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  user: UserPayload;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any;
  login: (data: UserLogin) => void;
  register: (data: UserRegister) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: { id: "", email: "", fullName: "" },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  login: async (data: UserLogin) => {
    set({ isLoading: true });
    try {
      const res = await login(data);
      const token = res.data;
      const user: UserPayload = jwtDecode(token);
      set({ isLoggedIn: true });
      set({ user: user });
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(get().user));
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (data: UserRegister) => {},
}));
