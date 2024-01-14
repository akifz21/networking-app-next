export type JobApplicationRequest = {
  userId: string;
  jobId: string;
};

export type JobApplication = JobApplicationRequest & {
  id: string;
  createdDate: string;
  jobName: string;
  userFirstName: string;
  userLastName: string;
};
