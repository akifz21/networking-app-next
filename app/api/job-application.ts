import { JobApplicationRequest } from "../types/job-application.types";
import { instance as axios } from "./axiosInstance";

const applyJob = (data: JobApplicationRequest) => axios.post("/jobs/applications", data);

const deleteApplication = (userId: string, jobId: string) =>
  axios.delete(`/jobs/applications/delete?userId=${userId}&jobId=${jobId}`);

const getApplicationByUser = (id: string) => axios.get(`/jobs/applicaitons/user/${id}`);

const getApplicationByJob = (id: string) => axios.get(`/jobs/applications/job/${id}`);

const checkIfApplied = (userId: string, jobId: string) =>
  axios.get(`/jobs/applications/check?userId=${userId}&jobId=&${jobId}}`);

export { applyJob, getApplicationByUser, getApplicationByJob, deleteApplication, checkIfApplied };
