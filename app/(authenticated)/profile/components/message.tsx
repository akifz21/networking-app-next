"use client";
import { Button } from "@/app/components/ui/button";
import { Loader2, MessageCircle, Send } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Input } from "@/app/components/ui/input";
import { useAuthStore } from "@/app/stores/authStore";
import { createRoom } from "@/app/api/room";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";

type Props = {
  id: string;
};

export default function Message({ id }: Props) {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoom = async () => {
    try {
      setIsLoading(true);
      const res = await createRoom({ senderUserId: user.id, receiverUserId: id });
      const room = res.data;
      console.log(room);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button onClick={() => handleRoom()} variant="outline" size={"icon"}>
            <MessageCircle />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Messages</SheetTitle>
          </SheetHeader>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-4 items-center">
                <Input id="name" className="col-span-3" />
                <Button className="flex flex-row items-center gap-2">
                  Send
                  <Send />
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
