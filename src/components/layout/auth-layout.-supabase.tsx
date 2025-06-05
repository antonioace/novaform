"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import GlobalLoading from "../../features/shared/components/global-loading";
import supabase from "@/config/supabase.config";

export const AuthLayoutSupabase = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser({
          session,
          user: null,
        });

        if (session) {
          router.push("/dashboard/settings");
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser({
        session,
        user: null,
      });

      if (session) {
        router.push("/dashboard/settings");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setUser]);

  if (!isMounted || loading) {
    return <GlobalLoading />;
  }

  if (!user?.session) {
    return <>{children}</>;
  }

  return null;
};
