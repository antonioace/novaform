import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { FiX, FiFileText, FiEdit3 } from 'react-icons/fi';

interface EditFormInfoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (title: string, description: string) => void;
}

const EditFormInfoModal: React.FC<EditFormInfoModalProps> = ({
  open,
  onClose,
  title,
  description,
  onSave,
}) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);

  // Actualizar los valores cuando se abra el modal o cambien las props
  useEffect(() => {
    if (open) {
      setFormTitle(title);
      setFormDescription(description);
    }
  }, [open, title, description]);

  const handleSave = () => {
    onSave(formTitle, formDescription);
    onClose();
  };

  const handleClose = () => {
    // Resetear a los valores originales si se cancela
    setFormTitle(title);
    setFormDescription(description);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-lg"
      }}
    >
      <DialogTitle className="flex justify-between items-center border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiEdit3 className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Editar información del formulario
          </h2>
        </div>
        <IconButton onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="w-5 h-5" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="p-6">
        <div className="space-y-6">
          {/* Título del formulario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFileText className="w-4 h-4 inline mr-2" />
              Nombre del formulario
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej: Encuesta de satisfacción del cliente"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-lg"
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500">
              Este será el título principal de tu formulario
            </p>
          </div>

          {/* Descripción del formulario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe brevemente el propósito de este formulario..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              Una descripción ayuda a los usuarios a entender el contexto del formulario
            </p>
          </div>

         
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#021642" }}
          >
            Guardar cambios
          </button>
        </div>

        {/* Tip */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Usa Ctrl + Enter para guardar rápidamente
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormInfoModal; 