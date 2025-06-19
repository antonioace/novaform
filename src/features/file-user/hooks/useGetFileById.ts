import { useState } from "react";
import { fileUserService } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useGetFileById = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<IFileUserResponse | null>(null);
  const { showError } = useNotification();

  const getFileById = async (id: string): Promise<IFileUserResponse | null> => {
    setLoading(true);
    const response = await fileUserService.getFileById(id);
    
    if (response.success && response.data) {
      setFile(response.data);
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al obtener el archivo");
      setLoading(false);
      return null;
    }
  };

  return {
    getFileById,
    file,
    loading,
  };
}; 