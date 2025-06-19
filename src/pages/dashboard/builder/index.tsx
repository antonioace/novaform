import { SupabaseGuard } from "@/components/guards/SupabaseGuardContainer";
import { BuilderPage } from "@/features/builder/pages/BuilderPage";
import React from "react";
function index() {
  return (
    <SupabaseGuard>
      <BuilderPage />
    </SupabaseGuard>
  );
}

export default index;
