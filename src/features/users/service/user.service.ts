import { BackendService } from "@/features/shared/service/backend.service";

export class UserService extends BackendService {
  constructor() {
    super("user");
  }
}

export const userService = new UserService();
