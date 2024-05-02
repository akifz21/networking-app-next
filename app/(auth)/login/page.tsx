"use client";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { UserLogin } from "@/app/types";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/auth";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const loginState = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const res = await login(formData);
      loginState(res?.data);
      toast.success(t("login.successMessage"));
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={"grid gap-6"}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("login.title")}</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder={t("email")}
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              placeholder={t("password")}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button>{isLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : t("login.buttonText")}</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("login.noAccount")}</span>
        </div>
      </div>
      <Button onClick={() => router.push("/register")} variant="outline" type="button">
        {t("login.registerButtonText")}
      </Button>
    </div>
  );
}
