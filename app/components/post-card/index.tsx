"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Post } from "../../types";
import Images from "./images";
import { formatDateForShow } from "@/app/lib/utils";
import { Comments } from "./comments";
import Like from "./like";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.userFirstName + " " + post.userLastName}</CardTitle>
        <CardDescription>{formatDateForShow(post.createdDate, true)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col  gap-2">
        <p>{post.description}</p>
        <Images id={post.id} />
      </CardContent>
      <CardFooter className="flex flex-row gap-2  ">
        <Like id={post.id} />
        <Comments id={post.id} />
      </CardFooter>
    </Card>
  );
}
