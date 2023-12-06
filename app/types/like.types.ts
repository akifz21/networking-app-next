export interface Like extends LikeRequest {
  id: string;
}

export interface LikeRequest {
  postId: string;
  userId: string;
}
