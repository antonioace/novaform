import { IBaseResponse } from "@/features/shared/base.types";
import { IUserResponse } from "@/features/users/types/user.types";

export interface IFileUserResponse extends IBaseResponse {
  url: string;
  user: IUserResponse;
}
export enum FileType {
  PDF = "pdf",
  XLS = "xls",
  XLSX = "xlsx",
  DOC = "doc",
  DOCX = "docx",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  TEXT = "text",
  FOLDER = "folder",
}
