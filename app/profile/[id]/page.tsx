"use client";
import { fetcher } from "@/app/api/axiosInstance";
import PostList from "@/app/components/post-list";
import { Post } from "@/app/types";
import React from "react";
import useSWR from "swr";
import ProfileCard from "../components/profile-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import FollowerList from "../components/follower-list";
import FollowingList from "../components/following-list";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useSWR<Post[]>(`/posts/posts/user/${params.id}`, fetcher);

  return (
    <div className="flex  justify-center w-full pt-24">
      <div className="border-x h-full flex flex-col col-span-2 px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
        <ProfileCard id={params.id} />
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full flex">
            <TabsTrigger value="posts" className="flex-1">
              Posts
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex-1">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostList data={data} isLoading={isLoading} error={error} />
          </TabsContent>
          <TabsContent value="followers">
            <FollowerList id={params.id} />
          </TabsContent>
          <TabsContent value="following">
            <FollowingList id={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
