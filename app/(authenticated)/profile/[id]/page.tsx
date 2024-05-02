"use client";
import { fetcher } from "@/app/api/axiosInstance";
import PostList from "@/app/components/post-list";
import { Post, User } from "@/app/types";
import React from "react";
import useSWR from "swr";
import ProfileCard from "../components/profile-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import FollowerList from "../components/follower-list";
import FollowingList from "../components/following-list";
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSWR<Post[]>(`/posts/posts/user/${params.id}`, fetcher);
  const { data: user, error: userError } = useSWR<User>(`/users/${params.id}`, fetcher);

  return (
    <div className="border-x min-h-screen flex pt-24 flex-col col-span-2 px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
      <ProfileCard id={params.id} user={user} error={userError} />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="posts" className="flex-1">
            {t("profilePage.postsTab")}
          </TabsTrigger>
          <TabsTrigger value="about" className="flex-1">
            {t("profilePage.aboutTab")}
          </TabsTrigger>
          <TabsTrigger value="followers" className="flex-1">
            {t("profilePage.followersTab")}
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            {t("profilePage.followingTab")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostList data={data} isLoading={isLoading} error={error} />
        </TabsContent>
        <TabsContent value="about">{user?.description}</TabsContent>
        <TabsContent value="followers">
          <FollowerList id={params.id} />
        </TabsContent>
        <TabsContent value="following">
          <FollowingList id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
