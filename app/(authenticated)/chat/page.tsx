"use client";

import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/app/stores/authStore";

export default function Chat() {
  const user = useAuthStore((state) => state.user);

  const client = new Client({
    brokerURL: "ws://localhost:8100/chat",
    onConnect: () => {
      console.log("Connection successfully");
      client.subscribe("/topic/messages", (message) => {
        console.log(message.body);
      });
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onStompError(frame) {
      console.log(frame.body);
    },
    onWebSocketError(error) {
      console.log("error", error);
    },
  });

  useEffect(() => {
    client.activate();
  }, [client]);

  return (
    <div className="flex pt-24">
      <button
        onClick={() => client.publish({ destination: "/app/message", body: "Message Sended" })}
      >
        Gönder
      </button>
    </div>
  );
}
