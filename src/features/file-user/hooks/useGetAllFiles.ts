import { useState } from "react";
import { fileUserService } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useGetAllFiles = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<IFileUserResponse[]>([]);
  const { showError } = useNotification();

  const getAllFiles = async (): Promise<IFileUserResponse[] | null> => {
    setLoading(true);
    const response = await fileUserService.getAllFiles();
    
    if (response.success && response.data) {
      setFiles(response.data);
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al obtener los archivos");
      setLoading(false);
      return null;
    }
  };

  return {
    getAllFiles,
    files,
    loading,
  };
}; 