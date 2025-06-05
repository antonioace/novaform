import React, { useState } from "react";
import TableCatalogue from "./TableCatalogue";
import { Button } from "@mui/material";
import CatalogueForm from "./CatalogueForm";
import ConfirmDeleteCatalogue from "./ConfirmDeleteCatalogue";
import { ICatalogueResponse } from "../types/catalogue.types";
import { FieldValues } from "react-hook-form";

function ContentCatalogue() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [catalogueSelected, setCatalogueSelected] =
    useState<ICatalogueResponse | null>(null);

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

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const handleEdit = (catalogue: ICatalogueResponse) => {
    setCatalogueSelected(catalogue);
    handleOpen();
  };

  const handleDelete = (catalogue: ICatalogueResponse) => {
    setCatalogueSelected(catalogue);
    handleOpenDelete();
  };

  const handleConfirmDelete = () => {
    if (catalogueSelected) {
      console.log("Eliminando catálogo:", catalogueSelected);
      handleCloseDelete();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Administración</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleOpen}
          >
            Agregar
          </Button>
        </div>
      </div>

      <TableCatalogue onEdit={handleEdit} onDelete={handleDelete} />

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
