"use client";

import { register } from "@/app/api/auth";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { UserRegister } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<UserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await register(formData);
      toast.success("Kayıt Başarılı.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={"grid gap-6"}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Hesap Oluştur</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="firstName"
              placeholder="First Name"
              type="text"
              autoCapitalize="none"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              placeholder="Last Name"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="E-Mail"
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>Kayıt ol</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        Github
      </Button>
    </div>
  );
}
