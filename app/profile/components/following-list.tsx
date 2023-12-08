import React from "react";
import useSWR from "swr";
import { FollowResponse } from "@/app/types";
import { Loader2 } from "lucide-react";
import { fetcher } from "@/app/api/axiosInstance";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import Follow from "./follow";

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

  function UserCard({ user }: { user: FollowResponse }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">{user.followingName}</span>
            <Follow id={user.followingId} />
          </CardTitle>
        </CardHeader>
      </Card>
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
