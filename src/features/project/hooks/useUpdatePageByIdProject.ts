import { useState } from "react";
import { projectService } from "../services/project.service";
import { useNotification } from "../../../contexts/NotificationContext";
import { IUpdatePageDto } from "@/features/page/types";

export const useUpdatePageByIdProject = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const updatePageByIdProject = async (
    pageData: IUpdatePageDto
  ): Promise<boolean> => {
    setLoading(true);
    const response = await projectService.updatePageByIdProject(pageData);
    setLoading(false);
    if (response.success) {
      showNotification("success", "Página actualizada exitosamente");
      return true;
    } else {
      showNotification("error", "Error al actualizar la página");
      return false;
    }
  };

  return {
    loading,
    updatePageByIdProject,
  };
};
