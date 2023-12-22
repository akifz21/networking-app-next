export type Room = RoomRequest & {
  id: string;
  messages?: string[];
};

export type RoomRequest = {
  senderUserId: string;
  receiverUserId: string;
};
