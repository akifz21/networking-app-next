export interface Post {
  id: string;
  userId: string;
  description: string;
  userFirstName: string;
  userLastName: string;
}

export interface PostRequest {
  userId: string;
  description: string;
}
