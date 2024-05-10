"use client";
import PostList from "../components/post-list";
import useSWR from "swr";
import { Post } from "../types";
import { fetcher } from "../api/axiosInstance";

export default function Home() {
  const { data, isLoading, error, mutate } = useSWR<Post[], Error>("/posts/posts", fetcher);

  return (
    <div className="border-x h-full flex flex-col pt-24  px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
      <PostList mutate={mutate} data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
