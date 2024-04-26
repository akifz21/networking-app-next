"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { User } from "@/app/types";
import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import Message from "./message";

const Follow = dynamic(() => import("./follow"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});

type Props = {
  user: User | undefined;
  error: any;
  id: string;
};

export default function ProfileCard({ user, error, id }: Props) {
  if (error) return <>{error?.message}</>;

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="" alt="user profile" />
              <AvatarFallback>{user?.firstName.charAt(0) + "" + user?.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">
              {user?.firstName} {user?.lastName}
            </span>
            <Follow id={id} />
            <Message id={id} name={user?.firstName + " " + user?.lastName} />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
