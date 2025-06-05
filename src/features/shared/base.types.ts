export interface IBaseResponse {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
}
export interface IResponseService<T> {
  success: boolean;
  data: T;
  error: string | null;
}
