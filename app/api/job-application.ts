import { JobApplicationRequest } from "../types/job-application.types";
import { instance as axios } from "./axiosInstance";

const applyJob = (data: JobApplicationRequest) => axios.post("/jobs/applications", data);

const deleteApplication = (id: string) => axios.delete(`/jobs/${id}`);

const getApplicationByUser = (id: string) => axios.get(`/jobs/applicaitons/user/${id}`);

const getApplicationByJob = (id: string) => axios.get(`/jobs/applications/job/${id}`);

export { applyJob, getApplicationByUser, getApplicationByJob, deleteApplication };
