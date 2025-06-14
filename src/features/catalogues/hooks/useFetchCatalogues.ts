import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import catalogueService from "@/features/catalogues/services/catalogue.service";
import { ICatalogueResponse } from "../types/catalogue.types";

export const useFetchCatalogues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [catalogues, setCatalogues] = useState<ICatalogueResponse[]>([]);
  const { showSuccess, showError } = useNotification();

  const fetchCatalogues = async (params: Record<string, string> = {}): Promise<ICatalogueResponse[] | null> => {
    setIsLoading(true);
    try {
      const response = await catalogueService.getCatalogues(params);
      
      if (response.success && response.data) {
        setCatalogues(response.data);
        showSuccess("Catálogos cargados exitosamente");
        return response.data;
      } else {
        showError(response.error || "Error al cargar los catálogos");
        setCatalogues([]);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const searchCatalogues = async (searchParams: {
    name?: string;
    code?: string;
    description?: string;
    catalogueTypeId?: string;
    page?: number;
    limit?: number;
  }): Promise<ICatalogueResponse[] | null> => {
    setIsLoading(true);
    try {
      const response = await catalogueService.searchCatalogues(searchParams);
      
      if (response.success && response.data) {
        setCatalogues(response.data);
        showSuccess("Búsqueda completada exitosamente");
        return response.data;
      } else {
        showError(response.error || "Error en la búsqueda de catálogos");
        setCatalogues([]);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    fetchCatalogues,
    searchCatalogues,
    catalogues,
    isLoading,
    fetchCataloguesLoading: isLoading // Alias para mantener consistencia
  };
}; 