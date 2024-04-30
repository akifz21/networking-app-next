"use client";
import PostList from "../components/post-list";
import useSWR from "swr";
import { Post } from "../types";
import { fetcher } from "../api/axiosInstance";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { data, isLoading, error } = useSWR<Post[], Error>("/posts/posts", fetcher);

  const { t } = useTranslation();

  return (
    <div className="border-x h-full flex flex-col pt-24  px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
      {t("hello")}
      <PostList data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
