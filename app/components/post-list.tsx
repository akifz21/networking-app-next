"use client";
import React from "react";
import { Post } from "../types";
import { Loader2 } from "lucide-react";
import PostCard from "./post-card";
import { useTranslation } from "react-i18next";

type Props = {
  data: Post[] | undefined;
  isLoading: boolean;
  error: any;
  mutate: any;
};

export default function PostList({ data, isLoading, error, mutate }: Props) {
  const { t } = useTranslation();
  if (error) return <>{error.message}</>;

  if (isLoading) {
    return (
      <center className="mt-10">
        <Loader2 size={60} strokeWidth={3} className="animate-spin" />
      </center>
    );
  }

  if (data && data?.length <= 0) {
    return <>{t("posts.noPosts")}</>;
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4">
        {data?.map((post) => <PostCard post={post} mutate={mutate} key={post.id} />)}
      </div>
    </div>
  );
}
