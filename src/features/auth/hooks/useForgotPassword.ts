import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import authService from "@/features/auth/services/auth.service";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleForgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    const response = await authService.resetPassword(email);
    
    if (response.success) {
      showSuccess("Correo de recuperación enviado exitosamente. Revisa tu bandeja de entrada.");
      setIsLoading(false);
      return true;
    }
    
    showError(response.error || "Error al enviar el correo de recuperación");
    setIsLoading(false);
    return false;
  };

  return { 
    handleForgotPassword, 
    isLoading,
    forgotPasswordLoading: isLoading // Alias para mantener consistencia
  };
}; 