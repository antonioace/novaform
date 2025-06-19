import { useState } from "react";
import { fileUserService, ICreateFileUserDto } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useCreateFileUser = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const createFileUser = async (createData: ICreateFileUserDto): Promise<IFileUserResponse | null> => {
    setLoading(true);
    const response = await fileUserService.createFileUser(createData);
    
    if (response.success && response.data) {
      showSuccess("Archivo creado exitosamente");
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al crear el archivo");
      setLoading(false);
      return null;
    }
  };

  return {
    createFileUser,
    loading,
  };
}; 