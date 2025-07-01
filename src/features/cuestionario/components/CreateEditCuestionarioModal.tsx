import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm, Control, FieldValues } from "react-hook-form";
import { FormTextInput, FormSelect } from "../../../components/form";
import { ICuestionarioResponse } from "./CuestionarioCard";

interface CuestionarioFormData {
  title: string;
  description: string;
  status: "draft" | "published" | "closed";
}

interface CreateEditCuestionarioModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ICuestionarioResponse>) => Promise<void>;
  loading: boolean;
  cuestionario?: ICuestionarioResponse | null;
  mode: "create" | "edit";
}

const statusOptions = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "closed", label: "Cerrado" },
];

export const CreateEditCuestionarioModal: React.FC<
  CreateEditCuestionarioModalProps
> = ({ open, onClose, onSubmit, loading, cuestionario, mode }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CuestionarioFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "draft",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (mode === "edit" && cuestionario) {
      reset({
        title: cuestionario.title,
        description: cuestionario.description,
        status: cuestionario.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "draft",
      });
    }
  }, [mode, cuestionario, open, reset]);

  const onFormSubmit = async (data: CuestionarioFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error al guardar cuestionario:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogTitle>
          {mode === "create"
            ? "Crear nuevo cuestionario"
            : "Editar cuestionario"}
        </DialogTitle>

        <DialogContent className="mb-8">
          <FormTextInput
            control={control as unknown as Control<FieldValues>}
            fieldName="title"
            label="Título del cuestionario"
            required
            disabled={loading}
            placeholder="Ej: Encuesta de satisfacción del cliente"
            rules={{ required: "El título es requerido" }}
          />

          <FormTextInput
            control={control as unknown as Control<FieldValues>}
            fieldName="description"
            label="Descripción"
            disabled={loading}
            multiline
            rows={3}
            placeholder="Describe brevemente el propósito de este cuestionario..."
          />

          <FormSelect
            control={control as unknown as Control<FieldValues>}
            fieldName="status"
            label="Estado"
            disabled={loading}
            options={statusOptions}
            optionLabel="label"
            optionValue="value"
            required
          />
        </DialogContent>

        <DialogActions className="p-4">
          <Button onClick={onClose} disabled={loading} color="inherit">
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={loading || !isValid}
            variant="contained"
            style={{ backgroundColor: "#021642" }}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading
              ? mode === "create"
                ? "Creando..."
                : "Guardando..."
              : mode === "create"
              ? "Crear cuestionario"
              : "Guardar cambios"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
