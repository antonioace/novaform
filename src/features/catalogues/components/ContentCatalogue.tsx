import React, { useState, useEffect } from "react";
import TableCatalogue from "./TableCatalogue";
import { Button } from "@mui/material";
import CatalogueForm from "./CatalogueForm";
import ConfirmDeleteCatalogue from "./ConfirmDeleteCatalogue";
import { ICatalogueResponse } from "../types/catalogue.types";
import { FieldValues } from "react-hook-form";
import { useCreateCatalogue, useDeleteCatalogue } from "../hooks";
import { useFetchCataloguesByUserId } from "../hooks/useFetchCataloguesByUserId";
import { useAuth } from "@/contexts/AuthContext";

function ContentCatalogue() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [catalogueSelected, setCatalogueSelected] =
    useState<ICatalogueResponse | null>(null);

  const { user } = useAuth();
  // Hooks de catalogues
  const {
    fetchCataloguesByUserId,
    catalogues,
    fetchCataloguesLoading,
    setPage,
    total,
    page,
  } = useFetchCataloguesByUserId();
  const { createCatalogue, createCatalogueLoading } = useCreateCatalogue();
  const { deleteCatalogue, deleteCatalogueLoading } = useDeleteCatalogue();

  // Cargar catálogos al montar el componente
  useEffect(() => {
    fetchCataloguesByUserId(user?.session?.user?.id || "");
  }, []);

  // Log para debug de catálogos (evita warning del linter)
  useEffect(() => {
    console.log("Catálogos cargados:", catalogues);
  }, [catalogues]);

  // Log para debug de loading states (evita warning del linter)
  useEffect(() => {
    if (deleteCatalogueLoading) {
      console.log("Eliminando catálogo...");
    }
  }, [deleteCatalogueLoading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCatalogueSelected(null);
  };

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setCatalogueSelected(null);
  };

  const handleSubmit = async (data: FieldValues) => {
    const catalogueData = {
      name: data.name,
      code: data.code,
      description: data.description,
      catalogueTypeId: data.catalogueTypeId,
      userId: user?.session?.user?.id,
    };

    const result = await createCatalogue(catalogueData);
    if (result) {
      handleClose();
      fetchCataloguesByUserId(user?.session?.user?.id || ""); // Recargar la lista
    }
  };

  const handleEdit = (catalogue: ICatalogueResponse) => {
    setCatalogueSelected(catalogue);
    handleOpen();
  };

  const handleDelete = (catalogue: ICatalogueResponse) => {
    setCatalogueSelected(catalogue);
    handleOpenDelete();
  };

  const handleConfirmDelete = async () => {
    if (catalogueSelected) {
      const success = await deleteCatalogue(catalogueSelected.id);
      if (success) {
        handleCloseDelete();
        fetchCataloguesByUserId(user?.session?.user?.id || ""); // Recargar la lista
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Administración</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            disabled={createCatalogueLoading}
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleOpen}
          >
            {createCatalogueLoading ? "Cargando..." : "Agregar"}
          </Button>
        </div>
      </div>

      {fetchCataloguesLoading ? (
        <div className="text-center py-4">Cargando catálogos...</div>
      ) : (
        <TableCatalogue
          onEdit={handleEdit}
          onDelete={handleDelete}
          catalogues={catalogues}
          page={page}
          total={total}
          onPageChange={setPage}
        />
      )}

      <CatalogueForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        catalogue={catalogueSelected || undefined}
      />

      <ConfirmDeleteCatalogue
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        catalogue={catalogueSelected}
      />
    </div>
  );
}

export default ContentCatalogue;
