import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Slider, ClickAwayListener } from "@mui/material";
import UnitSelector from "./UnitSelector";
import { useUnitValue } from "../../hooks/useUnitValue";

interface LayoutSectionProps {
  layoutConfig: {
    display?: string;
    flexDirection?: string;
    alignItems?: string;
    justifyContent?: string;
    gap?: string;
    margin?: string;
    padding?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
  };
  onLayoutChange: (property: string, value: string) => void;
  onLayoutChangeMultiple?: (updates: Record<string, string>) => void;
}

const LayoutSection: React.FC<LayoutSectionProps> = ({
  layoutConfig,
  onLayoutChange,
  onLayoutChangeMultiple,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { parseValue, combineValue } = useUnitValue();

  // Estados para las unidades de cada propiedad
  const [gapUnit, setGapUnit] = useState(
    () => parseValue(layoutConfig.gap || "0px").unit
  );
  const [marginUnit, setMarginUnit] = useState("px");
  const [paddingUnit, setPaddingUnit] = useState("px");

  // Estados para controlar el slider único
  const [activeField, setActiveField] = useState<{
    property: string;
    value: number;
    onChange: (property: string, value: string) => void;
    unit: string;
  } | null>(null);

  const displayOptions = [
    { value: "block", label: "Bloque" },
    { value: "flex", label: "Flex" },
    { value: "grid", label: "Grid" },
    { value: "none", label: "Ninguno" },
  ];

  const directionOptions = [
    { value: "row", label: "→", title: "Fila" },
    { value: "column", label: "↓", title: "Columna" },
    { value: "row-reverse", label: "←", title: "Fila Inversa" },
    { value: "column-reverse", label: "↑", title: "Columna Inversa" },
  ];

  const alignOptions = [
    { value: "flex-start", label: "Izquierda" },
    { value: "center", label: "Centro" },
    { value: "flex-end", label: "Derecha" },
    { value: "stretch", label: "Estirar" },
  ];

  const justifyOptions = [
    { value: "flex-start", label: "Izquierda" },
    { value: "center", label: "Centro" },
    { value: "flex-end", label: "Derecha" },
    { value: "space-between", label: "Espacio Entre" },
    { value: "space-around", label: "Espacio Alrededor" },
  ];

  // Handlers para cambios de valores con unidades
  const handleGapChange = (value: string) => {
    const newValue = combineValue(parseFloat(value) || 0, gapUnit);
    onLayoutChange("gap", newValue);
  };

  const handleGapUnitChange = (unit: string) => {
    setGapUnit(unit);
    const currentNumber = parseValue(layoutConfig.gap || "0px").number;
    const newValue = combineValue(currentNumber, unit);
    onLayoutChange("gap", newValue);
  };

  const handleMarginChange = (property: string, value: string) => {
    const newValue = combineValue(parseFloat(value) || 0, marginUnit);
    onLayoutChange(property, newValue);
  };

  const handleMarginUnitChange = (unit: string) => {
    setMarginUnit(unit);

    // Recolectar todas las actualizaciones en un objeto
    const updates: Record<string, string> = {};

    if (layoutConfig.marginLeft) {
      const newValue = combineValue(
        parseFloat(layoutConfig.marginLeft) || 0,
        unit
      );
      updates.marginLeft = newValue;
    }
    if (layoutConfig.marginRight) {
      const newValue = combineValue(
        parseFloat(layoutConfig.marginRight) || 0,
        unit
      );
      updates.marginRight = newValue;
    }
    if (layoutConfig.marginTop) {
      const newValue = combineValue(
        parseFloat(layoutConfig.marginTop) || 0,
        unit
      );
      updates.marginTop = newValue;
    }
    if (layoutConfig.marginBottom) {
      const newValue = combineValue(
        parseFloat(layoutConfig.marginBottom) || 0,
        unit
      );
      updates.marginBottom = newValue;
    }

    // Aplicar todas las actualizaciones de una vez
    if (Object.keys(updates).length > 0) {
      if (onLayoutChangeMultiple) {
        onLayoutChangeMultiple(updates);
      }
    }
  };

  const handlePaddingChange = (property: string, value: string) => {
    const newValue = combineValue(parseFloat(value) || 0, paddingUnit);
    onLayoutChange(property, newValue);
  };

  const handlePaddingUnitChange = (unit: string) => {
    setPaddingUnit(unit);

    // Recolectar todas las actualizaciones en un objeto
    const updates: Record<string, string> = {};

    if (layoutConfig.paddingLeft) {
      const newValue = combineValue(
        parseFloat(layoutConfig.paddingLeft) || 0,
        unit
      );
      updates.paddingLeft = newValue;
    }
    if (layoutConfig.paddingRight) {
      const newValue = combineValue(
        parseFloat(layoutConfig.paddingRight) || 0,
        unit
      );
      updates.paddingRight = newValue;
    }
    if (layoutConfig.paddingTop) {
      const newValue = combineValue(
        parseFloat(layoutConfig.paddingTop) || 0,
        unit
      );
      updates.paddingTop = newValue;
    }
    if (layoutConfig.paddingBottom) {
      const newValue = combineValue(
        parseFloat(layoutConfig.paddingBottom) || 0,
        unit
      );
      updates.paddingBottom = newValue;
    }

    // Aplicar todas las actualizaciones de una vez
    if (Object.keys(updates).length > 0) {
      if (onLayoutChangeMultiple) {
        onLayoutChangeMultiple(updates);
      }
    }
  };

  // Función para abrir el slider
  const handleFieldClick = (
    property: string,
    value: number,
    onChange: (property: string, value: string) => void,
    unit: string
  ) => {
    setActiveField({ property, value, onChange, unit });
  };

  // Función para cerrar el slider
  const handleCloseSlider = () => {
    setActiveField(null);
  };

  // Componente de input simple que activa el slider
  const ClickableInput = ({ 
    property, 
    value, 
    onChange, 
    unit,
    placeholder = "0" 
  }: {
    property: string;
    value: number;
    onChange: (property: string, value: string) => void;
    unit: string;
    placeholder?: string;
  }) => {
    const isActive = activeField?.property === property;

    return (
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        className={`text-xs text-center border rounded px-1 py-1 w-full cursor-pointer transition-colors ${
          isActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:bg-blue-50'
        }`}
        onChange={(e) => onChange(property, e.target.value)}
        onClick={() => handleFieldClick(property, value, onChange, unit)}
      />
    );
  };

  // Efecto para actualizar el valor activo cuando el campo cambia externamente
  React.useEffect(() => {
    if (activeField) {
      const currentValue = (() => {
        switch (activeField.property) {
          case 'marginTop': return parseValue(layoutConfig.marginTop || "0px").number;
          case 'marginLeft': return parseValue(layoutConfig.marginLeft || "0px").number;
          case 'marginRight': return parseValue(layoutConfig.marginRight || "0px").number;
          case 'marginBottom': return parseValue(layoutConfig.marginBottom || "0px").number;
          case 'margin': return parseValue(layoutConfig.margin || "0px").number;
          case 'paddingTop': return parseValue(layoutConfig.paddingTop || "0px").number;
          case 'paddingLeft': return parseValue(layoutConfig.paddingLeft || "0px").number;
          case 'paddingRight': return parseValue(layoutConfig.paddingRight || "0px").number;
          case 'paddingBottom': return parseValue(layoutConfig.paddingBottom || "0px").number;
          case 'padding': return parseValue(layoutConfig.padding || "0px").number;
          default: return activeField.value;
        }
      })();

      if (currentValue !== activeField.value) {
        setActiveField({ ...activeField, value: currentValue });
      }
    }
  }, [layoutConfig, activeField, parseValue]);

  const gapUnitValue = parseValue(layoutConfig.gap || "0px").unit;
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Diseño
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Display */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Visualización
            </label>
            <div className="grid grid-cols-4 gap-1">
              {displayOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onLayoutChange("display", option.value)}
                  className={`px-2 py-1 text-xs rounded border text-center transition-colors ${
                    layoutConfig.display === option.value
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direction - Solo mostrar si display es flex */}
          {layoutConfig.display === "flex" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <div className="grid grid-cols-4 gap-1">
                {directionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      onLayoutChange("flexDirection", option.value)
                    }
                    title={option.title}
                    className={`px-2 py-1 text-sm rounded border text-center transition-colors ${
                      layoutConfig.flexDirection === option.value
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Align - Solo mostrar si display es flex */}
          {layoutConfig.display === "flex" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Alineación
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">X</span>
                  <select
                    value={layoutConfig.justifyContent || "flex-start"}
                    onChange={(e) =>
                      onLayoutChange("justifyContent", e.target.value)
                    }
                    className="w-full mt-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {justifyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Y</span>
                  <select
                    value={layoutConfig.alignItems || "flex-start"}
                    onChange={(e) =>
                      onLayoutChange("alignItems", e.target.value)
                    }
                    className="w-full mt-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {alignOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Gap - Solo mostrar si display es flex */}
          {layoutConfig.display === "flex" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Espaciado
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={parseValue(layoutConfig.gap || "0px").number}
                  onChange={(e) => handleGapChange(e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
                <UnitSelector
                  selectedUnit={gapUnitValue}
                  onUnitChange={handleGapUnitChange}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw"]}
                />
              </div>
            </div>
          )}

          {/* Spacing */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Espaciado
            </label>

            {/* Margin */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Margen
                </span>
                <UnitSelector
                  selectedUnit={marginUnit}
                  onUnitChange={handleMarginUnitChange}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}
                />
              </div>
              <div className="mt-1 relative">
                <div className="bg-gray-100 rounded p-3">
                  <div className="grid grid-cols-3 gap-1 items-center">
                    <div></div>
                    <ClickableInput
                      property="marginTop"
                      value={parseValue(layoutConfig.marginTop || "0px").number}
                      onChange={handleMarginChange}
                      unit={marginUnit}
                    />
                    <div></div>
                    <ClickableInput
                      property="marginLeft"
                      value={parseValue(layoutConfig.marginLeft || "0px").number}
                      onChange={handleMarginChange}
                      unit={marginUnit}
                    />
                    <ClickableInput
                      property="margin"
                      value={parseValue(layoutConfig.margin || "0px").number}
                      onChange={handleMarginChange}
                      unit={marginUnit}
                    />
                    <ClickableInput
                      property="marginRight"
                      value={parseValue(layoutConfig.marginRight || "0px").number}
                      onChange={handleMarginChange}
                      unit={marginUnit}
                    />
                    <div></div>
                    <ClickableInput
                      property="marginBottom"
                      value={parseValue(layoutConfig.marginBottom || "0px").number}
                      onChange={handleMarginChange}
                      unit={marginUnit}
                    />
                    <div></div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 text-xs text-blue-600 bg-white px-1 -mt-1 ml-2 font-medium">
                  Margen
                </div>
              </div>
            </div>

            {/* Padding */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Relleno
                </span>
                <UnitSelector
                  selectedUnit={paddingUnit}
                  onUnitChange={handlePaddingUnitChange}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw"]}
                />
              </div>
              <div className="mt-1 relative">
                <div className="bg-blue-50 rounded p-3">
                  <div className="grid grid-cols-3 gap-1 items-center">
                    <div></div>
                    <ClickableInput
                      property="paddingTop"
                      value={parseValue(layoutConfig.paddingTop || "0px").number}
                      onChange={handlePaddingChange}
                      unit={paddingUnit}
                    />
                    <div></div>
                    <ClickableInput
                      property="paddingLeft"
                      value={parseValue(layoutConfig.paddingLeft || "0px").number}
                      onChange={handlePaddingChange}
                      unit={paddingUnit}
                    />
                    <ClickableInput
                      property="padding"
                      value={parseValue(layoutConfig.padding || "0px").number}
                      onChange={handlePaddingChange}
                      unit={paddingUnit}
                    />
                    <ClickableInput
                      property="paddingRight"
                      value={parseValue(layoutConfig.paddingRight || "0px").number}
                      onChange={handlePaddingChange}
                      unit={paddingUnit}
                    />
                    <div></div>
                    <ClickableInput
                      property="paddingBottom"
                      value={parseValue(layoutConfig.paddingBottom || "0px").number}
                      onChange={handlePaddingChange}
                      unit={paddingUnit}
                    />
                    <div></div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 text-xs text-blue-600 bg-white px-1 -mt-1 ml-2 font-medium">
                  Relleno
                </div>
              </div>
            </div>
          </div>

          {/* Slider único compartido */}
          {activeField && (
            <ClickAwayListener onClickAway={handleCloseSlider}>
              <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-gray-600 min-w-[80px]">
                    {activeField.property}:
                  </span>
                  <Slider
                    value={activeField.value}
                    min={0}
                    max={1000}
                    step={1}
                    onChange={(_, newValue) => {
                      const updatedField = { ...activeField, value: newValue as number };
                      setActiveField(updatedField);
                      activeField.onChange(activeField.property, String(newValue));
                    }}
                    size="small"
                    className="flex-1"
                    sx={{
                      '& .MuiSlider-track': {
                        backgroundColor: '#3b82f6',
                      },
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#3b82f6',
                      },
                    }}
                  />
                  <span className="text-xs font-medium text-gray-800 min-w-[50px]">
                    {activeField.value}{activeField.unit}
                  </span>
                </div>
              </div>
            </ClickAwayListener>
          )}
        </div>
      )}
    </div>
  );
};

export default LayoutSection;
