import { CompanyRequest } from "../types/company.types";
import { instance as axios } from "./axiosInstance";

const addCompany = (data: CompanyRequest) => axios.post("/company", data);

const updateWorkers = (companyId: string, data: string[]) =>
  axios.put(`/company/${companyId}`, data);

export { addCompany, updateWorkers };
