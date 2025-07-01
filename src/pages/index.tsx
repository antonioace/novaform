import React from "react";
import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";
import { BackupPage } from "@/features/backup";

export default function Home() {
  return <BackupPage />;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

