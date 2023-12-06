"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { LikeRequest } from "@/app/types/like.types";
import { toggleLike } from "@/app/api/like";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher } from "@/app/api/axiosInstance";
import { useAuthStore } from "@/app/stores/authStore";

type Props = {
  id: string;
};

export default function Like({ id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const {
    data: count,
    isLoading: countLoading,
    error: countError,
    mutate: countMutate,
  } = useSWR<number>(`/posts/likes/count/${id}`, fetcher);

  const { data: isLiked, mutate: checkMutate } = useSWR<boolean>(
    `/posts/likes/check?userId=${user.id}&postId=${id}`,
    fetcher
  );

  const handleLike = async (data: LikeRequest) => {
    try {
      setLoading(true);
      const res = await toggleLike(data);
      countMutate();
      checkMutate();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleLike({ postId: id, userId: user.id })}
        className="flex-1 flex flex-row gap-2"
        disabled={loading}
        variant={"default"}
      >
        <Heart fill={isLiked ? "white" : "none"} strokeWidth={3} />
        <span>{countLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : count}</span>
      </Button>
    </>
  );
}
