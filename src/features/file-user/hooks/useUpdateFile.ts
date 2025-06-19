import { useState } from "react";
import { fileUserService, IUpdateFileUserDto } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useUpdateFile = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const updateFile = async (id: string, updateData: IUpdateFileUserDto): Promise<IFileUserResponse | null> => {
    setLoading(true);
    const response = await fileUserService.updateFile(id, updateData);
    
    if (response.success && response.data) {
      showSuccess("Archivo actualizado exitosamente");
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al actualizar el archivo");
      setLoading(false);
      return null;
    }
  };

  return {
    updateFile,
    loading,
  };
}; 