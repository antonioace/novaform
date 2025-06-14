import { useState } from 'react';
import { projectService } from '../services/project.service';
import { useNotification } from '../../../contexts/NotificationContext';

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const deleteProject = async (id: string) => {
    setLoading(true);
    const response = await projectService.deleteProject(id);
    if (response.success) {
      showNotification('success', 'Proyecto eliminado exitosamente');
    } else {
      showNotification('error', 'Error al eliminar el proyecto');
    }
    setLoading(false);
    return response.success;
  };

  return {
    loading,
    deleteProject
  };
}; 