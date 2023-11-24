export interface Post {
  id: string;
  userId: string;
  description: string;
}

export interface PostRequest {
  userId: string;
  description: string;
}
