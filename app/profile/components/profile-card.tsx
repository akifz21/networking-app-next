"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { User } from "@/app/types";
import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Follow = dynamic(() => import("./follow"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});

type Props = {
  id: string;
};

export default function ProfileCard({ id }: Props) {
  const { data, isLoading, error } = useSWR<User>(`/users/${id}`, fetcher);

  if (error) return <>{error?.message}</>;

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">
              {data?.firstName} {data?.lastName}
            </span>
            <Follow id={id} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, eligendi.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}