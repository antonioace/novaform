import { SupabaseGuard } from "@/components/guards/SupabaseGuardContainer";
import CuestionarioPage from "@/features/cuestionario/pages/CuestionarioPage";
import React from "react";
function index() {
  return (
    <SupabaseGuard>
      <CuestionarioPage />
    </SupabaseGuard>
  );
}

export default index;
