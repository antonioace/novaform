import { useState } from "react";
import { projectService } from "../services/project.service";
import { useNotification } from "../../../contexts/NotificationContext";
import { IUpdateProjectDto } from "../types/interfaces";

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const updateProject = async (
    id: string,
    data: IUpdateProjectDto
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await projectService.updateProject(id, data);
      if (response.success) {
        showNotification("success", "Proyecto actualizado exitosamente");
        return true;
      } else {
        showNotification("error", "Error al actualizar el proyecto");
        return false;
      }
    } catch {
      showNotification("error", "Error al actualizar el proyecto");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateProject,
  };
};
