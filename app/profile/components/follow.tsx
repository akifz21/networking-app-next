"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { toggleFollow } from "@/app/api/follow";
import { Button } from "@/app/components/ui/button";
import { useAuthStore } from "@/app/stores/authStore";
import { FollowRequest } from "@/app/types";
import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type Props = {
  id: string;
};

export default function Follow({ id }: Props) {
  const user = useAuthStore((state) => state.user);
  const {
    data: isFollowing,
    isLoading,
    error,
    mutate,
  } = useSWR<boolean>(`/users/follows/check?userId=${id}&followingId=${user.id}`, fetcher);

  const handleFollow = async (data: FollowRequest) => {
    try {
      const res = await toggleFollow(data);
      toast.success(res.data);
      mutate();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Button
        disabled={isLoading}
        variant={isFollowing ? "outline" : "default"}
        onClick={() => handleFollow({ userId: user.id, followingId: id })}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
}
