import { BackendService } from "@/features/shared/service/backend.service";
import { IResponseService } from "@/features/shared";
import {
  ICatalogueByFiltersResponse,
  ICatalogueResponse,
} from "../types/catalogue.types";

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

export class CatalogueService extends BackendService {
  private static instance: CatalogueService;

  private constructor() {
    super("/catalogues");
  }

  public static getInstance(): CatalogueService {
    if (!CatalogueService.instance) {
      CatalogueService.instance = new CatalogueService();
    }
    return CatalogueService.instance;
  }

  /**
   * Obtener todos los catálogos
   */
  async getCatalogues(
    params: Record<string, string> = {}
  ): Promise<IResponseService<ICatalogueResponse[] | null>> {
    console.log("🔄 Obteniendo catálogos...");

    const response = await this.getAll<ICatalogueResponse[]>("", params);

    if (response.success) {
      console.log("✅ Catálogos obtenidos exitosamente");
    } else {
      console.error("❌ Error al obtener catálogos:", response.error);
    }

    return response;
  }

  /**
   * Obtener un catálogo por ID
   */
  async getCatalogueById(
    id: string
  ): Promise<IResponseService<ICatalogueResponse | null>> {
    console.log(`🔄 Obteniendo catálogo con ID: ${id}...`);

    const response = await this.getById<ICatalogueResponse>("", id);

    if (response.success) {
      console.log("✅ Catálogo obtenido exitosamente");
    } else {
      console.error("❌ Error al obtener catálogo:", response.error);
    }

    return response;
  }

  /**
   * Crear un nuevo catálogo
   */
  async createCatalogue(
    catalogueData: CreateCatalogueData
  ): Promise<IResponseService<ICatalogueResponse | null>> {
    console.log("🔄 Creando nuevo catálogo...");

    const response = await this.create<ICatalogueResponse, CreateCatalogueData>(
      "",
      catalogueData
    );

    if (response.success) {
      console.log("✅ Catálogo creado exitosamente");
    } else {
      console.error("❌ Error al crear catálogo:", response.error);
    }

    return response;
  }

  /**
   * Actualizar un catálogo existente
   */
  async updateCatalogue(
    updateData: UpdateCatalogueData
  ): Promise<IResponseService<ICatalogueResponse | null>> {
    console.log(`🔄 Actualizando catálogo con ID: ${updateData.id}...`);

    const { id, ...catalogueData } = updateData;
    const response = await this.update<
      ICatalogueResponse,
      Omit<UpdateCatalogueData, "id">
    >(`/${id}`, catalogueData);

    if (response.success) {
      console.log("✅ Catálogo actualizado exitosamente");
    } else {
      console.error("❌ Error al actualizar catálogo:", response.error);
    }

    return response;
  }

  /**
   * Eliminar un catálogo
   */
  async deleteCatalogue(id: string): Promise<IResponseService<null>> {
    console.log(`🔄 Eliminando catálogo con ID: ${id}...`);

    const response = await this.delete<null>(`/${id}`);

    if (response.success) {
      console.log("✅ Catálogo eliminado exitosamente");
    } else {
      console.error("❌ Error al eliminar catálogo:", response.error);
    }

    return response;
  }

  /**
   * Buscar catálogos por criterios
   */
  async searchCatalogues(searchParams: {
    name?: string;
    code?: string;
    description?: string;
    catalogueTypeId?: string;
    page?: number;
    limit?: number;
  }): Promise<IResponseService<ICatalogueResponse[] | null>> {
    console.log("🔄 Buscando catálogos...");

    const params = Object.entries(searchParams)
      .filter(([, value]) => value !== undefined && value !== "")
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value as string,
        }),
        {}
      );

    const response = await this.get<ICatalogueResponse[]>("/search", params);

    if (response.success) {
      console.log("✅ Búsqueda de catálogos completada exitosamente");
    } else {
      console.error("❌ Error en la búsqueda de catálogos:", response.error);
    }

    return response;
  }

  /**
   * Obtener catálogos por ID de usuario
   */
  async getCataloguesByUserId(
    userId: string,
    page?: number,
    limit?: number
  ): Promise<IResponseService<ICatalogueByFiltersResponse | null>> {
    const params: Record<string, string> = {
      ...(page && { page: page.toString() }),
      ...(limit && { limit: limit.toString() }),
    };

    const response = await this.get<ICatalogueByFiltersResponse>(
      `/user/${userId}`,
      params
    );
    if (response.success) {
      console.log("✅ Catálogos del usuario obtenidos exitosamente");
    } else {
      console.error(
        "❌ Error al obtener catálogos del usuario:",
        response.error
      );
    }

    return response;
  }
}

export default CatalogueService.getInstance();
