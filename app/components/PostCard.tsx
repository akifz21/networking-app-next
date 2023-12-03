"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "../types";
import { usePostImages } from "../hooks/usePostImages";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { data, isLoading } = usePostImages(post.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.userFirstName + " " + post.userLastName}</CardTitle>
        <CardDescription>{"Fri Nov 24 2023 14:15:46 GMT+0300 (GMT+03:00)"}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col  gap-2">
        <p>{post.description}</p>
        {data && data.length > 0 && (
          <div className="relative h-80 w-full">
            <div className="grid grid-flow-col  gap-2 h-full">
              {data.map((image) => (
                <div key={image.id} className="relative h-full ">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.id}`}
                    fill
                    alt={image.name}
                    className="object-cover object-center rounded-sm "
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
