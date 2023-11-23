"use client";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { UserLogin } from "@/app/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/use-toast";
import { login } from "@/app/api/auth";
import { AxiosError } from "axios";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const loginState = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    try {
      const res = await login(formData);
      loginState(res?.data);
      toast({
        title: "Login Successfully.",
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data?.message,
        });
      }
    }
  }

  return (
    <div className={"grid gap-6"}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to your account
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="E-Mail"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button>Login</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        Github
      </Button>
    </div>
  );
}
