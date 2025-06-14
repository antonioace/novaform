import { useState } from "react";
import { projectService } from "../services/project.service";
import { useNotification } from "../../../contexts/NotificationContext";
import {
  IProjectByFiltersResponse,
  IProjectResponse,
} from "../types/interfaces";

export const useGetProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<IProjectResponse[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });
  const { showNotification } = useNotification();

  const getProjects = async (page = 1, limit = pagination.limit) => {
    setLoading(true);
    try {
      const response = await projectService.getProjectByIdUser(page, limit);
      if (response.success && response.data) {
        const projectResponse = response.data as IProjectByFiltersResponse;
        setProjects(projectResponse?.data || []);
        setPagination(projectResponse.pagination);
      } else {
        showNotification("error", "Error al cargar los proyectos");
        setProjects([]);
      }
    } catch {
      showNotification("error", "Error al cargar los proyectos");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    getProjects(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    getProjects(1, newLimit);
  };

  return {
    loading,
    projects,
    pagination,
    getProjects,
    handlePageChange,
    handleLimitChange,
  };
};
