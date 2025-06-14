import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
  projectName: string;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  projectName,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <FiAlertTriangle className="text-red-500 w-6 h-6" />
          Confirmar Eliminación
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" className="mb-4">
          ¿Estás seguro de que deseas eliminar el proyecto{" "}
          <strong>&quot;{projectName}&quot;</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Esta acción no se puede deshacer. Todos los datos asociados con este
          proyecto se perderán permanentemente.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 