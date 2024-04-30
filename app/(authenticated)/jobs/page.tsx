"use client";
import useSWR from "swr";
import JobCard from "./components/job-card";
import { Job } from "@/app/types";
import { fetcher } from "@/app/api/axiosInstance";
import { useState } from "react";
import JobDetails from "./components/job-details";
import { Loader2 } from "lucide-react";

export default function Jobs() {
  const { data, isLoading, error } = useSWR<Job[]>("/jobs", fetcher);
  const [jobDetail, setJobDetails] = useState<Job>({
    companyId: "",
    description: "",
    id: "",
    title: "",
    companyName: "",
    endDate: "",
  });

  if (isLoading) {
    return (
      <center className="mt-20">
        <Loader2 size={60} strokeWidth={3} className="animate-spin  " />
      </center>
    );
  }

  if (error) {
    return <>{error?.message}</>;
  }

  return (
    <div className="flex flex-row h-screen max-h-screen gap-4 w-full justify-between pt-24 px-24">
      <div className="flex-1 flex flex-col gap-2 overflow-y-scroll">
        <h1 className="self-center text-4xl font-bold">İş ilanları</h1>
        {data?.map((job) => <JobCard setJobDetails={setJobDetails} job={job} key={job.id} />)}
      </div>
      <div className="flex-1 border-l-2 pl-4  h-full">
        <div className="flex flex-col gap-2">{jobDetail.description !== "" && <JobDetails job={jobDetail} />}</div>
      </div>
    </div>
  );
}
