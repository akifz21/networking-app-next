import { instance as axios } from "./axiosInstance";

const postAdd = (data: any) => axios.post("/posts/posts", data);

const getUserPosts = (userId: string) => axios.get(`posts/posts/user/${userId}`);

export { postAdd, getUserPosts };
