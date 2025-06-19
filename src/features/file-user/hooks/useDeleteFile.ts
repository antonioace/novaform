import { useState } from "react";
import { fileUserService } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useDeleteFile = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const deleteFile = async (id: string): Promise<IFileUserResponse | null> => {
    setLoading(true);
    const response = await fileUserService.deleteFile(id);
    
    if (response.success && response.data) {
      showSuccess("Archivo eliminado exitosamente");
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al eliminar el archivo");
      setLoading(false);
      return null;
    }
  };

  return {
    deleteFile,
    loading,
  };
}; 