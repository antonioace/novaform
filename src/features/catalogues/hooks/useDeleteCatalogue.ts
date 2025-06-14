import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import catalogueService from "@/features/catalogues/services/catalogue.service";

export const useDeleteCatalogue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const deleteCatalogue = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await catalogueService.deleteCatalogue(id);
      
      if (response.success) {
        showSuccess("Catálogo eliminado exitosamente");
        return true;
      } else {
        showError(response.error || "Error al eliminar el catálogo");
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    deleteCatalogue,
    isLoading,
    deleteCatalogueLoading: isLoading // Alias para mantener consistencia
  };
}; 