"use client";
import useSWR from "swr";
import JobCard from "../components/job-card";
import { Job, User } from "@/app/types";
import { fetcher } from "@/app/api/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import JobDetails from "../components/job-details";
import { useAuthStore } from "@/app/stores/authStore";
import axios from "axios";

type JobRecommendation = {
  job: Job;
  similarity_score: string;
};

export default function Recommendations() {
  const [data, setData] = useState<JobRecommendation[]>([]);
  const auth = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, error: userError } = useSWR<User>(`/users/${auth.id}`, fetcher);

  const [jobDetail, setJobDetails] = useState<Job>({
    companyId: "",
    description: "",
    id: "",
    title: "",
    companyName: "",
    endDate: "",
  });

  const getReccomendations = useCallback(async () => {
    try {
      const res = await axios.post(`http://localhost:3030/recommendation/?user_description=${user?.description}`);
      setData(res.data?.recommended_jobs);
    } catch (e: any) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    getReccomendations();
  }, [getReccomendations]);

  return (
    <div className="flex flex-row min-h-screen gap-4 w-full justify-betweenş pt-24 px-24">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="self-center text-4xl font-bold">Önerilen İş İlanları</h1>
        {data?.map((job) => (
          <JobCard setJobDetails={setJobDetails} score={job.similarity_score} job={job.job} key={job.job.id} />
        ))}
        <hr />
      </div>

      <div className="flex-1 border-l-2 pl-4  h-full">
        <div className="flex flex-col gap-2">{jobDetail.description !== "" && <JobDetails job={jobDetail} />}</div>
      </div>
    </div>
  );
}
