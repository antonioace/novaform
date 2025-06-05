import { User, Session } from "@supabase/supabase-js";

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: User | null;
  session: Session | null;
}
