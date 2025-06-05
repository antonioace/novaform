import React, { useState } from "react";
import { Button } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { IRoleResponse } from "../types/role.types";
import TableRole from "./TableRole";
import RoleForm from "./RoleForm";
import ConfirmDeleteRole from "./ConfirmDeleteRole";

function ContentRole() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [roleSelected, setRoleSelected] = useState<IRoleResponse | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRoleSelected(null);
  };

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setRoleSelected(null);
  };

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const handleEdit = (role: IRoleResponse) => {
    setRoleSelected(role);
    handleOpen();
  };

  const handleDelete = (role: IRoleResponse) => {
    setRoleSelected(role);
    handleOpenDelete();
  };

  const handleConfirmDelete = () => {
    if (roleSelected) {
      console.log("Eliminando rol:", roleSelected);
      handleCloseDelete();
    }
  };

  const handleAddPermission = (role: IRoleResponse) => {
    console.log("Añadiendo permisos al rol:", role);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Administración de Roles</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleOpen}
          >
            Agregar
          </Button>
        </div>
      </div>

      <TableRole
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddPermission={handleAddPermission}
      />

      <RoleForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        role={roleSelected || undefined}
      />

      <ConfirmDeleteRole
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        role={roleSelected || undefined}
      />
    </div>
  );
}

export default ContentRole;
