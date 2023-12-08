export interface FollowRequest {
  userId: string;
  followingId: string;
}

export interface FollowResponse {
  id: string;
  userId: string;
  followingId: string;
  userName: string;
  followingName: string;
}
