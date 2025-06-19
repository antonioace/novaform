import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { TbTrash } from "react-icons/tb";
import FileTypeIcon from "./FileTypeIcon";
import { FileType } from "../types/file-user.types";
import { getFileTypeLabel } from "../utils";
import { useFileSizes } from "../hooks";
import CustomAccordion from "@/features/shared/components/CustomAccordion";

interface FileItem {
  name: string;
  originalUrl: string;
  size: string;
  files: number;
  fileType: FileType;
  modified: string;
  image?: string;
}

interface FileDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fileItem: FileItem | null;
  onDelete?: (item: FileItem) => void;
}

const FileDetailsDrawer: React.FC<FileDetailsDrawerProps> = ({
  isOpen,
  onClose,
  fileItem,
  onDelete,
}) => {
  const { getFileSize } = useFileSizes();
  const [calculatedSize, setCalculatedSize] = useState<string>("N/A");

  // Calcular el tamaño del archivo cuando se abre el drawer
  useEffect(() => {
    if (fileItem && isOpen && fileItem.originalUrl) {
      // Calculamos el tamaño usando la URL original del archivo
      getFileSize(fileItem.originalUrl).then(size => {
        setCalculatedSize(size);
      });
    } else {
      setCalculatedSize("N/A");
    }
  }, [fileItem, isOpen, getFileSize]);

  if (!fileItem) return null;

  const eliminarArchivo = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete?.(fileItem);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: "320px", p: 0 },
      }}
    >
      <div className="flex flex-col gap-2 bg-[#fff] overflow-hidden flex-1">
        <div className="flex bg-white px-5 py-2">
          <h3 className="text-lg font-semibold">Información del archivo</h3>
        </div>
        <div className="flex flex-col gap-2 bg-[#f4f6f8] overflow-auto flex-1">
          <div className="flex flex-col p-5">
            <div className="rounded-[10px] min-w-[280px] min-h-[210px] max-w-[280px] max-h-[210px]">
              {fileItem.fileType === FileType.IMAGE ? (
                <img
                  src={
                    fileItem.image ||
                    "https://assets.minimals.cc/public/assets/images/mock/cover/cover-18.webp"
                  }
                  width={280}
                  height={210}
                  style={{
                    objectFit: "cover",
                    aspectRatio: "4/3",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  alt={fileItem?.name}
                />
              ) : (
                <div className="w-[280px] h-[210px] flex items-center justify-center bg-gray-50 rounded-[10px] border border-gray-200">
                  <FileTypeIcon
                    fileType={fileItem.fileType}
                    className="w-20 h-20"
                  />
                </div>
              )}
            </div>
          </div>
          <h3 className="text-[16px] px-5 font-semibold text-[#2f373f]">
            {fileItem?.name}
          </h3>
          <div className="px-5 py-4">
            <hr
              style={{
                border: "0.1px dashed #919eab33",
                padding: "0px 20px",
              }}
            />
          </div>

          <CustomAccordion
            title={
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Propiedades
              </span>
            }
            styles={{
              container: {
                background: "transparent",
                border: "none",
                padding: "0px 20px 0px 20px",
              },
              header: {
                padding: "10px 0px",
              },
              content: {
                padding: "10px 0px",
              },
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="w-[80px] text-xs text-[#637381]">Tamaño</span>
                <span className="text-xs text-[#1c252e] font-normal">
                  {calculatedSize}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-[80px] text-xs text-[#637381]">Fecha</span>
                <span className="text-xs text-[#1c252e] font-normal">
                  {fileItem.modified || "24 May 2025 12:25 Am"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-[80px] text-xs text-[#637381]">Tipo</span>
                <span className="text-xs text-[#1c252e] font-normal">
                  {getFileTypeLabel(fileItem.fileType)}
                </span>
              </div>
            
            </div>
          </CustomAccordion>
        </div>
        <div className="p-5 w-full flex justify-center items-center">
          <button
            className="bg-red-500 text-white p-3 rounded-lg cursor-pointer w-full font-bold flex items-center justify-center gap-2
            hover:bg-red-600 transition-all duration-300"
            onClick={(e) => {
              eliminarArchivo(e);
            }}
          >
            <TbTrash className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default FileDetailsDrawer;
