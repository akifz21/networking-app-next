"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/app/stores/authStore";
import SockJS from "sockjs-client";

export default function Chat() {
  const user = useAuthStore((state) => state.user);
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8100/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });

    stompClient.onConnect = (frame) => {
      console.log("Bağlandı:", frame);

      stompClient.subscribe("/topic/messages", (message) => {
        console.log("Gelen mesaj:", message.body);
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div className="flex pt-24">
      <button
        onClick={() => client?.publish({ destination: "/app/message", body: "Message Sended" })}
      >
        Gönder
      </button>
    </div>
  );
}
