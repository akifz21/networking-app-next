import useSWR from "swr";
import { fetcher } from "../api/axiosInstance";
import { PostImage } from "../types/postImage.types";

export function usePostImages(id: string) {
  const { data, error, isLoading, mutate } = useSWR<PostImage[]>(`/posts/post-images/${id}/images`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
