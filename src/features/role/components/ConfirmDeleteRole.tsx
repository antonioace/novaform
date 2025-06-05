import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IRoleResponse } from "../types/role.types";

interface ConfirmDeleteRoleProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role?: IRoleResponse;
}

function ConfirmDeleteRole({
  open,
  onClose,
  onConfirm,
  role,
}: ConfirmDeleteRoleProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <p>¿Está seguro que desea eliminar el rol &quot;{role?.name}&quot;?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteRole;
