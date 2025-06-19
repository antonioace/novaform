import React from "react";
import { Modal, Button, CircularProgress } from "@mui/material";
import { useForm, Control, FieldValues } from "react-hook-form";
import { useCreateTemplateContent } from "../hooks/useTemplateContent";
import { CreateTemplateContentDto } from "../types/template-content.types";
import { useNotification } from "@/contexts/NotificationContext";
import { CustomFormTextInput } from "@/components/custom-form";
import { REGISTER_CONTENT_STATIC } from "@/features/builder/utils/estaticos";

interface CreateTemplateContentModalProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export const CreateTemplateContentModal: React.FC<
  CreateTemplateContentModalProps
> = ({ open, onClose, pageId }) => {
  const { create, loading } = useCreateTemplateContent();
  const { showSuccess, showError } = useNotification();
  const { control, handleSubmit, reset } = useForm<CreateTemplateContentDto>({
    defaultValues: {
      pageId,
      content: "",
    },
  });

  const onSubmit = async (data: CreateTemplateContentDto) => {
    const response = await create({
      name: data.name,
      description: data.description,
      pageId,
      content: REGISTER_CONTENT_STATIC.result,
    });
    if (response?.success) {
      showSuccess("Plantilla creada exitosamente");
      reset();
      onClose();
    } else {
      showError(response?.error || "Error al crear la plantilla");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-2xl font-bold mb-4">Crear Nueva Plantilla</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormTextInput
            fieldName="name"
            label="Nombre"
            control={control as unknown as Control<FieldValues>}
            required
            rules={{
              required: "El nombre es requerido",
            }}
          />

          <CustomFormTextInput
            fieldName="description"
            label="Descripción"
            control={control as unknown as Control<FieldValues>}
          />

          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="contained"
              color="inherit"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
