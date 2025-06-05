import { AxiosInstance } from "axios";
import { IResponseService } from "@/features/shared";
import axiosInstance from "@/config/axios.config";

export abstract class BackendService {
  prefix: string;
  api: AxiosInstance;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.api = axiosInstance;
  }

  async get<T>(
    path: string = "",
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    try {
      const { data } = await this.api.get<T>(`${this.prefix}${path}`, {
        params,
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

  async post<T, D>(
    path: string = "",
    body: D,
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    try {
      const { data } = params
        ? await this.api.post<T>(`${this.prefix}${path}`, body, { params })
        : await this.api.post<T>(`${this.prefix}${path}`, body);

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

  async put<T, D>(
    path: string = "",
    body: D,
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    try {
      const { data } = params
        ? await this.api.put<T>(`${this.prefix}${path}`, body, { params })
        : await this.api.put<T>(`${this.prefix}${path}`, body);

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

  async delete<T>(path: string = ""): Promise<IResponseService<T | null>> {
    try {
      const { data } = await this.api.delete<T>(`${this.prefix}${path}`);

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

  async create<T, D>(
    path: string = "",
    body: D,
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    return this.post<T, D>(path, body, params);
  }

  async update<T, D>(
    path: string = "",
    body: D,
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    return this.put<T, D>(path, body, params);
  }
  async getById<T>(
    path: string = "",
    id: string
  ): Promise<IResponseService<T | null>> {
    return this.get<T>(`${path}/${id}`);
  }
  async getAll<T>(
    path: string = "",
    params: Record<string, string> = {}
  ): Promise<IResponseService<T | null>> {
    return this.get<T>(path, params);
  }
}
