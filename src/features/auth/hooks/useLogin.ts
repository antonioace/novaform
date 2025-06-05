import { useRouter } from "next/router";
import { useNotification } from "@/contexts/NotificationContext";
import authService from "@/features/auth/services/auth.service";
import { useState } from "react";
import { IAuthResponse } from "../types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const handleLogin = async (email: string, password: string): Promise<IAuthResponse | null> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (!response.success || !response.data) {
        showError(response.error || "Error en el inicio de sesión");
        return null;
      }

      showSuccess("Inicio de sesión exitoso", "Bienvenido de nuevo");
      router.push("/dashboard/settings");
      return response.data;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
