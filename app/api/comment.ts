import { CommentRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const addComment = (data: CommentRequest) => axios.post("/posts/comments", data);

export { addComment };
