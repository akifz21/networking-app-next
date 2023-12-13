import { CompanyRequest } from "../types/company.types";
import { instance as axios } from "./axiosInstance";

const addCompany = (data: CompanyRequest) => axios.post("/companies", data);

export { addCompany };
