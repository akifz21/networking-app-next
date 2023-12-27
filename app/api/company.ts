import { CompanyRequest } from "../types/company.types";
import { instance as axios } from "./axiosInstance";

const addCompany = (data: CompanyRequest) => axios.post("/companies", data);

const updateWorkers = (companyId: string, data: string[]) =>
  axios.put(`/companies/${companyId}`, data);

export { addCompany, updateWorkers };
