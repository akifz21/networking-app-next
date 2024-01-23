import { EmployeeRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const addEmployee = (data: EmployeeRequest) => axios.post("/company/employees", data);

export { addEmployee };
