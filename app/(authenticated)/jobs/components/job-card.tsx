import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Job } from "@/app/types";

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus exercitationem, sed ad
          ipsum numquam repellat fugiat ipsam harum accusantium atque?
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
