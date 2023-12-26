"use client";
import { Button } from "@/app/components/ui/button";
import { Loader2, MessageCircle, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Props = {
  id: string;
};

export default function Message({ id }: Props) {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [client, setClient] = useState<Client>();
  useEffect(() => {
    if (roomId) {
      const socket = new SockJS("http://localhost:8100/ws");
      const stompClient = new Client({
        webSocketFactory: () => socket,
      });

      stompClient.onConnect = (frame) => {
        console.log("Connected:", frame, roomId);
        stompClient.subscribe(`/topic/messages/${roomId}`, (message) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        });
      };

      stompClient.activate();
      setClient(stompClient);
    }
  }, [roomId]);

  const handleRoom = async () => {
    try {
      setIsLoading(true);
      const res = await createRoom({ senderUserId: user.id, receiverUserId: id });
      const room = res.data;
      setRoomId(room?.id);
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
        <SheetContent className="flex flex-col gap-4">
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
                <Button
                  onClick={() => {
                    client?.publish({
                      destination: `/app/message/${roomId}`,
                      body: JSON.stringify({ sender: user.id, content: "Textddttt" }),
                    });
                  }}
                  className="flex flex-row items-center gap-2"
                >
                  Send
                  <Send />
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Name</CardTitle>
              </CardHeader>
              <CardContent>Text</CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
