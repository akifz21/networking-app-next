"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { updateWorkers } from "@/app/api/company";
import { addEmployee } from "@/app/api/employee";
import { deleteApplication } from "@/app/api/job-application";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { formatDateForShow } from "@/app/lib/utils";
import { JobApplication } from "@/app/types/job-application.types";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

type Props = {
  jobId: string;
  companyId: string;
};

export default function Applications({ jobId, companyId }: Props) {
  const { data, isLoading, error } = useSWR<JobApplication[]>(`/jobs/applications/job/${jobId}`, fetcher);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t("companyPage.applications")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("companyPage.applicationList")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <div className="flex flex-col">
            {data?.map((application) => (
              <ApplicationCard setOpen={setOpen} key={application.id} companyId={companyId} application={application} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const ApplicationCard = ({
  application,
  companyId,
  setOpen,
}: {
  application: JobApplication;
  companyId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleApprove = async (userId: string) => {
    try {
      const res = await addEmployee({ companyId: companyId, userId: userId });
      await deleteApplication(application.userId, application.jobId);
      toast.success(res.data);
      setOpen(!open);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const { t } = useTranslation();

  return (
    <Card className="p-0 flex flex-row justify-between items-center">
      <CardHeader className="py-2">
        <CardTitle className="text-md">
          {application.userFirstName} {application.userLastName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row text-sm items-center gap-4  py-4">
        <span>{formatDateForShow(application.createdDate, true)}</span>
        <Button onClick={() => handleApprove(application.userId)} size={"sm"} className="bg-green-600">
          {t("submit")}
        </Button>
      </CardContent>
    </Card>
  );
};
