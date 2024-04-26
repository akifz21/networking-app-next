"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import React from "react";
import CompanyCard from "./components/company-card";
import JobList from "./components/job-list";
import EmployeeList from "./components/employee-list";
import useSWR from "swr";
import { Company } from "@/app/types";
import { fetcher } from "@/app/api/axiosInstance";

type Props = {
  params: { id: string };
};

export default function CompanyPage({ params }: Props) {
  const { data: company, isLoading, error } = useSWR<Company | undefined>(`/company/${params.id}`, fetcher);

  return (
    <div className="border-x min-h-screen flex pt-24 flex-col col-span-2 px-10 md:w-3/4 lg:w-1/2 w-full justify-start  gap-4">
      <CompanyCard company={company} error={error} />
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="about" className="flex-1">
            Hakkında
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex-1">
            İş ilanları
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex-1">
            Çalışanlar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about">{company?.description}</TabsContent>
        <TabsContent value="jobs">
          <JobList company={company} />
        </TabsContent>
        <TabsContent value="workers">
          <EmployeeList id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
