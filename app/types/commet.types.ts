export interface Comment {
  id: string;
  postId: string;
  description: string;
  userFirstName: string;
  userLastName: string;
}

export interface CommentRequest {
  postId: string;
  description: string;
  userId: string;
}
