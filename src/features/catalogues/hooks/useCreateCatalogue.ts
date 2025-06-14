import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import catalogueService from "@/features/catalogues/services/catalogue.service";
import { CreateCatalogueData, ICatalogueResponse } from "../types";

export const useCreateCatalogue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const createCatalogue = async (catalogueData: CreateCatalogueData): Promise<ICatalogueResponse | null> => {
    setIsLoading(true);
    try {
      const response = await catalogueService.createCatalogue(catalogueData);
      
      if (response.success && response.data) {
        showSuccess("Catálogo creado exitosamente");
        return response.data;
      } else {
        showError(response.error || "Error al crear el catálogo");
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    createCatalogue,
    isLoading,
    createCatalogueLoading: isLoading // Alias para mantener consistencia
  };
}; 