import { JobApplicationRequest } from "../types/job-application.types";
import { instance as axios } from "./axiosInstance";

const applyJob = (data: JobApplicationRequest) => axios.post("/jobs/applications", data);

const deleteApplication = (userId: string, jobId: string) =>
  axios.delete(`/jobs/applications/delete?userId=${userId}&jobId=${jobId}`);

const getApplicationByUser = (id: string) => axios.get(`/jobs/applicaitons/user/${id}`);

const getApplicationByJob = (id: string) => axios.get(`/jobs/applications/job/${id}`);

export { applyJob, getApplicationByUser, getApplicationByJob, deleteApplication };
