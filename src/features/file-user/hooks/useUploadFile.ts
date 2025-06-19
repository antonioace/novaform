import { useState } from "react";
import { fileUserService } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const uploadFile = async (file: File): Promise<IFileUserResponse | null> => {
    setLoading(true);
    const response = await fileUserService.uploadFile(file);
    
    if (response.success && response.data) {
      showSuccess("Archivo subido exitosamente");
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al subir el archivo");
      setLoading(false);
      return null;
    }
  };

  return {
    uploadFile,
    loading,
  };
}; 