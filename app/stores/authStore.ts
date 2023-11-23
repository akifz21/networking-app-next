import { create } from "zustand";
import { UserPayload } from "../types";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface AuthState {
  user: UserPayload;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
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
  login: async (token: string) => {
    const decode = jwtDecode<DecodedToken>(token);
    set({ isLoggedIn: true });
    set({ user: decode.user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(get().user));
  },
  logout: () => {
    set({ isLoggedIn: false });
    set({
      user: {
        id: "",
        email: "",
        fullName: "",
      },
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));
