import { useState } from "react";
import { projectService } from "../services/project.service";
import { useNotification } from "../../../contexts/NotificationContext";
import { IPage } from "@/features/page/types";

export const useGetPageByProjectId = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<IPage | null>(null);
  const { showNotification } = useNotification();

  const getPageByProjectId = async (projectId: string, name: string = "Home") => {
    setLoading(true);
    const response = await projectService.getPageByProjectFilters({
      projectId,
      name,
    });
    console.log("response", response);
    if (response.success && response.data) {
      setPage(response.data);
    } else {
      showNotification("error", `Error al cargar la página ${name}`);
      setPage(null);
    }
    setLoading(false);
  };

  return {
    loading,
    page,
    getPageByProjectId,
  };
};
