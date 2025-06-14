import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Control } from "react-hook-form";
import { ICreateProjectDto } from "../types/interfaces";
import { FormTextInput } from "../../../components/form/FormTextInput";
import { useAuth } from "../../../contexts/AuthContext";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateProjectDto) => Promise<void>;
  loading?: boolean;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const { idUser } = useAuth();
  const { control, handleSubmit, reset } = useForm<ICreateProjectDto>({
    defaultValues: {
      userId: idUser || "",
      name: "",
      code: "",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: ICreateProjectDto) => {
    await onSubmit({
      ...data,
      userId: idUser || "",
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
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
            Crear Proyecto
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
