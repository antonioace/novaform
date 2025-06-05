import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IRoleResponse } from "../types/role.types";
import { FormTextInput } from "@/components/form";

interface RoleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FieldValues) => void;
  role?: IRoleResponse;
}

function RoleForm({ open, onClose, onSubmit, role }: RoleFormProps) {
  /*  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
    },
  }); */
  const { control, handleSubmit } = useForm();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{role ? "Editar Rol" : "Agregar Rol"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="space-y-4">
            <FormTextInput
              control={control}
              fieldName="name"
              label="Nombre"
              required
              rules={{
                required: "El nombre es requerido",
              }}
            />
            <FormTextInput
              control={control}
              fieldName="description"
              label="Descripción"
              required
              rules={{
                required: "La descripción es requerida",
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            {role ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RoleForm;
