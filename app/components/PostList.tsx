import React from "react";
import useSWR from "swr";
import { Post } from "../types";
import { fetcher } from "../api/axiosInstance";
import { Loader2 } from "lucide-react";
import PostCard from "./PostCard";

type Props = {};

export default function PostList({}: Props) {
  const { data, isLoading, error } = useSWR<Post[]>("/posts/posts", fetcher);

  return (
    <div>
      {isLoading ? (
        <center className="mt-10">
          <Loader2 size={60} strokeWidth={3} className="animate-spin  " />
        </center>
      ) : (
        <div className="flex flex-col gap-4">
          {data?.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      )}
    </div>
  );
}
