"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { toggleFollow } from "@/app/api/follow";
import { Button } from "@/app/components/ui/button";
import { useAuthStore } from "@/app/stores/authStore";
import { FollowRequest } from "@/app/types";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

type Props = {
  id: string;
};

export default function Follow({ id }: Props) {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();
  const {
    data: isFollowing,
    isLoading,
    error,
    mutate,
  } = useSWR<boolean>(`/users/follows/check?userId=${user.id}&followingId=${id}`, fetcher);

  const isOwner = id === user.id ? true : false;

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
      {isOwner ? (
        <></>
      ) : (
        <Button
          disabled={isLoading}
          variant={isFollowing ? "outline" : "default"}
          onClick={() => handleFollow({ userId: user.id, followingId: id })}
        >
          {isFollowing ? t("profilePage.unfollow") : t("profilePage.follow")}
        </Button>
      )}
    </>
  );
}
