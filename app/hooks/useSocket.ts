import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

export function useSocket() {
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

  return client;
}
