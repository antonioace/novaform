import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ICatalogueResponse } from "../types/catalogue.types";

interface ConfirmDeleteCatalogueProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  catalogue: ICatalogueResponse | null;
}

function ConfirmDeleteCatalogue({ open, onClose, onConfirm, catalogue }: ConfirmDeleteCatalogueProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <p className="text-gray-600">
          ¿Está seguro que desea eliminar el catálogo &quot;{catalogue?.name}&quot;?
          Esta acción no se puede deshacer.
        </p>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteCatalogue; 