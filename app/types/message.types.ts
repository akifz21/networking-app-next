export type ChatMessage = {
  senderId: string;
  message: string;
};

export type Message = ChatMessage & {
  id: string;
  roomId: string;
};
