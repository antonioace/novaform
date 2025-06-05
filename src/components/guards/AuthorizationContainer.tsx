import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import GlobalLoading from "../../features/shared/components/global-loading";
function AuthorizationContainer({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    if (!user?.session) {
      router.push("/auth/login");
    }
  }, [user?.session, router, isMounted]);
  if (!isMounted) return null;
  if (!user?.session) return <GlobalLoading />;
  return <>{children}</>;
}

export default AuthorizationContainer;
