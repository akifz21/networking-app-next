export type JobRequest = {
  title: string;
  description: string;
  companyId: string;
};

export type Job = JobRequest & {
  id: string;
};
