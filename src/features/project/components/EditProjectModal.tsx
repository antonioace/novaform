import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Control } from "react-hook-form";
import { IUpdateProjectDto, IProjectResponse } from "../types/interfaces";
import { FormTextInput } from "../../../components/form/FormTextInput";

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: IUpdateProjectDto) => Promise<void>;
  loading?: boolean;
  project: IProjectResponse | null;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  project,
}) => {
  const { control, handleSubmit, reset } = useForm<IUpdateProjectDto>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (project && open) {
      reset({
        name: project.name,
        code: project.code,
        description: project.description || "",
      });
    }
  }, [project, open, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: IUpdateProjectDto) => {
    if (project) {
      await onSubmit(project.id, data);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Proyecto</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <div className="space-y-4">
            <FormTextInput
              fieldName="name"
              control={control as unknown as Control}
              label="Nombre del Proyecto"
              required
              rules={{
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              }}
            />

            <FormTextInput
              fieldName="code"
              control={control as unknown as Control}
              label="Código"
              required
              rules={{
                required: "El código es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9-_]+$/,
                  message:
                    "El código solo puede contener letras, números, guiones y guiones bajos",
                },
              }}
            />

            <FormTextInput
              fieldName="description"
              control={control as unknown as Control}
              label="Descripción"
              rules={{
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Proyecto"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 