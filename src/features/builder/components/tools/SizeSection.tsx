import React, { useState } from "react";
import { MdExpandMore, MdExpandLess, MdLock, MdLockOpen } from "react-icons/md";
import UnitSelector from "./UnitSelector";
import { useUnitValue } from "../../hooks/useUnitValue";
import { Slider } from "@mui/material";

interface SizeSectionProps {
  sizeConfig: {
    width?: string;
    height?: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    overflow?: string;
  };
  onSizeChange: (property: string, value: string) => void;
}

const SizeSection: React.FC<SizeSectionProps> = ({
  sizeConfig,
  onSizeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLinked, setIsLinked] = useState(false);
  const { parseValue, combineValue } = useUnitValue();

  // Extraer unidades actuales del sizeConfig en tiempo real
  const widthUnit = parseValue(sizeConfig.width || "100%").unit;
  const heightUnit = parseValue(sizeConfig.height || "auto").unit;
  const minWidthUnit = parseValue(sizeConfig.minWidth || "0px").unit;
  const maxWidthUnit = parseValue(sizeConfig.maxWidth || "none").unit;
  const minHeightUnit = parseValue(sizeConfig.minHeight || "0px").unit;
  const maxHeightUnit = parseValue(sizeConfig.maxHeight || "none").unit;

  // Handlers para cambios de valores con unidades
  const handleSizeChange = (property: string, value: string, unit: string) => {
    const newValue = combineValue(parseFloat(value) || 0, unit);
    onSizeChange(property, newValue);
  };

  const handleUnitChange = (property: string, unit: string) => {
    const currentValue = sizeConfig[property as keyof typeof sizeConfig] || "0px";
    const currentNumber = parseValue(currentValue).number;
    const newValue = combineValue(currentNumber, unit);
    onSizeChange(property, newValue);
  };

  const overflowOptions = [
    { value: "visible", label: "👁", title: "Visible" },
    { value: "hidden", label: "🚫", title: "Hidden" },
    { value: "scroll", label: "📜", title: "Scroll" },
    { value: "auto", label: "🔄", title: "Auto" },
  ];
  const unitRanges = {
    px:  { min: 0,   max: 1200, step: 1   },
    '%': { min: 0,   max: 100,  step: 1   },
    em:  { min: 0,   max: 75,   step: 0.1 },
    rem: { min: 0,   max: 75,   step: 0.1 },
    vh:  { min: 0,   max: 100,  step: 1   },
    vw:  { min: 0,   max: 100,  step: 1   },
    auto: null // usa un selector en vez de slider
  };
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Tamaño
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Width & Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Ancho
                </label>
                <UnitSelector
                  selectedUnit={widthUnit}
                  onUnitChange={(unit) => handleUnitChange("width", unit)}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}
                />
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.width || "100%").number}
                onChange={(e) => {
                  handleSizeChange("width", e.target.value, widthUnit);
                  if (isLinked) {
                    handleSizeChange("height", e.target.value, heightUnit);
                  }
                }}
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />

              {widthUnit !== "auto" && unitRanges[widthUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.width || "100%").number}
                  min={unitRanges[widthUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[widthUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[widthUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("width", String(newValue), widthUnit);
                    if (isLinked) {
                      handleSizeChange("height", String(newValue), heightUnit);
                    }
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Alto
                </label>
                <div className="flex items-center space-x-1">
                  <UnitSelector
                    selectedUnit={heightUnit}
                    onUnitChange={(unit) => handleUnitChange("height", unit)}
                    availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}
                  />
                  <button
                    onClick={() => setIsLinked(!isLinked)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title={
                      isLinked
                        ? "Desvincular dimensiones"
                        : "Vincular dimensiones"
                    }
                  >
                    {isLinked ? (
                      <MdLock className="w-3 h-3 text-blue-500" />
                    ) : (
                      <MdLockOpen className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.height || "auto").number}
                onChange={(e) => {
                  handleSizeChange("height", e.target.value, heightUnit);
                  if (isLinked) {
                    handleSizeChange("width", e.target.value, widthUnit);
                  }
                }}
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              
              {heightUnit !== "auto" && unitRanges[heightUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.height || "auto").number}
                  min={unitRanges[heightUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[heightUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[heightUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("height", String(newValue), heightUnit);
                    if (isLinked) {
                      handleSizeChange("width", String(newValue), widthUnit);
                    }
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {/* Min Width & Min Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Min W
                </label>
                <UnitSelector
                  selectedUnit={minWidthUnit}
                  onUnitChange={(unit) => handleUnitChange("minWidth", unit)}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}

                />
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.minWidth || "0px").number}
                onChange={(e) =>
                  handleSizeChange("minWidth", e.target.value, minWidthUnit)
                }
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              
              {minWidthUnit !== "auto" && unitRanges[minWidthUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.minWidth || "0px").number}
                  min={unitRanges[minWidthUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[minWidthUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[minWidthUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("minWidth", String(newValue), minWidthUnit);
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Min H
                </label>
                <UnitSelector
                  selectedUnit={minHeightUnit}
                  onUnitChange={(unit) => handleUnitChange("minHeight", unit)}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}
                />
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.minHeight || "0px").number}
                onChange={(e) =>
                  handleSizeChange("minHeight", e.target.value, minHeightUnit)
                }
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              
              {minHeightUnit !== "auto" && unitRanges[minHeightUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.minHeight || "0px").number}
                  min={unitRanges[minHeightUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[minHeightUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[minHeightUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("minHeight", String(newValue), minHeightUnit);
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {/* Max Width & Max Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Max W
                </label>
                <UnitSelector
                  selectedUnit={maxWidthUnit}
                  onUnitChange={(unit) => handleUnitChange("maxWidth", unit)}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}

                />
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.maxWidth || "none").number}
                onChange={(e) =>
                  handleSizeChange("maxWidth", e.target.value, maxWidthUnit)
                }
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                disabled={maxWidthUnit === "none"}
              />
              
              {maxWidthUnit !== "auto" && maxWidthUnit !== "none" && unitRanges[maxWidthUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.maxWidth || "none").number}
                  min={unitRanges[maxWidthUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[maxWidthUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[maxWidthUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("maxWidth", String(newValue), maxWidthUnit);
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Max H
                </label>
                <UnitSelector
                  selectedUnit={maxHeightUnit}
                  onUnitChange={(unit) => handleUnitChange("maxHeight", unit)}
                  availableUnits={["px", "%", "em", "rem", "vh", "vw", "auto"]}

                />
              </div>
              <input
                type="number"
                value={parseValue(sizeConfig.maxHeight || "none").number}
                onChange={(e) =>
                  handleSizeChange("maxHeight", e.target.value, maxHeightUnit)
                }
                className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                disabled={maxHeightUnit === "none"}
              />
              
              {maxHeightUnit !== "auto" && maxHeightUnit !== "none" && unitRanges[maxHeightUnit as keyof typeof unitRanges] && (
                <Slider 
                  value={parseValue(sizeConfig.maxHeight || "none").number}
                  min={unitRanges[maxHeightUnit as keyof typeof unitRanges]?.min || 0}
                  max={unitRanges[maxHeightUnit as keyof typeof unitRanges]?.max || 100}
                  step={unitRanges[maxHeightUnit as keyof typeof unitRanges]?.step || 1}
                  onChange={(_, newValue) => {
                    handleSizeChange("maxHeight", String(newValue), maxHeightUnit);
                  }}
                  size="small"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {/* Overflow */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Desbordamiento
            </label>
            <div className="grid grid-cols-4 gap-1">
              {overflowOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSizeChange("overflow", option.value)}
                  title={option.title}
                  className={`px-2 py-1 text-sm rounded border text-center transition-colors ${
                    sizeConfig.overflow === option.value
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">Auto</div>
          </div>

          {/* More size options */}
          <div>
            <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <span>▷</span>
              <span>Más opciones de tamaño</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSection;
