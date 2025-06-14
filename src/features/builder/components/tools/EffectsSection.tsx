import React, { useState } from "react";
import { MdExpandMore, MdExpandLess, MdAdd, MdRemove, MdSettings } from "react-icons/md";
import BoxShadowModal from "./BoxShadowModal";

interface EffectsSectionProps {
  effectsConfig: {
    opacity?: string;
    boxShadow?: string;
    transform?: string;
    filter?: string;
    transition?: string;
    cursor?: string;
    zIndex?: string;
  };
  onEffectsChange: (property: string, value: string) => void;
}

const EffectsSection: React.FC<EffectsSectionProps> = ({
  effectsConfig,
  onEffectsChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showShadowModal, setShowShadowModal] = useState(false);

  const cursorOptions = [
    { value: "auto", label: "Auto" },
    { value: "pointer", label: "Puntero" },
    { value: "default", label: "Por defecto" },
    { value: "text", label: "Texto" },
    { value: "move", label: "Mover" },
    { value: "not-allowed", label: "No permitido" },
    { value: "grab", label: "Agarrar" },
    { value: "grabbing", label: "Agarrando" },
    { value: "crosshair", label: "Cruz" },
    { value: "help", label: "Ayuda" },
  ];

  const shadowPresets = [
    { name: "Ninguna", value: "none" },
    { name: "Suave", value: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)" },
    { name: "Media", value: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)" },
    { name: "Fuerte", value: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)" },
    { name: "Elevada", value: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)" },
    { name: "Interior", value: "inset 0 2px 4px rgba(0, 0, 0, 0.25)" },
  ];

  const filterPresets = [
    { name: "Ninguno", value: "none" },
    { name: "Desenfoque", value: "blur(4px)" },
    { name: "Brillo", value: "brightness(1.2)" },
    { name: "Contraste", value: "contrast(1.5)" },
    { name: "Saturación", value: "saturate(1.5)" },
    { name: "Sepia", value: "sepia(1)" },
    { name: "Escala grises", value: "grayscale(1)" },
    { name: "Invertir", value: "invert(1)" },
  ];

  const transformPresets = [
    { name: "Ninguna", value: "none" },
    { name: "Escala pequeña", value: "scale(0.9)" },
    { name: "Escala grande", value: "scale(1.1)" },
    { name: "Rotar 15°", value: "rotate(15deg)" },
    { name: "Rotar -15°", value: "rotate(-15deg)" },
    { name: "Inclinar X", value: "skewX(15deg)" },
    { name: "Inclinar Y", value: "skewY(15deg)" },
    { name: "Mover arriba", value: "translateY(-10px)" },
  ];

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Efectos
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Opacity */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Opacidad
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={parseFloat(effectsConfig.opacity || "1")}
                onChange={(e) => onEffectsChange("opacity", e.target.value)}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 w-8">
                {Math.round(parseFloat(effectsConfig.opacity || "1") * 100)}%
              </span>
            </div>
          </div>

          {/* Box Shadow */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Sombra
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                {shadowPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onEffectsChange("boxShadow", preset.value)}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      effectsConfig.boxShadow === preset.value
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              
              {/* Botón para abrir la modal avanzada */}
              <button
                onClick={() => setShowShadowModal(true)}
                className="w-full flex items-center justify-center space-x-2 py-2 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <MdSettings className="w-4 h-4" />
                <span className="text-xs font-medium">Configurar Sombras Avanzadas</span>
              </button>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sombra personalizada
                </label>
                <input
                  type="text"
                  value={effectsConfig.boxShadow || ""}
                  onChange={(e) => onEffectsChange("boxShadow", e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0 4px 6px rgba(0, 0, 0, 0.1)"
                />
              </div>
            </div>
          </div>

          {/* Transform */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Transformación
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                {transformPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onEffectsChange("transform", preset.value)}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      effectsConfig.transform === preset.value
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Transformación personalizada
                </label>
                <input
                  type="text"
                  value={effectsConfig.transform || ""}
                  onChange={(e) => onEffectsChange("transform", e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="scale(1.1) rotate(15deg)"
                />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Filtros
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onEffectsChange("filter", preset.value)}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      effectsConfig.filter === preset.value
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Filtro personalizado
                </label>
                <input
                  type="text"
                  value={effectsConfig.filter || ""}
                  onChange={(e) => onEffectsChange("filter", e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="blur(4px) brightness(1.2)"
                />
              </div>
            </div>
          </div>

          {/* Cursor */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Cursor
            </label>
            <select
              value={effectsConfig.cursor || "auto"}
              onChange={(e) => onEffectsChange("cursor", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cursorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Z-Index */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Profundidad (Z-Index)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={parseInt(effectsConfig.zIndex || "0")}
                onChange={(e) => onEffectsChange("zIndex", e.target.value)}
                className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="-999"
                max="999"
              />
              <div className="flex space-x-1">
                <button
                  onClick={() => {
                    const current = parseInt(effectsConfig.zIndex || "0");
                    onEffectsChange("zIndex", (current - 1).toString());
                  }}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <MdRemove className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    const current = parseInt(effectsConfig.zIndex || "0");
                    onEffectsChange("zIndex", (current + 1).toString());
                  }}
                  className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <MdAdd className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Transition */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Transición
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => onEffectsChange("transition", "all 0.3s ease")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    effectsConfig.transition === "all 0.3s ease"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Suave
                </button>
                <button
                  onClick={() => onEffectsChange("transition", "all 0.5s ease-in-out")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    effectsConfig.transition === "all 0.5s ease-in-out"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Lenta
                </button>
                <button
                  onClick={() => onEffectsChange("transition", "none")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    effectsConfig.transition === "none"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Ninguna
                </button>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Transición personalizada
                </label>
                <input
                  type="text"
                  value={effectsConfig.transition || ""}
                  onChange={(e) => onEffectsChange("transition", e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="all 0.3s ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para configurar sombras avanzadas */}
      <BoxShadowModal
        open={showShadowModal}
        onClose={() => setShowShadowModal(false)}
        onSave={(shadowValue) => onEffectsChange("boxShadow", shadowValue)}
        initialValue={effectsConfig.boxShadow}
      />
    </div>
  );
};

export default EffectsSection; 