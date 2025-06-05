import { RestService } from './RestService';
import axiosInstance from '@/config/axios.config';

interface User {
  id?: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

class UserService extends RestService<User> {
  constructor() {
    super('users');
  }

  async getUserProfile(): Promise<User> {
    const response = await axiosInstance.get<User>(`/${this.prefix}/profile`);
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await axiosInstance.patch<User>(`/${this.prefix}/profile`, data);
    return response.data;
  }
}

export const userService = new UserService(); 