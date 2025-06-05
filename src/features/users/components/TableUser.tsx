import React, { useState } from "react";
import ServerSideDataTable from "@/components/table/ServerSideDataTable";
import { IconButton, Tooltip, Switch } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { Column } from "@/features/shared";
import { IUserResponse } from "../types/user.types";
import ConfirmUserStatus from "./ConfirmUserStatus";
import dayjs from "dayjs";

interface TableUserProps {
  onEdit: (user: IUserResponse) => void;
  onToggleStatus: (user: IUserResponse, isActive: boolean) => void;
  data: IUserResponse[];
}

function TableUser({ onEdit, onToggleStatus, data }: TableUserProps) {
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleToggleStatus = (user: IUserResponse, newStatus: boolean) => {
    setSelectedUser(user);
    setIsActive(newStatus);
    setOpenConfirm(true);
  };

  const handleConfirmStatus = () => {
    if (selectedUser) {
      onToggleStatus(selectedUser, isActive);
      setOpenConfirm(false);
      setSelectedUser(null);
    }
  };

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
        console.log("user joderrrrrrrrrr", value);
        console.log("xxxxxxxxxxxxxxxxxxxxxx", user);
        return (
          <Switch
            checked={user?.status === "1" ? true : false}
            onChange={(e) => handleToggleStatus(user, e.target.checked)}
            color="success"
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
        totalItems={0}
        page={1}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        onSortChange={() => {}}
      />
      <ConfirmUserStatus
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmStatus}
        user={selectedUser}
        isActive={isActive}
      />
    </div>
  );
}

export default TableUser;
