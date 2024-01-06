import { addJob } from "@/app/api/job";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { JobRequest } from "@/app/types";
import { Pencil } from "lucide-react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  companyId: string;
};

export function ShareJob({ companyId }: Props) {
  const [form, setForm] = useState<JobRequest>({
    companyId: companyId,
    description: "",
    title: "",
    endDate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await addJob(form);
      toast.success(res?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <Input onChange={handleChange} name="title" id="title" placeholder="Title" type="text" />
          <Textarea
            onChange={handleChange}
            name="description"
            placeholder="Description"
            id="description"
          />
          <div className="flex flex-col items-start gap-2">
            <Label>End Date: </Label>
            <Input
              onChange={handleChange}
              name="endDate"
              id="endDate"
              type="datetime-local"
              placeholder="End date"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
