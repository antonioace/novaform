import React, { useState } from "react";
import { FaEllipsisV, FaTrash, FaLink, FaDownload, FaCopy } from "react-icons/fa";
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
      className="border-primary-border relative flex w-[200px] cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-all hover:shadow-md"
      onClick={onClick}
    >
      {/* Icono del archivo/carpeta */}
      <div className="flex h-[120px] items-center justify-center rounded-lg bg-gray-100">
        <FileTypeIcon fileType={fileType} className="w-12 h-12" />
      </div>

      {/* Información del archivo/carpeta */}
      <div className="flex flex-col gap-2">
        {/* Nombre */}
        <div className="flex items-center justify-between">
          <Tooltip title={name}>
            <p className="truncate text-sm font-semibold text-gray-800">
              {name}
            </p>
          </Tooltip>

          {/* Menú de opciones */}
          <IconButton
            size="small"
            onClick={handleMenuClick}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <FaEllipsisV size={12} />
          </IconButton>
        </div>

        {/* Información adicional */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">
            {fileType === FileType.FOLDER ? `${files} archivos` : size}
          </p>

          {fileType === FileType.FOLDER && (
            <p className="text-xs text-gray-400">{size}</p>
          )}
        </div>
      </div>

      {/* Menú contextual */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {onCopyLink && (
          <MenuItem onClick={handleCopyLink}>
            <FaLink className="mr-2" size={14} />
            Copiar enlace
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem onClick={handleDelete}>
            <FaTrash className="mr-2" size={14} />
            Eliminar
          </MenuItem>
        )}
      </Menu>
      <div className="flex flex-col w-full">
        <button className="bg-[#121212] text-white text-primary-text rounded-md p-2 flex items-center justify-center"
        onClick={handleCopyLink}
        >
          <FaCopy className="mr-2" size={14} />
          Copiar enlace
        </button>
      </div>
    </div>
  );
};

export default FolderCard;
