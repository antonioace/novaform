import React from "react";
import ServerSideDataTable from "@/components/table/ServerSideDataTable";
import { IconButton, Tooltip } from "@mui/material";
import { FiEdit2,  FiTrash2 } from "react-icons/fi";
import { Column } from "@/features/shared";
import { IRoleResponse } from "../types/role.types";

interface TableRoleProps {
  onEdit: (role: IRoleResponse) => void;
  onDelete: (role: IRoleResponse) => void;

}

function TableRole({ onEdit, onDelete }: TableRoleProps) {
  const columns: Column[] = [
    {
      id: "name",
      label: "Nombre",
      key: "name",
    },
    {
      id: "description",
      label: "Descripción",
      key: "description",
    },
    {
      id: "actions",
      label: "Acciones",
      key: "actions",
      format: (value: unknown) => {
        const role = value as IRoleResponse;
        return (
          <div className="flex items-center gap-2">
            <Tooltip title="Editar">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(role)}
              >
                <FiEdit2 className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Eliminar">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(role)}
              >
                <FiTrash2 className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const data: IRoleResponse[] = [
    {
      id: "1",
      name: "Admin",
      description: "Administrador del sistema",
    },
  ];

  return (
    <div>
      <ServerSideDataTable
        columns={columns}
        data={data}
        totalItems={0}
        page={1}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        onSortChange={() => {}}
      />
    </div>
  );
}

export default TableRole;
