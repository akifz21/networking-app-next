"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type Props = {};

export default function PostCard({}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Name</CardTitle>
        <CardDescription>
          {"Fri Nov 24 2023 14:15:46 GMT+0300 (GMT+03:00)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo eum,
          cumque maiores eaque consectetur modi error facilis iure veritatis
          nostrum voluptatibus impedit deserunt qui delectus cupiditate totam
          quas, dignissimos fugiat ipsa. Quos et vitae quaerat harum sint, enim
          facere fugit mollitia iste veniam sit quam impedit officiis, ratione
          illum labore.
        </p>
      </CardContent>
      <CardFooter>
        <div className="relative h-80 w-full">
          <div className="grid grid-flow-col auto-cols-1 gap-2 h-full">
            <div className=" relative h-full">
              <Image
                src={"/post.jpg"}
                fill
                alt=""
                className="object-cover object-center rounded-sm"
              />
            </div>
            <div className="relative h-full">
              <Image
                src={"/auth.jpg"}
                fill
                alt=""
                className="object-cover object-center rounded-sm"
              />
            </div>
            <div className="relative h-full">
              <Image
                src={"/post.jpg"}
                fill
                alt=""
                className="object-cover object-center rounded-sm"
              />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
