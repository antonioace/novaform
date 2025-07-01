import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { FiX, FiSearch } from 'react-icons/fi';
import { contentTypes, ContentItem } from './contentTypes';

interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
  onAddElement: (type: string, title: string) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({
  open,
  onClose,
  onAddElement,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar elementos basado en el término de búsqueda
  const filteredContentTypes = contentTypes.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const handleItemClick = (item: ContentItem) => {
    onAddElement(item.type, item.title);
    setSearchTerm(''); // Limpiar búsqueda al cerrar
  };

  const handleClose = () => {
    setSearchTerm(''); // Limpiar búsqueda al cerrar
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        className: "min-h-[80vh]"
      }}
    >
      <DialogTitle className="flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-semibold text-gray-900">
          Añadir elementos de formulario
        </h2>
        <IconButton onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="w-5 h-5" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="p-6">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar elementos de formulario..."
              className="w-full max-w-md pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
                     {searchTerm && (
             <p className="mt-2 text-sm text-gray-500">
               Mostrando resultados para &quot;{searchTerm}&quot;
             </p>
           )}
        </div>

        {/* No Results */}
        {searchTerm && filteredContentTypes.length === 0 && (
          <div className="text-center py-12">
            <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron elementos
            </h3>
            <p className="text-gray-500">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

        {/* Content Categories */}
        {filteredContentTypes.map((category) => (
          <div key={category.category} className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <span>{category.category}</span>
              <span className="ml-2 text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {category.items.length}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="group p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 bg-white"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Actions Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Acciones rápidas:</span>
            {['email', 'short_text', 'multiple_choice', 'date'].map((quickType) => {
              const quickItem = contentTypes
                .flatMap(cat => cat.items)
                .find(item => item.type === quickType);
              
              return quickItem ? (
                <button
                  key={quickType}
                  onClick={() => handleItemClick(quickItem)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {quickItem.title}
                </button>
              ) : null;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentModal; 