"use client";
import { updateUser } from "@/app/api/auth";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { User, UserUpdate } from "@/app/types";
import { Settings } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { mutate } from "swr";

export default function EditProfileDialog({ id, user }: { id: string; user?: User }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues = useMemo<UserUpdate>(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      description: user?.description || "",
      email: user?.email || "",
    }),
    [user]
  );

  const [form, setForm] = useState<UserUpdate>(defaultValues);

  useEffect(() => {
    setForm(defaultValues);
  }, [defaultValues]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateUser(form, id);
      setOpen(!open);
      mutate(`/users/${id}`);
      toast.success(res?.data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editPage.editProfile")}</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <Label>{t("editPage.firstName")}</Label>
              <Input
                placeholder={t("editPage.firstName")}
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>{t("editPage.lastName")}</Label>
              <Input
                placeholder={t("editPage.lastName")}
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>{t("description")}</Label>
              <Textarea
                placeholder={t("description")}
                value={form.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <Button disabled={loading} className="w-full">
              {t("submit")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
