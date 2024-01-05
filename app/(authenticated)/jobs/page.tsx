"use client";
import useSWR from "swr";
import JobCard from "./components/job-card";
import { Job } from "@/app/types";
import { fetcher } from "@/app/api/axiosInstance";
import { useState } from "react";
import JobDetails from "./components/job-details";

export default function Jobs() {
  const { data, isLoading, error } = useSWR<Job[]>("/jobs", fetcher);
  const [jobDetail, setJobDetails] = useState<Job>({
    companyId: "",
    description: "",
    id: "",
    title: "",
    companyName: "",
  });

  return (
    <div className="flex flex-row min-h-screen gap-4 w-full justify-betweenş pt-24 px-24">
      <div className="flex-1">
        {data?.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
      <div className="flex-1 border-l-2 pl-4  h-full">
        <div className="flex flex-col gap-2">
          <JobDetails job={jobDetail} />
        </div>
      </div>
    </div>
  );
}
