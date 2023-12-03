import React from "react";
import useSWR from "swr";
import { Post } from "../types";
import { fetcher } from "../api/axiosInstance";
import { Loader2 } from "lucide-react";
import PostCard from "./post-card";

export default function PostList() {
  const { data, isLoading, error } = useSWR<Post[], Error>("/posts/posts", fetcher);

  if (error) return <>{error.message}</>;

  if (isLoading) {
    return (
      <center className="mt-10">
        <Loader2 size={60} strokeWidth={3} className="animate-spin  " />
      </center>
    );
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4">
        {data?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
