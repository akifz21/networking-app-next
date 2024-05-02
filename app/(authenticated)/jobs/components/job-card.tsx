import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatDateForShow } from "@/app/lib/utils";
import { Job } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  job: Job;
  setJobDetails: Dispatch<SetStateAction<Job>>;
  score?: string;
};

export default function JobCard({ job, setJobDetails, score }: Props) {
  return (
    <Card className="cursor-pointer" onClick={() => setJobDetails(job)}>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <span>{formatDateForShow(job.endDate)}</span>
          <span>{job.companyName}</span>
          {score && <span> {score}</span>}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
