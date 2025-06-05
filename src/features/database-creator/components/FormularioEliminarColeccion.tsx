import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface FormularioEliminarColeccionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nombreColeccion: string;
}

function FormularioEliminarColeccion({
  open,
  onClose,
  onConfirm,
  nombreColeccion,
}: FormularioEliminarColeccionProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          minWidth: "300px",
          padding: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
          padding: "16px 24px",
        }}
      >
        ¿Estás seguro de que deseas eliminar la colección &quot;
        {nombreColeccion}&quot;?
      </DialogTitle>
      <div
        style={{
          padding: "0 24px 16px",
          textAlign: "center",
          color: "#666",
          fontSize: "12px",
        }}
      >
        Esta acción eliminará la colección y todas sus relaciones. Esta acción
        no se puede deshacer.
      </div>
      <DialogActions sx={{ padding: "8px 24px 16px" }}>
        <Button
          onClick={onClose}
          color="inherit"
          sx={{
            fontSize: "12px",
            textTransform: "none",
            padding: "6px 16px",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            fontSize: "12px",
            textTransform: "none",
            padding: "6px 16px",
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormularioEliminarColeccion;
