import { IBaseResponse } from "@/features/shared/base.types";

export interface ICatalogueResponse extends IBaseResponse {
  id: string;
  userId?: string;

  name: string;

  code: string;

  description: string;

  catalogueTypeId?: string;
}

export interface ICatalogueByFiltersResponse {
  data: ICatalogueResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
