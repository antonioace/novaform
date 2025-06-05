import { useNotification } from "@/contexts/NotificationContext";
import authService from "@/features/auth/services/auth.service";
import { useState } from "react";
import { IAuthResponse, RegisterData } from "../types";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleRegister = async (
    userData: RegisterData
  ): Promise<IAuthResponse | null> => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      if (response.success) {
        showSuccess("Registro exitoso");

        return response.data;
      } else {
        showError("Error en el registro");
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading };
};
