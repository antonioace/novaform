import { useState } from "react";
import { fileUserService } from "../services/file-user.service";
import { useNotification } from "@/contexts/NotificationContext";
import { IFileUserResponse } from "../types/file-user.types";

export const useGetMyFiles = () => {
  const [loading, setLoading] = useState(false);
  const [myFiles, setMyFiles] = useState<IFileUserResponse[]>([]);
  const { showError } = useNotification();

  const getMyFiles = async (params: Record<string, string> = {}): Promise<IFileUserResponse[] | null> => {
    setLoading(true);
    const response = await fileUserService.getMyFiles(params);
    
    if (response.success && response.data) {
      setMyFiles(response.data);
      setLoading(false);
      return response.data;
    } else {
      showError(response.error || "Error al obtener mis archivos");
      setLoading(false);
      return null;
    }
  };

  return {
    getMyFiles,
    myFiles,
    loading,
  };
}; 