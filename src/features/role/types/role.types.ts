import { IBaseResponse } from "@/features/shared/base.types";
import { IUserResponse } from "@/features/users/types/user.types";

export interface IRoleResponse {
  id: string;
  name: string;
  description: string;
  users?: IUserRoleResponse[];
  permissions?: IRolePermissionResponse[];
}

export interface IRolePermissionResponse extends IBaseResponse {
  roleId: string;
  permissionId: string;
  role: IRoleResponse;
  permission: IPermissionResponse;
}

export interface IPermissionResponse extends IBaseResponse {
  name: string;
  description: string;
  code: string;
}

export interface IUserRoleResponse extends IBaseResponse {
  userId: string;
  roleId: string;
  role: IRoleResponse;
  user: IUserResponse;
}
