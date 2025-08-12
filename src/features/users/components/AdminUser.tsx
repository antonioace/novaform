import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { IUserResponse } from "../types/user.types";
import TableUser from "./TableUser";
import CustomDrawer from "@/components/drawers/CustomDrawer";
import { useGetUsers } from "../hooks/useGetUsers";
import UpdateUserInfoByAdmin from "./UpdateUserInfoByAdmin";

function AdminUser() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState<IUserResponse | null>(null);
  const { loading, users, page, limit, getUsers, handlePageChange, total } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, [page]);

  const handleEdit = (user: IUserResponse) => {
    setUser(user);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setUser(null);
  };

  const handleUpdateSuccess = () => {
    getUsers();
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
        onPageChange={handlePageChange}
        page={page}
        loading={loading}
        limit={limit}
        total={total}
      />
      <CustomDrawer
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        title="Editar Usuario"
        stylesContainer={{
          position:"relative"
        }}
      >
        <UpdateUserInfoByAdmin 
          user={user || undefined} 
          onSuccess={handleUpdateSuccess}
          onClose={handleCloseDrawer}
        />
      </CustomDrawer>
    </div>
  );
}

export default AdminUser;
