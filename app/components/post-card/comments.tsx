"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Comment, CommentRequest } from "@/app/types";
import { Loader2, MessageCircle } from "lucide-react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import useSWR from "swr";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addComment } from "@/app/api/comment";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/stores/authStore";
import { fetcher } from "@/app/api/axiosInstance";

type Props = {
  id: string;
};

export function Comments({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error, mutate } = useSWR<Comment[], Error>(
    open ? `/posts/comments/post/${id}` : null,
    fetcher
  );

  const [form, setForm] = useState<CommentRequest>({
    postId: id,
    description: "",
    userId: user.id,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await addComment(form);
      mutate();
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const CommentList = () => {
    if (error) {
      return <>{error.message}</>;
    }

    if (isLoading)
      return <Loader2 strokeWidth={3} size={40} className="animate-spin self-center" />;

    return (
      <>
        {data?.map((comment) => (
          <Card>
            <CardHeader>
              {comment.userFirstName} {comment.userLastName}
            </CardHeader>
            <CardContent className="font-extralight">{comment.description}</CardContent>
          </Card>
        ))}
      </>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex-1" variant={"secondary"}>
          <MessageCircle strokeWidth={3} />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <Input
              id="description"
              name="description"
              onChange={handleChange}
              className="col-span-3"
            />
            <Button type="submit">Share Comment</Button>
          </form>
          <CommentList />
        </div>
        <div className="flex flex-col gap-4"></div>
      </SheetContent>
    </Sheet>
  );
}
