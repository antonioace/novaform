import { IBaseResponse } from "@/features/shared/base.types";
import { IRoleResponse } from "@/features/role/types/role.types";
import { IPermissionResponse } from "@/features/role/types/role.types";

export interface IUserRoleResponse {
  id: string;
  role: IRoleResponse;
}

export interface IUserPermissionResponse {
  id: string;
  permission: IPermissionResponse;
}

export interface IUserResponse extends IBaseResponse {
  username: string;
  email: string;
  roles?: IUserRoleResponse[];
  permissions?: IUserPermissionResponse[];
}
