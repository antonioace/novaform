export interface ICreateProjectDto {
  userId: string;
  name: string;
  code: string;
  description?: string;
}
export type IUpdateProjectDto = Partial<ICreateProjectDto>;
export interface IProjectResponse {
  id: string;
  userId: string;
  name: string;
  code: string;
  description?: string;
}
export interface IProjectByFiltersResponse {
  data: IProjectResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IProjectFilters {
  projectId: string;
  name: string;
}
