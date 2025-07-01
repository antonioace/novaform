import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";
import CuestionarioList from "@/features/cuestionario/pages/CuestionarioList";
import React from "react";
function index() {
  return <CuestionarioList />;
}
index.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};
export default index;
