import { FollowRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const toggleFollow = (data: FollowRequest) => axios.post("/users/follows/toggle", data);

export { toggleFollow };
