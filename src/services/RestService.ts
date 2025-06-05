import axiosInstance from '@/config/axios.config';
import { AxiosResponse } from 'axios';

export class RestService<T> {
  protected prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  async getAll(): Promise<T[]> {
    const response: AxiosResponse<T[]> = await axiosInstance.get(`/${this.prefix}`);
    return response.data;
  }

  async getById(id: string | number): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(`/${this.prefix}/${id}`);
    return response.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(`/${this.prefix}`, data);
    return response.data;
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(`/${this.prefix}/${id}`, data);
    return response.data;
  }

  async delete(id: string | number): Promise<void> {
    await axiosInstance.delete(`/${this.prefix}/${id}`);
  }

  async patch(id: string | number, data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.patch(`/${this.prefix}/${id}`, data);
    return response.data;
  }
} 