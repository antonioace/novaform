import React, { useState } from "react";
import { MdExpandMore, MdExpandLess, MdLink, MdLinkOff } from "react-icons/md";

interface BorderSectionProps {
  borderConfig: {
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: string;
    borderTopWidth?: string;
    borderRightWidth?: string;
    borderBottomWidth?: string;
    borderLeftWidth?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
  };
  onBorderChange: (property: string, value: string) => void;
  onMultipleBorderChanges?: (updates: Record<string, string>) => void;
}

const BorderSection: React.FC<BorderSectionProps> = ({
  borderConfig,
  onBorderChange,
  onMultipleBorderChanges,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLinkedBorder, setIsLinkedBorder] = useState(true);
  const [isLinkedRadius, setIsLinkedRadius] = useState(true);

  const borderStyleOptions = [
    { value: "none", label: "Ninguno" },
    { value: "solid", label: "Sólido" },
    { value: "dashed", label: "Discontinuo" },
    { value: "dotted", label: "Punteado" },
    { value: "double", label: "Doble" },
    { value: "groove", label: "Ranura" },
    { value: "ridge", label: "Cresta" },
    { value: "inset", label: "Hundido" },
    { value: "outset", label: "Elevado" },
  ];

  const handleBorderWidthChange = (side: string, value: string) => {
    console.log("isLinkedBorder", isLinkedBorder);
    console.log("side", side);
    console.log("value", value);
    if (isLinkedBorder) {
      if (onMultipleBorderChanges) {
        const updates = {
          borderWidth: `${value}px`,
          borderTopWidth: `${value}px`,
          borderRightWidth: `${value}px`,
          borderBottomWidth: `${value}px`,
          borderLeftWidth: `${value}px`,
        };
        onMultipleBorderChanges(updates);
      } else {
        const updates = {
          borderWidth: `${value}px`,
          borderTopWidth: `${value}px`,
          borderRightWidth: `${value}px`,
          borderBottomWidth: `${value}px`,
          borderLeftWidth: `${value}px`,
        };
        
        Object.entries(updates).forEach(([property, val]) => {
          onBorderChange(property, val);
        });
      }
    } else {
      onBorderChange(`border${side}Width`, `${value}px`);
    }
  };

  const handleBorderRadiusChange = (corner: string, value: string) => {
    if (isLinkedRadius) {
      if (onMultipleBorderChanges) {
        const updates = {
          borderRadius: `${value}px`,
          borderTopLeftRadius: `${value}px`,
          borderTopRightRadius: `${value}px`,
          borderBottomLeftRadius: `${value}px`,
          borderBottomRightRadius: `${value}px`,
        };
        onMultipleBorderChanges(updates);
      } else {
        const updates = {
          borderRadius: `${value}px`,
          borderTopLeftRadius: `${value}px`,
          borderTopRightRadius: `${value}px`,
          borderBottomLeftRadius: `${value}px`,
          borderBottomRightRadius: `${value}px`,
        };
        
        Object.entries(updates).forEach(([property, val]) => {
          onBorderChange(property, val);
        });
      }
    } else {
      onBorderChange(`border${corner}Radius`, `${value}px`);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Bordes
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Border Style */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Estilo de borde
            </label>
            <select
              value={borderConfig.borderStyle || "none"}
              onChange={(e) => onBorderChange("borderStyle", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {borderStyleOptions.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Border Width */}
          {borderConfig.borderStyle && borderConfig.borderStyle !== "none" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Grosor del borde
                </label>
                <button
                  onClick={() => setIsLinkedBorder(!isLinkedBorder)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title={isLinkedBorder ? "Desvincular lados" : "Vincular lados"}
                >
                  {isLinkedBorder ? (
                    <MdLink className="w-3 h-3 text-blue-500" />
                  ) : (
                    <MdLinkOff className="w-3 h-3 text-gray-400" />
                  )}
                </button>
              </div>

              {isLinkedBorder ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={parseInt(borderConfig.borderWidth || "1")}
                    onChange={(e) => handleBorderWidthChange("", e.target.value)}
                    className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="50"
                  />
                  <span className="text-xs text-gray-500">px</span>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 items-center">
                  {/* Top */}
                  <div></div>
                  <div>
                    <input
                      type="number"
                      value={parseInt(borderConfig.borderTopWidth || "1")}
                      onChange={(e) => handleBorderWidthChange("Top", e.target.value)}
                      className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1"
                      min="0"
                      max="50"
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">Arriba</div>
                  </div>
                  <div></div>

                  {/* Left & Right */}
                  <div>
                    <input
                      type="number"
                      value={parseInt(borderConfig.borderLeftWidth || "1")}
                      onChange={(e) => handleBorderWidthChange("Left", e.target.value)}
                      className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1"
                      min="0"
                      max="50"
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">Izquierda</div>
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center text-xs text-gray-400">
                    Borde
                  </div>
                  <div>
                    <input
                      type="number"
                      value={parseInt(borderConfig.borderRightWidth || "1")}
                      onChange={(e) => handleBorderWidthChange("Right", e.target.value)}
                      className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1"
                      min="0"
                      max="50"
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">Derecha</div>
                  </div>

                  {/* Bottom */}
                  <div></div>
                  <div>
                    <input
                      type="number"
                      value={parseInt(borderConfig.borderBottomWidth || "1")}
                      onChange={(e) => handleBorderWidthChange("Bottom", e.target.value)}
                      className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1"
                      min="0"
                      max="50"
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">Abajo</div>
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          )}

          {/* Border Color */}
          {borderConfig.borderStyle && borderConfig.borderStyle !== "none" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Color del borde
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={borderConfig.borderColor || "#000000"}
                  onChange={(e) => onBorderChange("borderColor", e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={borderConfig.borderColor || "#000000"}
                  onChange={(e) => onBorderChange("borderColor", e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}

          {/* Border Radius */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-700">
                Radio de esquinas
              </label>
              <button
                onClick={() => setIsLinkedRadius(!isLinkedRadius)}
                className="p-1 hover:bg-gray-100 rounded"
                title={isLinkedRadius ? "Desvincular esquinas" : "Vincular esquinas"}
              >
                {isLinkedRadius ? (
                  <MdLink className="w-3 h-3 text-blue-500" />
                ) : (
                  <MdLinkOff className="w-3 h-3 text-gray-400" />
                )}
              </button>
            </div>

            {isLinkedRadius ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={parseInt(borderConfig.borderRadius || "0")}
                  onChange={(e) => handleBorderRadiusChange("", e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    value={parseInt(borderConfig.borderTopLeftRadius || "0")}
                    onChange={(e) => handleBorderRadiusChange("TopLeft", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Arriba izq.</div>
                </div>
                <div>
                  <input
                    type="number"
                    value={parseInt(borderConfig.borderTopRightRadius || "0")}
                    onChange={(e) => handleBorderRadiusChange("TopRight", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Arriba der.</div>
                </div>
                <div>
                  <input
                    type="number"
                    value={parseInt(borderConfig.borderBottomLeftRadius || "0")}
                    onChange={(e) => handleBorderRadiusChange("BottomLeft", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Abajo izq.</div>
                </div>
                <div>
                  <input
                    type="number"
                    value={parseInt(borderConfig.borderBottomRightRadius || "0")}
                    onChange={(e) => handleBorderRadiusChange("BottomRight", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Abajo der.</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Border Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Presets rápidos
            </label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  onBorderChange("borderStyle", "solid");
                  onBorderChange("borderWidth", "1px");
                  onBorderChange("borderColor", "#e5e7eb");
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Suave
              </button>
              <button
                onClick={() => {
                  onBorderChange("borderStyle", "solid");
                  onBorderChange("borderWidth", "2px");
                  onBorderChange("borderColor", "#3b82f6");
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Azul
              </button>
              <button
                onClick={() => {
                  onBorderChange("borderStyle", "dashed");
                  onBorderChange("borderWidth", "1px");
                  onBorderChange("borderColor", "#6b7280");
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Punteado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorderSection; 