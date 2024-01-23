"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Employee } from "@/app/types";
import Link from "next/link";
import useSWR from "swr";

type Props = {
  id: string;
};

export default function EmployeeList({ id }: Props) {
  const { data, isLoading, error } = useSWR<Employee[]>(`/company/employees/company/${id}`, fetcher);

  return <div className="flex flex-col gap-4">{data?.map((employee) => <EmployeeCard employee={employee} />)}</div>;
}
const EmployeeCard = ({ employee }: { employee: Employee }) => {
  return (
    <Card className="flex flex-row justify-between items-center">
      <CardHeader>
        <CardTitle>
          <Link href={`/jobs`}>
            {employee.userFirstName} {employee.userLastName}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row  py-0 items-center"></CardContent>
    </Card>
  );
};
