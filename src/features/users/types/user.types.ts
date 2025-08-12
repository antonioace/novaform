import { IBaseResponse } from "@/features/shared";

export interface IUserResponse extends IBaseResponse {
  id: string;
  username: string;
  email: string;
  roles: {
    id: string;
    name: string;
    description: string;
  }[];
  files: {
    id: string;
    url: string;
  }[];
  catalogues: {
    id: string;
    name: string;
    description: string;
  }[];
  profileImage: string;
  fullName: string;
}
