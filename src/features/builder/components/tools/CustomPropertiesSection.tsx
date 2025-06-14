import React, { useState } from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdAdd,
  MdDelete,
  MdSettings,
} from "react-icons/md";
import AddPropertyModal from "./AddPropertyModal";

interface CustomProperty {
  property: string;
  value: string;
}

interface CustomPropertiesSectionProps {
  customProperties: CustomProperty[];
  onCustomPropertyChange: (properties: CustomProperty[]) => void;
}

const CustomPropertiesSection: React.FC<CustomPropertiesSectionProps> = ({
  customProperties,
  onCustomPropertyChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveProperty = (property: string, value: string) => {
    const newProperties = [
      ...customProperties,
      {
        property: property,
        value: value,
      },
    ];
    onCustomPropertyChange(newProperties);
    setModalOpen(false);
  };

  const removeProperty = (index: number) => {
    const newProperties = customProperties.filter((_, i) => i !== index);
    onCustomPropertyChange(newProperties);
  };

  const updateProperty = (
    index: number,
    field: "property" | "value",
    newValue: string
  ) => {
    const newProperties = [...customProperties];
    newProperties[index][field] = newValue;
    onCustomPropertyChange(newProperties);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Propiedades personalizadas
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3">
          {/* Encabezado con ícono */}
          <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-50 rounded-md">
            <MdSettings className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600 font-medium">
              Propiedades CSS personalizadas
            </span>
          </div>

          <div className="space-y-2">
            {customProperties.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <div className="text-xs">Sin propiedades personalizadas</div>
                <div className="text-xs mt-1">
                  Haz click en &quot;Agregar&quot; para crear una
                </div>
              </div>
            ) : (
              customProperties.map((prop, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700 mb-1">
                      {prop.property}
                    </div>
                    <input
                      type="text"
                      value={prop.value}
                      onChange={(e) =>
                        updateProperty(index, "value", e.target.value)
                      }
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Valor de la propiedad"
                    />
                  </div>

                  <button
                    onClick={() => removeProperty(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Eliminar propiedad"
                  >
                    <MdDelete className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 text-xs border border-dashed border-gray-300 rounded text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <MdAdd className="w-3 h-3" />
            <span>Agregar propiedad</span>
          </button>
        </div>
      )}

      {/* Modal para agregar propiedad */}
      <AddPropertyModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProperty}
      />
    </div>
  );
};

export default CustomPropertiesSection;
