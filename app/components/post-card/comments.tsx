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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { addComment } from "@/app/api/comment";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/stores/authStore";
import { fetcher } from "@/app/api/axiosInstance";
import { formatDateForShow } from "@/app/lib/utils";

type Props = {
  id: string;
};

export function Comments({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
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
      setSubmitLoading(true);
      const res = await addComment(form);
      mutate();
      toast.success(res.data);
      setForm({ ...form, description: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const CommentList = () => {
    if (error) {
      return <>{error.message}</>;
    }

    if (isLoading)
      return <Loader2 strokeWidth={3} size={40} className="animate-spin self-center" />;

    if (data && data?.length <= 0) {
      return <div>No comments found.</div>;
    }

    return (
      <>
        {data?.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {comment.userFirstName} {comment.userLastName}
              </CardTitle>
              <CardDescription>{formatDateForShow(comment.createdDate, true)}</CardDescription>
            </CardHeader>

            <CardContent>{comment.description}</CardContent>
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
              value={form.description}
              onChange={handleChange}
              className="col-span-3"
            />
            <Button type="submit" disabled={submitLoading}>
              Share Comment
            </Button>
          </form>
          <CommentList />
        </div>
        <div className="flex flex-col gap-4"></div>
      </SheetContent>
    </Sheet>
  );
}
