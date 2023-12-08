import React, { useEffect } from "react";
import useSWR from "swr";
import { User } from "@/app/types";
import { Loader2 } from "lucide-react";
import { fetcher } from "@/app/api/axiosInstance";
import { UserCard } from "./user-card";

type Props = {
  id: string;
};

export default function FollowerList({ id }: Props) {
  const { data, isLoading, error } = useSWR<User[]>(`/users/follows/followers/${id}`, fetcher);

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
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}
