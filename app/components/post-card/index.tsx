"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Post } from "../../types";
import Images from "./images";
import { formatDateForShow } from "@/app/lib/utils";
import { Comments } from "./comments";
import Like from "./like";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import PostEditDialog from "./post-edit-dialog";
import { useTranslation } from "react-i18next";
import { deletePost } from "@/app/api/post";

type Props = {
  post: Post;
  mutate: any;
};

export default function PostCard({ post, mutate }: Props) {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();
  const handleDelete = async () => {
    await deletePost(post.id);
    mutate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <Link href={`/profile/${post.userId}`}>
            <CardTitle>{post.userFirstName + " " + post.userLastName}</CardTitle>
          </Link>
          {user?.id === post.userId && (
            <div className="flex flex-row items-center gap-4">
              <PostEditDialog mutate={mutate} post={post} />
            </div>
          )}
        </div>
        <CardDescription>{formatDateForShow(post.createdDate, true)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col  gap-2">
        <p>{post.description}</p>
        <Images id={post.id} />
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Like id={post.id} />
        <Comments id={post.id} />
      </CardFooter>
    </Card>
  );
}
