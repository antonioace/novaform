import React, { useState } from "react";
import { FaEllipsisV, FaTrash, FaLink } from "react-icons/fa";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import FileTypeIcon from "./FileTypeIcon";
import { FileType } from "../types/file-user.types";

interface FolderCardProps {
  name: string;
  size: string;
  files: number;
  fileType?: FileType;
  onClick?: () => void;
  onDelete?: () => void;
  onCopyLink?: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  name,
  size,
  files,
  fileType = FileType.FOLDER,
  onClick,
  onDelete,
  onCopyLink,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Evita que se active el onClick del card
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete?.();
  };

  const handleCopyLink = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onCopyLink?.();
  };

  return (
    <div
      className="bg-white border rounded-2xl p-6 flex flex-col gap-4 relative hover:shadow-lg transition-shadow min-w-[220px] cursor-pointer"
      style={{ borderColor: "#EEEEEE" }}
      onClick={onClick}
    >
      {/* Menú de opciones en la esquina superior derecha */}
      <div className="absolute top-3 right-3">
        <IconButton
          onClick={handleMenuClick}
          size="small"
          sx={{
            color: "#919EAB",
            "&:hover": {
              backgroundColor: "rgba(145, 158, 171, 0.1)",
            },
          }}
        >
          <FaEllipsisV className="w-3 h-3" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              minWidth: "150px",
            },
          }}
        >
          <MenuItem onClick={handleCopyLink} sx={{ fontSize: "14px", gap: 1 }}>
            <FaLink className="w-4 h-4 text-blue-500" />
            Copiar link
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{ fontSize: "14px", gap: 1, color: "#f44336" }}
          >
            <FaTrash className="w-4 h-4" />
            Eliminar
          </MenuItem>
        </Menu>
      </div>

      {/* Icono de carpeta y favorito */}
      <div className="flex items-center justify-between">
        <div className="text-3xl">
          <FileTypeIcon fileType={fileType} className="w-8 h-8" />
        </div>
      </div>
      {/* Nombre y detalles */}
      <div>
        <Tooltip title={name} placement="top">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
        </Tooltip>
        <p className="text-gray-500 text-sm">
          {size} · {files} archivos
        </p>
      </div>
    </div>
  );
};

export default FolderCard;
