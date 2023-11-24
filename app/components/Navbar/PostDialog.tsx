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
import { PostRequest } from "@/app/types/post.types";
import { postAdd } from "@/app/api/post";
import { useToast } from "../ui/use-toast";
import { useAuthStore } from "@/app/stores/authStore";

export default function PostDialog() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState<PostRequest>({
    description: "",
    userId: user.id,
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
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
      <DialogContent className="sm:max-w-[425px]">
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
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label>Image</Label>
              <Input
                id="file"
                type="file"
                placeholder="Image"
                className="w-full "
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
