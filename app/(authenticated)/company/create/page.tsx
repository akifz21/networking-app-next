"use client";
import { addCompany } from "@/app/api/company";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuthStore } from "@/app/stores/authStore";
import { CompanyRequest } from "@/app/types/company.types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CompanyCreate() {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [form, setForm] = useState<CompanyRequest>({
    description: "",
    name: "",
    ownerId: user.id || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await addCompany(form);
      toast.success(res.data);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center w-full md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden  h-full  items-center justify-center flex-col filter   lg:flex">
        <Image
          alt=""
          src={"/company2.jpg"}
          className="blur-sm"
          objectFit="cover"
          objectPosition="center"
          fill
        />
        <h1 className="absolute text-8xl font-bold text-black">Register Your Company</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center w-full justify-center h-full lg:px-8"
      >
        <h1 className="font-bold lg:hidden text-4xl ">Register Your Company</h1>
        <Input
          id="name"
          placeholder="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <Textarea
          id="description"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Button className="w-full">
          {isLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
