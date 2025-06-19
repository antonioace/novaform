import React, { useState, useRef } from "react";
import { FaUpload, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { Modal, Box } from "@mui/material";

interface FileItem {
  file: File;
  id: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setFiles(prev => [...prev, ...fileItems]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(item => item.id !== id));
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  const handleUpload = () => {
    const filesToUpload = files.map(item => item.file);
    onUpload(filesToUpload);
    setFiles([]);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
          PDF
        </div>
      );
    } else if (extension === 'xlsx' || extension === 'xls') {
      return (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
          XLS
        </div>
      );
    } else if (extension === 'docx' || extension === 'doc') {
      return (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
          DOC
        </div>
      );
    }
    
    return (
      <div className="w-12 h-12 bg-gray-500 rounded flex items-center justify-center text-white text-xs font-bold">
        FILE
      </div>
    );
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  } as const;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Subir archivos</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors mb-6 ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
                     <div className="flex flex-col items-center">
             <div className="w-20 h-20 mb-4 text-blue-500">
               <FaCloudUploadAlt className="w-full h-full" />
             </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Arrastra o selecciona archivo</h3>
            <p className="text-gray-500">
              Arrastra archivos aquí o haz clic para{' '}
              <span className="text-green-600 underline">explorar</span> en tu computadora.
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-6">
            <div className="space-y-3">
              {files.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {getFileIcon(item.file.name)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(item.file.size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

                 {/* Footer */}
         <div className="flex items-center justify-between pt-4 border-t">
           {files.length > 0 && (
             <button
               onClick={removeAllFiles}
               className="text-gray-500 hover:text-gray-700"
             >
               Eliminar todos
             </button>
           )}
           <div className="flex gap-3 ml-auto">
             <button
               onClick={onClose}
               className="px-4 py-2 text-gray-600 hover:text-gray-800"
             >
               Cancelar
             </button>
             <button
               onClick={handleUpload}
               disabled={files.length === 0}
               className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
             >
               <FaUpload />
               Subir
             </button>
           </div>
         </div>
       </Box>
     </Modal>
   );
};

export default UploadModal; 