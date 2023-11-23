import { create } from "zustand";
import { UserLogin, UserPayload, UserRegister } from "../types";
import { login } from "../api/auth";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface AuthState {
  user: UserPayload;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any;
  login: (data: UserLogin) => void;
  register: (data: UserRegister) => void;
}

interface DecodedToken extends JwtPayload {
  user: UserPayload;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user:
    typeof window !== "undefined" &&
    JSON.parse(
      localStorage.getItem("user") ||
        JSON.stringify({
          id: "",
          email: "",
          fullName: "",
        })
    ),
  isLoggedIn:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? true
      : false,
  isLoading: false,
  error: null,
  login: async (data: UserLogin) => {
    set({ isLoading: true });
    try {
      const res = await login(data);
      const token = res.data;
      const decode = jwtDecode<DecodedToken>(token);
      set({ isLoggedIn: true });
      set({ user: decode.user });
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
