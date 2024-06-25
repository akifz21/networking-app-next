"use client";
import { postImageDelete, postImageUpload, postUpdate } from "@/app/api/post";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Post, PostUpdateRequest } from "@/app/types";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Settings, Trash } from "lucide-react";
import { usePostImages } from "@/app/hooks/usePostImages";

export default function PostEditDialog({ post, mutate }: { post: Post; mutate: any }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { data, mutate: imageMutate } = usePostImages(post.id);

  const defaultValues = useMemo<PostUpdateRequest>(
    () => ({
      description: post?.description || "",
    }),
    [post]
  );

  const [form, setForm] = useState<PostUpdateRequest>(defaultValues);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const formData = new FormData();

  useEffect(() => {
    setForm(defaultValues);
  }, [defaultValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (formData: FormData) => {
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    formData.append("postId", post.id);
    try {
      const res = await postUpdate(post.id, form);
      if (selectedFiles) {
        handleFileUpload(formData);
        await postImageUpload(formData);
      }
      toast.success(res?.data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      setOpen(!open);
      mutate();
      imageMutate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Settings size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("editPage.editPost")}</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <Label>{t("description")}</Label>
              <Textarea
                placeholder={t("description")}
                value={form.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>{t("images")}</Label>
              <Input
                id="file"
                type="file"
                placeholder="Image"
                className="w-full "
                onChange={handleFileSelect}
                multiple
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              {data?.map((image) => (
                <div>
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    type="button"
                    onClick={async () => {
                      try {
                        await postImageDelete(image.id);
                        toast.success("Image deleted");
                        imageMutate();
                      } catch (error: any) {
                        toast.error(error.message);
                      }
                    }}
                  >
                    <Trash size={24} />
                  </Button>
                  <img
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.id}`}
                    alt={image.name}
                    className="w-32 h-32 object-contain "
                  />
                </div>
              ))}
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
