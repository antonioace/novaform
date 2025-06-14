import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
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
  onRemoveProperties?: (propertiesToRemove: string[]) => void;
}

const LayoutSection: React.FC<LayoutSectionProps> = ({
  layoutConfig,
  onLayoutChange,
  onLayoutChangeMultiple,
  onRemoveProperties,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { parseValue, combineValue } = useUnitValue();

  // Estados para las unidades de cada propiedad
  const [gapUnit, setGapUnit] = useState(
    () => parseValue(layoutConfig.gap || "0px").unit
  );
  const [marginUnit, setMarginUnit] = useState("px");
  const [paddingUnit, setPaddingUnit] = useState("px");

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

  const gapUnitValue = parseValue(layoutConfig.gap || "0px").unit;
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-leftansition-colors"
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
                    <input
                      type="number"
                      placeholder="0"
                      value={parseValue(layoutConfig.marginTop || "0px").number}
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handleMarginChange("marginTop", e.target.value)
                      }
                    />
                    <div></div>
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.marginLeft || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handleMarginChange("marginLeft", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="0"
                      value={parseValue(layoutConfig.margin || "0px").number}
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handleMarginChange("margin", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.marginRight || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handleMarginChange("marginRight", e.target.value)
                      }
                    />
                    <div></div>
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.marginBottom || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handleMarginChange("marginBottom", e.target.value)
                      }
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
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.paddingTop || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handlePaddingChange("paddingTop", e.target.value)
                      }
                    />
                    <div></div>
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.paddingLeft || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handlePaddingChange("paddingLeft", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="0"
                      value={parseValue(layoutConfig.padding || "0px").number}
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handlePaddingChange("padding", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.paddingRight || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handlePaddingChange("paddingRight", e.target.value)
                      }
                    />
                    <div></div>
                    <input
                      type="number"
                      placeholder="0"
                      value={
                        parseValue(layoutConfig.paddingBottom || "0px").number
                      }
                      className="text-xs text-center border border-gray-300 rounded px-1 py-1 w-full"
                      onChange={(e) =>
                        handlePaddingChange("paddingBottom", e.target.value)
                      }
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
        </div>
      )}
    </div>
  );
};

export default LayoutSection;
