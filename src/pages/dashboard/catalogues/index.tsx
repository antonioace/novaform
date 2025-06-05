import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";
import CataloguePages from "@/features/catalogues/pages/CataloguePages";
import React from "react";

export default function CataloguesPage() {
  return <CataloguePages />;
}

CataloguesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};
