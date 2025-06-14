import { useRouter } from "next/router";
import { useNotification } from "@/contexts/NotificationContext";
import authService from "@/features/auth/services/auth.service";
import { useState } from "react";
import { IAuthResponse } from "../types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<IAuthResponse | null> => {
    setIsLoading(true);

    const response = await authService.login({ email, password });

    if (!response.success || !response.data) {
      setIsLoading(false);
      showError(response.error || "Error en el inicio de sesión");
      return null;
    }

    showSuccess("Inicio de sesión exitoso");
    setIsLoading(false);
    router.push("/dashboard/settings");
    return response.data;
  };

  return { handleLogin, isLoading };
};
