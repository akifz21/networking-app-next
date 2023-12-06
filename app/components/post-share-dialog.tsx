"use client";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { postAdd } from "@/app/api/post";
import { useAuthStore } from "@/app/stores/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function PostDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleFileUpload = (formData: FormData) => {
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("description", description);
      handleFileUpload(formData);
      const res = await postAdd(formData);
      toast.success(res.data);
      setOpen(!open);
      mutate("/posts/posts");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Share Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[780px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share a post</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <Textarea
                id="description"
                placeholder="Description"
                className="w-full"
                name="description"
                value={description}
                onChange={handleDescription}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label>Images</Label>
              <Input
                id="file"
                type="file"
                placeholder="Image"
                className="w-full "
                onChange={handleFileSelect}
                multiple
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {isLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : "Share"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
