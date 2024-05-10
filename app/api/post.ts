import { PostUpdateRequest } from "../types";
import { instance as axios } from "./axiosInstance";

const postAdd = (data: any) => axios.post("/posts/posts", data);

const getUserPosts = (userId: string) => axios.get(`posts/posts/user/${userId}`);

const deletePost = (postId: string) => axios.delete(`posts/posts/${postId}`);

const postUpdate = (postId: string, data: PostUpdateRequest) => axios.patch(`posts/posts/${postId}`, data);

const postImageUpload = (data: FormData) => axios.post(`posts/post-images/upload`, data);

const postImageDelete = (imageId: string) => axios.delete(`posts/post-images/${imageId}`);

export { postAdd, getUserPosts, deletePost, postUpdate, postImageUpload, postImageDelete };
