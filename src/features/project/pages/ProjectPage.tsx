import React, { useEffect, useState } from "react";
import { Button, Container, Pagination, Stack } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import { useGetProjects } from "../hooks/useGetProjects";
import { useCreateProject } from "../hooks/useCreateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { EditProjectModal } from "../components/EditProjectModal";
import {
  ICreateProjectDto,
  IUpdateProjectDto,
  IProjectResponse,
} from "../types/interfaces";

const ProjectPage: React.FC = () => {
  const {
    loading: loadingProjects,
    projects,
    pagination,
    getProjects,
    handlePageChange,
  } = useGetProjects();
  const { loading: loadingCreate, createProject } = useCreateProject();
  const { loading: loadingDelete, deleteProject } = useDeleteProject();
  const { loading: loadingUpdate, updateProject } = useUpdateProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<IProjectResponse | null>(null);

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreateProject = async (data: ICreateProjectDto) => {
    const success = await createProject(data);
    if (success) {
      await getProjects();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const success = await deleteProject(id);
    if (success) {
      await getProjects();
    }
  };

  const handleEditProject = (project: IProjectResponse) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async (id: string, data: IUpdateProjectDto) => {
    const success = await updateProject(id, data);
    if (success) {
      await getProjects();
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Proyectos</h1>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Proyecto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDeleteProject}
            onEdit={handleEditProject}
            loading={loadingDelete}
          />
        ))}
      </div>

      <Stack spacing={2} alignItems="center" className="mt-6">
        <Pagination
          count={Math.ceil(pagination.total / pagination.limit)}
          page={pagination.page || 1}
          onChange={(_, page) => {
            handlePageChange(page);
          }}
          disabled={loadingProjects}
          color="primary"
          size="large"
        />
      </Stack>

      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        loading={loadingCreate}
      />

      <EditProjectModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateProject}
        loading={loadingUpdate}
        project={selectedProject}
      />
    </Container>
  );
};

export default ProjectPage;
