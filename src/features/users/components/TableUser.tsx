import React from "react";
import ServerSideDataTable from "@/components/table/ServerSideDataTable";
import { IconButton, Tooltip, Chip } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { Column } from "@/features/shared";
import { IUserResponse } from "../types/user.types";
import dayjs from "dayjs";

interface TableUserProps {
  onEdit: (user: IUserResponse) => void;
  data: IUserResponse[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  limit: number;
}

function TableUser({ onEdit, data, onPageChange, page, total, loading, limit }: TableUserProps) {
  const columns: Column[] = [
    {
      id: "username",
      label: "Nombre de usuario",
      key: "username",
    },
    {
      id: "email",
      label: "Correo electrónico",
      key: "email",
    },
    {
      id: "status",
      label: "Estado",
      key: "status",
      format: (value: unknown) => {
        const user = value as IUserResponse;
        return (
          <Chip
            label={user?.status === "1" ? "Activo" : "Inactivo"}
            color={user?.status === "1" ? "success" : "default"}
            size="small"
          />
        );
      },
    },
    {
      id: "updatedAt",
      label: "Fecha de actualización",
      key: "updatedAt",
      format: (value: unknown) => {
        const user = value as IUserResponse;
        return <span>{dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      id: "actions",
      label: "Acciones",
      key: "actions",
      format: (value: unknown) => {
        const user = value as IUserResponse;
        return (
          <div className="flex items-center gap-2">
            <Tooltip title="Editar">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(user)}
              >
                <FiEdit2 className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ServerSideDataTable
        columns={columns}
        data={data}
        totalItems={total}
        page={page}
        rowsPerPage={limit}
        onPageChange={onPageChange}
        onRowsPerPageChange={() => {}}
        onSortChange={() => {}}
        loading={loading}
      />
    </div>
  );
}

export default TableUser;
