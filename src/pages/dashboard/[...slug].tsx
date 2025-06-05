import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";
import SettingsPage from "@/features/settings/pages/settings-page";
import UsersPage from "@/features/users/pages/user-page";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

function DashboardContentPage() {
  const router = useRouter();

  /*   if (!router.isReady) {
    return <div>Cargando...</div>;
  }
   */
  const { slug } = router.query;

  if (!slug) {
    return <ProgressSpinner />;
  }

  const renderPageContent = () => {
    const slugArray = Array.isArray(slug) ? slug : slug.split("/");
    const principalRoute = slugArray[0];
    console.log("principalRoute", principalRoute);
    switch (principalRoute) {
      case "settings":
        return <SettingsPage />;
      case "users":
        return <UsersPage />;
      default:
        return <div>No se encontró la página</div>;
    }
  };
  return <>{renderPageContent()}</>;
}
DashboardContentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};
export default DashboardContentPage;
