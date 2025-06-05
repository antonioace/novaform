import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { IUserResponse } from "../types/user.types";

interface ConfirmUserStatusProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: IUserResponse | null;
  isActive: boolean;
}

function ConfirmUserStatus({
  open,
  onClose,
  onConfirm,
  user,
  isActive,
}: ConfirmUserStatusProps) {
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
        ¿Estás seguro de que deseas {isActive ? "activar" : "desactivar"} al usuario &quot;
        {user?.username}&quot;?
      </DialogTitle>
      <DialogContent sx={{ padding: "0 24px 16px", textAlign: "center" }}>
        <p className="text-gray-600 text-sm">
          {isActive
            ? "El usuario podrá acceder al sistema nuevamente."
            : "El usuario no podrá acceder al sistema hasta que sea reactivado."}
        </p>
      </DialogContent>
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
          color={isActive ? "success" : "error"}
          variant="contained"
          sx={{
            fontSize: "12px",
            textTransform: "none",
            padding: "6px 16px",
          }}
        >
          {isActive ? "Activar" : "Desactivar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmUserStatus; 