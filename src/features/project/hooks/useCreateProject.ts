import { useState } from "react";
import { projectService } from "../services/project.service";
import { useNotification } from "../../../contexts/NotificationContext";
import { ICreateProjectDto } from "../types/interfaces";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const createProject = async (projectData: ICreateProjectDto) => {
    setLoading(true);
    const response = await projectService.createProject(projectData);
    if (response.success) {
      showNotification("success", "Proyecto creado exitosamente");
    } else {
      showNotification("error", "Error al crear el proyecto");
    }
    setLoading(false);
    return response.success;
  };

  return {
    loading,
    createProject,
  };
};
