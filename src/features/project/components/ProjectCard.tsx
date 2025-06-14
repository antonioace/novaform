import React from "react";
import { useRouter } from "next/navigation";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import { FiEdit, FiTrash2, FiLink, FiMoreVertical } from "react-icons/fi";
import { useNotification } from "../../../contexts/NotificationContext";
import { IProjectResponse } from "../types/interfaces";
import { DeleteProjectModal } from "./DeleteProjectModal";

interface ProjectCardProps {
  project: IProjectResponse;
  onDelete: (id: string) => Promise<void>;
  onEdit: (project: IProjectResponse) => void;
  loading: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
  onEdit,
  loading,
}) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      window.location.origin + "/public/project/" + project.id
    );
    showNotification("success", "Link copiado al portapapeles");
    handleClose();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(project);
    handleClose();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    await onDelete(project.id);
  };

  return (
    <>
      <div
        className="bg-white border border-[#e5e5e5] rounded-lg p-4 cursor-pointer hover:border-[#a1a1a1] 
      hover:shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] relative
      "
        style={{
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/dashboard/builder/${project.id}`);
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold">{project?.name}</h5>
          <div className="flex items-center gap-2">
            <IconButton onClick={handleCopyLink} size="small">
              <FiLink className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={handleMenuClick} size="small">
              <FiMoreVertical className="w-5 h-5" />
            </IconButton>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{project?.description}</p>

        <div className="absolute bottom-4 right-4">
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/responses/${project.id}`);
            }}
          >
            Respuestas
          </Button>
        </div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>
            <FiEdit className="w-4 h-4 mr-2" />
            Editar
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} disabled={loading}>
            <FiTrash2 className="w-4 h-4 mr-2" />
            Eliminar
          </MenuItem>
        </Menu>
      </div>

      <DeleteProjectModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        projectName={project.name}
      />
    </>
  );
};

export default ProjectCard;
