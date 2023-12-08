import React from "react";
import useSWR from "swr";
import { FollowResponse } from "@/app/types";
import { Loader2 } from "lucide-react";
import { fetcher } from "@/app/api/axiosInstance";
import { UserCard } from "./user-card";

type Props = {
  id: string;
};

export default function FollowingList({ id }: Props) {
  const { data, isLoading, error } = useSWR<FollowResponse[]>(
    `/users/follows/following/${id}`,
    fetcher
  );

  if (error) return <>{error.message}</>;
  if (isLoading) {
    return (
      <>
        <Loader2 strokeWidth={3} className="animate-spin" />
      </>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {data?.map((user) => (
        <UserCard userName={user.followingName} userId={user.followingId} key={user.id} />
      ))}
    </div>
  );
}
