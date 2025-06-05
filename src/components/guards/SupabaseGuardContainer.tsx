import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/config/supabase.config";
import GlobalLoading from "@/features/shared/components/global-loading";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/features/auth/services/auth.service";

interface SupabaseGuardProps {
  children: React.ReactNode;
}

export const SupabaseGuard = ({ children }: SupabaseGuardProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setUser, user } = useAuth();

  useEffect(() => {
    // Obtener la sesión actual
    authService.checkTokenCustomBackend().then((resp) => {
      console.log("PIN PANNNN", resp);
    });
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser({
          session,
          user: null,
        });

        if (!session) {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Suscribirse a cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser({
        session,
        user: null,
      });
      if (!session) {
        router.push("/auth/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <GlobalLoading />;
  }

  if (!user?.session) {
    return <GlobalLoading />;
  }

  return <>{children}</>;
};
