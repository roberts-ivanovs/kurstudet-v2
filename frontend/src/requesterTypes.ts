import { User } from "types";

export interface RegisterUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface RegisterUserResponse {
  user: User;
}

export interface TokenRequest {
  username: string;
  password: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface UserRequest {
  userId: number;
}
