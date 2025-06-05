import TabContainer from "@/features/shared/components/TabContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import AnimacionEntrada from "@/features/shared/components/animaciones/AnimacionEntrada";
import ContentCatalogue from "@/features/catalogues/components/ContentCatalogue";
import ContentRole from "@/features/role/components/ContentRole";
import FormBasicUser from "@/features/users/components/FormBasicUser";
import AdminUser from "@/features/users/components/AdminUser";

function CataloguePages() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listaOpciones = [
    {
      key: "general",
      label: "General",
    },
    {
      key: "catalogo",
      label: "Catalogo",
    },
    {
      key: "role",
      label: "Roles",
    },
    {
      key: "user",
      label: "Usuarios",
    },
  ];

  const activeOption = searchParams?.get("tab") || listaOpciones[0].key;

  const handleOptionChange = (key: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("tab", key);
    router.push(`/dashboard/settings?${params.toString()}`);
  };
  // ... existing code ...

  return (
    <>
      <TabContainer
        options={listaOpciones}
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
      >
        <AnimatePresence mode="wait">
          <AnimacionEntrada key={activeOption}>
            {activeOption === "catalogo" && <ContentCatalogue />}
            {activeOption === "role" && <ContentRole />}
            {activeOption === "general" && <FormBasicUser />}
            {activeOption === "user" && <AdminUser />}
          </AnimacionEntrada>
        </AnimatePresence>
      </TabContainer>
    </>
  );
}

export default CataloguePages;
