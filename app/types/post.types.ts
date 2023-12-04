export interface Post {
  id: string;
  userId: string;
  description: string;
  userFirstName: string;
  userLastName: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface PostRequest {
  userId: string;
  description: string;
}
