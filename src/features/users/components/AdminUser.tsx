import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { IUserResponse } from "../types/user.types";
import { useNotification } from "@/contexts/NotificationContext";
import { userService } from "../service/user.service";
import { useRouter } from "next/router";
import TableUser from "./TableUser";

function AdminUser() {
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotification();
  const router = useRouter();

  const fetchUsers = async () => {
    const response = await userService.get<IUserResponse[]>();
    setLoading(true);
    if (response.success && response.data) {
      setUsers(response.data);
    } else {
      showError(response.error || "Error al cargar usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: IUserResponse) => {
    router.push(`/users/edit/${user.id}`);
  };

  const handleToggleStatus = async (user: IUserResponse, isActive: boolean) => {
    try {
      const response = await userService.update(
        `/${user.id}`,
        {
          ...user,
          status: isActive ? "1" : "0",
        },
        {
          id: user.id,
        }
      );
      if (response.success) {
        showSuccess(
          `Usuario ${user.username} ${
            isActive ? "activado" : "desactivado"
          } con éxito`
        );
        fetchUsers();
      } else {
        showError(
          response.error || "Error al actualizar el estado del usuario"
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      showError("Error al actualizar el estado del usuario");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-[18px] font-semibold mb-4">
        Administración de Usuarios
      </h3>
      <TableUser
        data={users}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}

export default AdminUser;
