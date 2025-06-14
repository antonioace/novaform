import React, { useState } from "react";
import { MdSettings } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Select } from "antd";
import { estilos } from "../../utils/estilos";

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (property: string, value: string) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [propertyValue, setPropertyValue] = useState<string>("");

  // Preparar opciones para el select de Ant Design
  const selectOptions = estilos.map((estilo) => ({
    value: estilo.value,
    label: estilo.value,
  }));

  const handleClose = () => {
    setSelectedProperty("");
    setPropertyValue("");
    onClose();
  };

  // Función para convertir kebab-case a camelCase
  const kebabToCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  const handleSave = () => {
    if (selectedProperty && propertyValue) {
      // Convertir la propiedad CSS a camelCase
      const camelCaseProperty = kebabToCamelCase(selectedProperty);
      onSave(camelCaseProperty, propertyValue);
      setSelectedProperty("");
      setPropertyValue("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex items-center space-x-2">
          <MdSettings className="w-5 h-5 text-blue-600" />
          <span>Agregar Propiedad CSS</span>
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Propiedad CSS
            </label>
            <Select
              showSearch
              style={{ width: "100%", height: "40px" }}
              placeholder="Buscar y seleccionar propiedad CSS"
              optionFilterProp="label"
              value={selectedProperty}
              onChange={(value) => setSelectedProperty(value)}
              filterOption={(input, option) =>
                option?.label
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              size="large"
              options={selectOptions}
              dropdownStyle={{ zIndex: 1500 }}
              getPopupContainer={() =>
                document.getElementById("root") as HTMLElement
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor
            </label>
            <input
              type="text"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 16px, #ff0000, center, etc."
            />
          </div>

          {/* Vista previa */}
          {selectedProperty && propertyValue && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="text-xs font-medium text-gray-600 mb-1">
                Vista previa:
              </div>
              <div className="text-sm font-mono text-gray-800 space-y-1">
                <div className="text-gray-600">CSS: {selectedProperty}: {propertyValue};</div>
                <div className="text-blue-600">React: {kebabToCamelCase(selectedProperty)}: &quot;{propertyValue}&quot;</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedProperty || !propertyValue}
        >
          Agregar Propiedad
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPropertyModal;
