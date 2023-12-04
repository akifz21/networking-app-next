"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "../../types";
import Images from "./images";
import { formatDateForShow } from "@/app/lib/utils";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  console.log(post.createdDate);
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
        <Button className="flex-1 " variant={"secondary"}>
          <Heart strokeWidth={3} />
        </Button>
        <Button className="flex-1 " variant={"secondary"}>
          <MessageCircle strokeWidth={3} />
        </Button>
      </CardFooter>
    </Card>
  );
}
