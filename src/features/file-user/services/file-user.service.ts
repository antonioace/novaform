import { BackendService } from "@/features/shared/service/backend.service";
import { IResponseService } from "@/features/shared";
import { IFileUserResponse } from "../types/file-user.types";

export interface ICreateFileUserDto {
  url: string;
  userId: string;
}

export interface IUpdateFileUserDto {
  url?: string;
}

export interface IUploadFileDto {
  file: File;
}

export class FileUserService extends BackendService {
  constructor() {
    super("/file-user");
  }

  // Subir archivo
  async uploadFile(file: File): Promise<IResponseService<IFileUserResponse | null>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await this.api.post<IFileUserResponse>(`${this.prefix}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  // Crear registro de archivo
  async createFileUser(createData: ICreateFileUserDto): Promise<IResponseService<IFileUserResponse | null>> {
    return this.create<IFileUserResponse, ICreateFileUserDto>("", createData);
  }

  // Obtener todos los archivos
  async getAllFiles(): Promise<IResponseService<IFileUserResponse[] | null>> {
    return this.getAll<IFileUserResponse[]>("");
  }

  // Obtener mis archivos
  async getMyFiles(params: Record<string, string> = {}): Promise<IResponseService<IFileUserResponse[] | null>> {
    return this.get<IFileUserResponse[]>("/my-files", params);
  }

  // Obtener archivo por ID
  async getFileById(id: string): Promise<IResponseService<IFileUserResponse | null>> {
    return this.getById<IFileUserResponse>("", id);
  }

  // Actualizar archivo
  async updateFile(id: string, updateData: IUpdateFileUserDto): Promise<IResponseService<IFileUserResponse | null>> {
    return this.update<IFileUserResponse, IUpdateFileUserDto>(`/${id}`, updateData);
  }

  // Eliminar archivo
  async deleteFile(id: string): Promise<IResponseService<IFileUserResponse | null>> {
    return this.delete<IFileUserResponse>(`/${id}`);
  }
}

export const fileUserService = new FileUserService(); 