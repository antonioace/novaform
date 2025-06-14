import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";
import ProjectPage from "@/features/project/pages/ProjectPage";
import React from "react";

function index() {
  return <ProjectPage />;
}

export default index;
/// Agregale el layout
index.getLayout = (page: React.ReactNode) => (
  <ContainerLayoutAuth>{page}</ContainerLayoutAuth>
);
