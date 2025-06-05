"use client";
import React from "react";
import { mainNavigation } from "@/config/navigation";
import Footer from "./footer";
import AplicationLayoutV2 from "./layout-v2/aplication-layout-v2";
import { SupabaseGuard } from "../guards/SupabaseGuardContainer";

function ContainerLayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseGuard>
      <AplicationLayoutV2 footer={<Footer />} mainNavigation={mainNavigation}>
        {children}
      </AplicationLayoutV2>
    </SupabaseGuard>
  );
}

export default ContainerLayoutAuth;
