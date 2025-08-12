import { FormSelect } from "@/components/form";
import { Button, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { IUserResponse } from "../types/user.types";
import rolService from "@/features/role/service/rol.service";
import { userService } from "../service/user.service";
import { useNotification } from "@/contexts/NotificationContext";

interface IUpdateUserInfoByAdminProps {
  user?: IUserResponse;
  onSuccess?: () => void;
  onClose?: () => void;
}

interface IRoleResponse {
  id: string;
  name: string;
  description: string;
}

function UpdateUserInfoByAdmin({
  user,
  onSuccess,
  onClose,
}: IUpdateUserInfoByAdminProps) {
  const methods = useForm<{ role: string; status: boolean }>();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<IRoleResponse[]>([]);

  const getRoles = async () => {
    const response = await rolService.get<IRoleResponse[]>();
    if (response.success) {
      setRoles((response?.data as IRoleResponse[]) || []);
    }
  };

  useEffect(() => {
    if (user?.roles?.length) {
      methods.setValue("role", user?.roles[0]?.id);
    }
    if (user?.status) {
      methods.setValue("status", user.status === "1");
    }
    getRoles();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const formData = methods.getValues();
      const response = await userService.update(
        `/${user.id}`,
        {
          ...user,
          status: formData.status ? "1" : "0",
          roleId: formData.role,
        },
        {
          id: user.id,
        }
      );

      if (response.success) {
        showSuccess("Usuario actualizado con éxito");
        onSuccess?.();
        onClose?.();
      } else {
        showError(response.error || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      showError("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <FormSelect
          control={methods.control as unknown as Control<FieldValues>}
          fieldName="role"
          label="Rol"
          options={roles?.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
          optionLabel="label"
          optionValue="value"
        />

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Estado del usuario</label>
          <Switch
            checked={methods.watch("status") || false}
            onChange={(e) => methods.setValue("status", e.target.checked)}
            color="success"
          />
        </div>
      </div>

      <div className="flex pt-4 absolute bottom-0 left-0 right-0 ">
        <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          sx={{
            borderRadius: "0px",
            width: "50%",
            padding: "10px",
          }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            borderRadius: "0px",
            width: "50%",
            padding: "10px",
            color: "red",
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default UpdateUserInfoByAdmin;
