import { JobRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const addJob = (data: JobRequest) => axios.post("/jobs", data);

export { addJob };
