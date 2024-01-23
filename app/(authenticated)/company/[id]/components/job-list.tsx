"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Job } from "@/app/types";
import Link from "next/link";
import useSWR from "swr";
import Applications from "./applications";

type Props = {
  companyId: string;
};

export default function JobList({ companyId }: Props) {
  const { data, isLoading, error } = useSWR<Job[]>(`/jobs/company/${companyId}`, fetcher);
  return <div className="flex flex-col gap-4">{data?.map((job) => <JobCard key={job.id} job={job} />)}</div>;
}

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="flex flex-row justify-between items-center">
      <CardHeader>
        <CardTitle>
          <Link href={`/jobs`}>{job.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row  py-0 items-center">
        <Applications companyId={job.companyId} jobId={job.id} />
      </CardContent>
    </Card>
  );
};
