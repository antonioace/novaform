import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import authService from "@/features/auth/services/auth.service";

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleUpdatePassword = async (
    newPassword: string
  ): Promise<boolean> => {
    setIsLoading(true);
    const response = await authService.updatePassword(newPassword);

    if (response.success) {
      showSuccess("Contraseña actualizada exitosamente");
      setIsLoading(false);
      return true;
    }

    showError(response.error || "Error al actualizar la contraseña");
    setIsLoading(false);
    return false;
  };

  return {
    handleUpdatePassword,
    isLoading,
    updatePasswordLoading: isLoading, // Alias para mantener consistencia
  };
};
