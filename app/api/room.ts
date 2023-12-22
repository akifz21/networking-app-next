import { RoomRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const createRoom = (data: RoomRequest) => axios.post("/messages/rooms/create", data);

export { createRoom };
