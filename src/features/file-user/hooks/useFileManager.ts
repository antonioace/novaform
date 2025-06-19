import { useState, useEffect, useMemo } from "react";
import { useGetMyFiles, useDeleteFile, useUploadFile } from "./index";
import { FileType, IFileUserResponse } from "../types/file-user.types";
import { getFileTypeFromUrl } from "../utils";

export const useFileManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<IFileUserResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<FileType[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Hooks para manejo de archivos
  const { getMyFiles, myFiles, loading: loadingFiles } = useGetMyFiles();
  const { deleteFile, loading: loadingDelete } = useDeleteFile();
  const { uploadFile, loading: loadingUpload } = useUploadFile();

  // Cargar archivos al montar el componente
  useEffect(() => {
    getMyFiles();
  }, []);

  // Filtrar archivos basado en el término de búsqueda y tipos seleccionados
  const filteredFiles = useMemo(() => {
    let filtered = myFiles;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(file =>
        file.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipos seleccionados
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(file => {
        const fileType = getFileTypeFromUrl(file.url);
        return selectedTypes.includes(fileType);
      });
    }

    return filtered;
  }, [myFiles, searchTerm, selectedTypes]);

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      await uploadFile(file);
    }
    // Recargar la lista después de subir
    getMyFiles();
    setIsUploadModalOpen(false);
  };

  const handleFolderClick = (file: IFileUserResponse) => {
    setSelectedFile(file);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFile(null);
  };

  const handleDeleteFile = async (fileItem: IFileUserResponse) => {
    if (fileItem.id) {
      const result = await deleteFile(fileItem.id);
      if (result) {
        // Recargar la lista después de eliminar
        getMyFiles();
        handleCloseDrawer();
      }
    }
  };

  const handleDeleteFromCard = async (file: IFileUserResponse) => {
    if (file.id) {
      const result = await deleteFile(file.id);
      if (result) {
        // Recargar la lista después de eliminar
        getMyFiles();
      }
    }
  };

  const handleCopyLink = (file: IFileUserResponse) => {
    if (file.url) {
      navigator.clipboard.writeText(file.url);
    }
  };

  return {
    // Estados
    searchTerm,
    setSearchTerm,
    selectedFile,
    isDrawerOpen,
    selectedTypes,
    setSelectedTypes,
    isUploadModalOpen,
    setIsUploadModalOpen,
    
    // Datos
    files: filteredFiles,
    
    // Loading states
    loadingFiles,
    loadingDelete,
    loadingUpload,
    
    // Handlers
    handleUpload,
    handleFolderClick,
    handleCloseDrawer,
    handleDeleteFile,
    handleDeleteFromCard,
    handleCopyLink,
    
    // Refresh function
    refreshFiles: getMyFiles,
  };
}; 