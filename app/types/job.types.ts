export type JobRequest = {
  title: string;
  description: string;
  companyId: string;
  endDate: string;
};

export type Job = JobRequest & {
  id: string;
  companyName: string;
};
