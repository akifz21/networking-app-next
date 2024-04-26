"use client";
import { Button } from "@/app/components/ui/button";
import { Loader, Loader2, MessageCircle, Send } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Input } from "@/app/components/ui/input";
import { useAuthStore } from "@/app/stores/authStore";
import { createRoom } from "@/app/api/room";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Message as MessageType } from "@/app/types";
import useSWR from "swr";
import { fetcher } from "@/app/api/axiosInstance";

type Props = {
  id: string;
  name: string;
};

export default function Message({ id, name }: Props) {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messageToSend, setMessageToSend] = useState<string>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const {
    data: oldMessages,
    isLoading: oldMessagesLoading,
    error: oldMessagesError,
  } = useSWR<MessageType[]>(`/messages/${roomId}`, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    if (roomId) {
      const socket = new SockJS("http://localhost:8100/ws");
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.onConnect = (frame) => {
        console.log("Connected:", frame, roomId);
        stompClient.subscribe(`/topic/messages/${roomId}`, (message) => {
          setMessages((prevMessages) => [JSON.parse(message.body), ...prevMessages]);
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
        <SheetContent className="flex flex-col gap-4 overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Mesajlar</SheetTitle>
          </SheetHeader>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-4 items-center">
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageToSend(e.target.value)}
                />
                <Button
                  onClick={() => {
                    client?.publish({
                      destination: `/app/message/${roomId}`,
                      body: JSON.stringify({ senderId: user.id, message: messageToSend }),
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
          <div className="flex flex-col gap-2">
            {messages?.map((message, i) => (
              <MessageCard currentUserId={user.id} name={name} message={message} key={i} />
            ))}
          </div>
          <div className="flex flex-col   gap-2">
            {oldMessagesLoading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                {oldMessages?.map((message, i) => (
                  <MessageCard currentUserId={user.id} name={name} message={message} key={i} />
                ))}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MessageCard({ message, currentUserId, name }: { message: MessageType; currentUserId: string; name?: string }) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="py-0 ">
        <CardTitle className="text-md">{message?.senderId == currentUserId ? "Ben" : name}</CardTitle>
      </CardHeader>
      <CardContent className="py-0">{message?.message}</CardContent>
    </Card>
  );
}
