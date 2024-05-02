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
import { useTranslation } from "react-i18next";

export default function CompanyCreate() {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation();

  const [form, setForm] = useState<CompanyRequest>({
    description: "",
    name: "",
    ownerId: user.id || "",
    address: "",
    email: "",
    website: "",
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
        <Image alt="" src={"/company2.jpg"} className="blur-sm" objectFit="cover" objectPosition="center" fill />
        <h1 className="absolute text-8xl font-bold text-black">{t("companyPage.createCompany")}</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full justify-center h-full lg:px-8">
        <h1 className="font-bold lg:hidden text-4xl ">{t("companyPage.createCompany")}</h1>
        <Input id="name" placeholder={t("name")} name="name" type="text" value={form.name} onChange={handleChange} />

        <Input
          id="email"
          placeholder={t("email")}
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          id="website"
          placeholder="Website"
          name="website"
          type="text"
          value={form.website}
          onChange={handleChange}
        />

        <Textarea id="address" placeholder="Address" name="address" value={form.address} onChange={handleChange} />

        <Textarea
          id="description"
          placeholder={t("description")}
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Button className="w-full">
          {isLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : t("submit")}
        </Button>
      </form>
    </div>
  );
}
