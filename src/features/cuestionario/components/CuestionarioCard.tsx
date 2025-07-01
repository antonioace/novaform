import React from "react";
import { useRouter } from "next/navigation";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import { FiEdit, FiTrash2, FiLink, FiMoreVertical, FiEye, FiBarChart } from "react-icons/fi";
import { useNotification } from "../../../contexts/NotificationContext";
import { DeleteCuestionarioModal } from "./DeleteCuestionarioModal";
import dayjs from "dayjs";

export interface ICuestionarioResponse {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  responsesCount: number;
}

interface CuestionarioCardProps {
  cuestionario: ICuestionarioResponse;
  onDelete: (id: string) => Promise<void>;
  onEdit: (cuestionario: ICuestionarioResponse) => void;
  loading: boolean;
}

const CuestionarioCard: React.FC<CuestionarioCardProps> = ({
  cuestionario,
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
      window.location.origin + "/public/cuestionario/" + cuestionario.id
    );
    showNotification("success", "Link copiado al portapapeles");
    handleClose();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(cuestionario);
    handleClose();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    await onDelete(cuestionario.id);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Abrir vista previa en nueva ventana
    window.open(`/public/cuestionario/${cuestionario.id}`, '_blank');
    handleClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'closed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Borrador';
      case 'closed':
        return 'Cerrado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <>
      <div
        className="bg-white border border-[#e5e5e5] rounded-lg p-3 cursor-pointer hover:border-[#a1a1a1] 
      hover:shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] relative
      "
        style={{
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/dashboard/cuestionario/${cuestionario.id}`);
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h5 className="text-lg font-bold mb-1">{cuestionario?.title}</h5>
            <p className="text-xs text-gray-500 mb-2">
              Creado: {dayjs(cuestionario.createdAt).format('DD/MM/YYYY HH:mm')}
            </p>
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cuestionario.status)}`}>
              {getStatusText(cuestionario.status)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconButton onClick={handleCopyLink} size="small">
              <FiLink className="w-4 h-4" />
            </IconButton>
            <IconButton onClick={handleMenuClick} size="small">
              <FiMoreVertical className="w-4 h-4" />
            </IconButton>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cuestionario?.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500">
            <span>{cuestionario.responsesCount} respuestas</span>
          </div>
         
        </div>

        <div className="absolute bottom-3 right-3">
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/cuestionario/${cuestionario.id}/resultados`);
            }}
            style={{ backgroundColor: '#021642', fontSize: '0.75rem' }}
            startIcon={<FiBarChart className="w-3 h-3" />}
          >
            Resultados
          </Button>
        </div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handlePreview} sx={{ fontSize: '0.875rem' }}>
            <FiEye className="w-4 h-4 mr-2" />
            Vista previa
          </MenuItem>
          <MenuItem onClick={handleEdit} sx={{ fontSize: '0.875rem' }}>
            <FiEdit className="w-4 h-4 mr-2" />
            Editar
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} disabled={loading} sx={{ fontSize: '0.875rem' }}>
            <FiTrash2 className="w-4 h-4 mr-2" />
            Eliminar
          </MenuItem>
        </Menu>
      </div>

      <DeleteCuestionarioModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        cuestionarioTitle={cuestionario.title}
      />
    </>
  );
};

export default CuestionarioCard; 