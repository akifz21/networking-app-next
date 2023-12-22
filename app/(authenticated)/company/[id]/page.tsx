import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import React from "react";
import CompanyCard from "./components/company-card";

type Props = {
  params: { id: string };
};

export default function CompanyPage({ params }: Props) {
  return (
    <div className="border-x h-full flex pt-24 flex-col col-span-2 px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
      <CompanyCard id={params.id} />
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="jobs" className="flex-1">
            Job Advertisements
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex-1">
            Workers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs"></TabsContent>
        <TabsContent value="workers"></TabsContent>
      </Tabs>
    </div>
  );
}
