import { LikeRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const like = (data: LikeRequest) => axios.post("/posts/likes", data);

const unLike = (data: LikeRequest) =>
  axios.delete(`/posts/likes/delete?postId=${data.postId}&userId=${data.userId}`);

const toggleLike = (data: LikeRequest) => axios.post("/posts/likes/toggle", data);

export { like, unLike, toggleLike };
