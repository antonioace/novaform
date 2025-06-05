import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormTextInput } from "@/components/form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ICatalogueResponse } from "../types/catalogue.types";

interface CatalogueFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FieldValues) => void;
  catalogue?: ICatalogueResponse;
}

function CatalogueForm({
  open,
  onClose,
  onSubmit,
  catalogue,
}: CatalogueFormProps) {
  const { control, handleSubmit, reset, setValue } = useForm();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    handleClose();
  };

  useEffect(() => {
    if (catalogue) {
      setValue("name", catalogue.name);
      setValue("description", catalogue.description);
      setValue("code", catalogue.code);
    }
  }, [catalogue, setValue]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Catálogo</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <FormTextInput
              fieldName="name"
              control={control}
              label="Nombre"
              rules={{ required: "El nombre es requerido" }}
              fullWidth
              size="small"
            />
            <FormTextInput
              fieldName="description"
              control={control}
              label="Descripción"
              rules={{ required: "La descripción es requerida" }}
              fullWidth
              size="small"
            />
            <FormTextInput
              fieldName="code"
              control={control}
              label="Código"
              rules={{ required: "El código es requerido" }}
              fullWidth
              size="small"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-gray-800"
          >
            Guardar
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CatalogueForm;
