import { useAuthStore } from "@/app/stores/authStore";
import { Company } from "@/app/types/company.types";
import React from "react";
import useSWR from "swr";

type Props = {};

export default function OwnerCompanies({}: Props) {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useSWR<Company[]>(`/companies/owner/${user.id}`);

  return (
    <div className="border-x min-h-screen flex flex-col pt-24 px-10 md:w-3/4 lg:w-1/2 w-full justify-start gap-4"></div>
  );
}
