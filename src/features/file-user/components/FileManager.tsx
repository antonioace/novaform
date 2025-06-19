import React from "react";
import FolderCard from "./FolderCard";
import UploadButton from "./UploadButton";
import UploadModal from "./UploadModal";
import SearchBar from "./SearchBar";
import FileDetailsDrawer from "./FileDetailsDrawer";
import { useFileManager } from "../hooks";
import { IFileUserResponse } from "../types/file-user.types";
import { getFileTypeFromUrl, isImageFile } from "../utils";

// Función para convertir IFileUserResponse a FileItem para el drawer
const adaptFileForDrawer = (file: IFileUserResponse) => {
  const fileName = file.url.split("/").pop() || "Archivo";
  const fileType = getFileTypeFromUrl(file.url);

  return {
    name: fileName,
    originalUrl: file.url,
    size: "N/A",
    files: 1,
    fileType,
    modified:
      typeof file.updatedAt === "string"
        ? file.updatedAt
        : new Date().toLocaleDateString(),
    image: isImageFile(fileName) ? file.url : undefined,
  };
};

const FileManager = () => {
  const {
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
    files,

    // Loading states
    loadingFiles,

    // Handlers
    handleUpload,
    handleFolderClick,
    handleCloseDrawer,
    handleDeleteFile,
    handleDeleteFromCard,
    handleCopyLink,
  } = useFileManager();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[18px] font-semibold mb-4">Gestor de archivos</h1>
        <UploadButton onClick={() => setIsUploadModalOpen(true)} />
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar ..."
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loadingFiles ? (
          <div className="col-span-full text-center py-8">
            <p>Cargando archivos...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p>No hay archivos disponibles</p>
          </div>
        ) : (
          files.map((file, idx) => {
            const fileName = file.url.split("/").pop() || "Archivo";
            const fileType = getFileTypeFromUrl(file.url);

            return (
              <FolderCard
                key={file.id || idx}
                name={fileName}
                size="N/A"
                files={1}
                fileType={fileType}
                onClick={() => handleFolderClick(file)}
                onDelete={() => handleDeleteFromCard(file)}
                onCopyLink={() => handleCopyLink(file)}
              />
            );
          })
        )}
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      <FileDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        fileItem={selectedFile ? adaptFileForDrawer(selectedFile) : null}
        onDelete={() => selectedFile && handleDeleteFile(selectedFile)}
      />
    </div>
  );
};

export default FileManager;
