import { UserLogin, UserRegister } from "../types";
import { instance as axios } from "./axiosInstance";

const login = (data: UserLogin) => axios.post("/users/login", data);
const register = (data: UserRegister) => axios.post("/users/register", data);

export { login, register };
