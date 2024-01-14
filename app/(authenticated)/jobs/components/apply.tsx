"use client";

import { applyJob } from "@/app/api/job-application";
import { Button } from "@/app/components/ui/button";
import { useAuthStore } from "@/app/stores/authStore";
import toast from "react-hot-toast";

type Props = {
  jobId: string;
};

export default function Apply({ jobId }: Props) {
  const user = useAuthStore((state) => state.user);

  const handleApply = async () => {
    try {
      const res = await applyJob({ jobId: jobId, userId: user.id });
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Button onClick={() => handleApply()}>Apply</Button>
    </div>
  );
}
