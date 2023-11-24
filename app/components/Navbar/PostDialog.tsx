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
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { postAdd } from "@/app/api/post";
import { useToast } from "../ui/use-toast";
import { useAuthStore } from "@/app/stores/authStore";

export default function PostDialog() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const user = useAuthStore((state) => state.user);
  const [description, setDescription] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleFileUpload = async (formData: FormData) => {
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
      console.log(formData);
      const res = await postAdd(formData);
      toast({
        title: res.data,
      });
    } catch (error: any) {
      toast({
        title: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
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
              <Label>Image</Label>
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
              Share
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
