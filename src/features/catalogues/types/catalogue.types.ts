import { IBaseResponse } from "@/features/shared/base.types";
import { IUserResponse } from "@/features/users/types/user.types";

export interface ICatalogueResponse extends IBaseResponse {
  id: string;
  userId?: string;

  name: string;

  code: string;

  description: string;

  catalogueTypeId?: string;

  user?: IUserResponse;

  catalogueType?: ICatalogueResponse;

  subCatalogues?: ICatalogueResponse[];
}
