"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useNotification } from "./NotificationContext";
import authService from "@/features/auth/services/auth.service";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { IAuthResponse, RegisterData } from "@/features/auth/types";

interface AuthContextType {
  user: IAuthResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  setUser: (user: IAuthResponse | null) => void;
  idUser: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  setUser: () => {},
  idUser: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IAuthResponse | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { showSuccess } = useNotification();

  const { handleLogin, isLoading: loginLoading } = useLogin();
  const { handleRegister, isLoading: registerLoading } = useRegister();

  const login = async (email: string, password: string) => {
    const userData = await handleLogin(email, password);
    setUser(userData || null);
  };

  const register = async (userData: RegisterData) => {
    await handleRegister(userData);
  };

  const logout = async () => {
    setLogoutLoading(true);
    const response = await authService.logout();

    if (!response.error) {
      showSuccess("Sesión cerrada exitosamente");
      setUser(null);
      router.push("/auth/login");
    }
    setLogoutLoading(false);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const idUser = user?.session?.user?.id;
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,

        loginLoading,
        registerLoading,
        logoutLoading,
        setUser,
        idUser: idUser || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
