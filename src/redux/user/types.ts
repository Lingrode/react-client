import { User } from "@/types";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}
