"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Company, Job } from "@/app/types";
import Link from "next/link";
import useSWR from "swr";
import Applications from "./applications";
import { useAuthStore } from "@/app/stores/authStore";

type Props = {
  company: Company | undefined;
};

export default function JobList({ company }: Props) {
  const { data, isLoading, error } = useSWR<Job[]>(`/jobs/company/${company?.id}`, fetcher);
  return (
    <div className="flex flex-col gap-4">
      {data?.map((job) => <JobCard key={job.id} ownerId={company?.ownerId} job={job} />)}
    </div>
  );
}

const JobCard = ({ job, ownerId }: { job: Job; ownerId: string | undefined }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <Card className="flex flex-row justify-between items-center">
      <CardHeader>
        <CardTitle>
          <Link href={`/jobs`}>{job.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row  py-0 items-center">
        {user.id === ownerId && <Applications companyId={job.companyId} jobId={job.id} />}
      </CardContent>
    </Card>
  );
};
