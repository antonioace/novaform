import TabContainer from "@/features/shared/components/TabContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import AnimacionEntrada from "@/features/shared/components/animaciones/AnimacionEntrada";
import ContentCatalogue from "../components/ContentCatalogue";

function CataloguePages() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listaOpciones = [
    {
      key: "catalogo",
      label: "Catalogo",
    },
    {
      key: "Role",
      label: "Roles",
    },
  ];

  const activeOption = searchParams?.get("tab") || listaOpciones[0].key;

  const handleOptionChange = (key: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("tab", key);
    router.push(`/dashboard/catalogues?${params.toString()}`);
  };

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
            {activeOption === "Role" && <div>Roles</div>}
          </AnimacionEntrada>
        </AnimatePresence>
      </TabContainer>
    </>
  );
}

export default CataloguePages;
