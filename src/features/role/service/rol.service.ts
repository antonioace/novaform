import { BackendService } from "@/features/shared/service/backend.service";


export interface CreateCatalogueData {
  name: string;
  code: string;
  description: string;
  catalogueTypeId?: string;
  userId?: string;
}

export interface UpdateCatalogueData extends Partial<CreateCatalogueData> {
  id: string;
}

export class RolService extends BackendService {
  private static instance: RolService;

  private constructor() {
    super("/roles");
  }

  public static getInstance(): RolService {
    if (!RolService.instance) {
        RolService.instance = new RolService();
    }
    return RolService.instance;
  }

}

export default RolService.getInstance();
