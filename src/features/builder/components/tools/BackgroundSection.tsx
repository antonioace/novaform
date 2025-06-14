import React, { useState } from "react";
import { MdExpandMore, MdExpandLess, MdImage, MdGradient, MdColorize } from "react-icons/md";

interface BackgroundSectionProps {
  backgroundConfig: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
    backgroundAttachment?: string;
    gradient?: string;
  };
  onBackgroundChange: (property: string, value: string) => void;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  backgroundConfig,
  onBackgroundChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [backgroundType, setBackgroundType] = useState<"color" | "image" | "gradient">("color");

  const backgroundSizeOptions = [
    { value: "auto", label: "Auto" },
    { value: "cover", label: "Cubrir" },
    { value: "contain", label: "Contener" },
    { value: "100% 100%", label: "Estirar" },
  ];

  const backgroundRepeatOptions = [
    { value: "no-repeat", label: "Sin repetir" },
    { value: "repeat", label: "Repetir" },
    { value: "repeat-x", label: "Repetir X" },
    { value: "repeat-y", label: "Repetir Y" },
  ];

  const backgroundPositionOptions = [
    { value: "center", label: "Centro" },
    { value: "top", label: "Arriba" },
    { value: "bottom", label: "Abajo" },
    { value: "left", label: "Izquierda" },
    { value: "right", label: "Derecha" },
    { value: "top left", label: "Arriba izquierda" },
    { value: "top right", label: "Arriba derecha" },
    { value: "bottom left", label: "Abajo izquierda" },
    { value: "bottom right", label: "Abajo derecha" },
  ];

  const gradientPresets = [
    { value: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", label: "Azul púrpura" },
    { value: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)", label: "Rosa coral" },
    { value: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)", label: "Azul cyan" },
    { value: "linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)", label: "Verde mint" },
    { value: "linear-gradient(45deg, #fa709a 0%, #fee140 100%)", label: "Rosa amarillo" },
    { value: "linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)", label: "Mint rosa" },
  ];

  const handleBackgroundTypeChange = (type: "color" | "image" | "gradient") => {
    setBackgroundType(type);
    
    // Limpiar propiedades anteriores
    if (type === "color") {
      onBackgroundChange("backgroundImage", "none");
      onBackgroundChange("gradient", "");
    } else if (type === "image") {
      onBackgroundChange("gradient", "");
    } else if (type === "gradient") {
      onBackgroundChange("backgroundImage", "none");
    }
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Fondo
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Background Type Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Tipo de fondo
            </label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleBackgroundTypeChange("color")}
                className={`flex items-center justify-center space-x-1 px-2 py-1 text-xs rounded border transition-colors ${
                  backgroundType === "color"
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MdColorize className="w-3 h-3" />
                <span>Color</span>
              </button>
              <button
                onClick={() => handleBackgroundTypeChange("image")}
                className={`flex items-center justify-center space-x-1 px-2 py-1 text-xs rounded border transition-colors ${
                  backgroundType === "image"
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MdImage className="w-3 h-3" />
                <span>Imagen</span>
              </button>
              <button
                onClick={() => handleBackgroundTypeChange("gradient")}
                className={`flex items-center justify-center space-x-1 px-2 py-1 text-xs rounded border transition-colors ${
                  backgroundType === "gradient"
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MdGradient className="w-3 h-3" />
                <span>Gradiente</span>
              </button>
            </div>
          </div>

          {/* Background Color */}
          {backgroundType === "color" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Color de fondo
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundConfig.backgroundColor || "#ffffff"}
                  onChange={(e) => onBackgroundChange("backgroundColor", e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={backgroundConfig.backgroundColor || "#ffffff"}
                  onChange={(e) => onBackgroundChange("backgroundColor", e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          )}

          {/* Background Image */}
          {backgroundType === "image" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  URL de imagen
                </label>
                <input
                  type="text"
                  value={backgroundConfig.backgroundImage?.replace(/^url\(["']?|["']?\)$/g, '') || ""}
                  onChange={(e) => onBackgroundChange("backgroundImage", e.target.value ? `url(${e.target.value})` : "none")}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Tamaño
                  </label>
                  <select
                    value={backgroundConfig.backgroundSize || "cover"}
                    onChange={(e) => onBackgroundChange("backgroundSize", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {backgroundSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Repetición
                  </label>
                  <select
                    value={backgroundConfig.backgroundRepeat || "no-repeat"}
                    onChange={(e) => onBackgroundChange("backgroundRepeat", e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {backgroundRepeatOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Posición
                </label>
                <select
                  value={backgroundConfig.backgroundPosition || "center"}
                  onChange={(e) => onBackgroundChange("backgroundPosition", e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {backgroundPositionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Background Gradient */}
          {backgroundType === "gradient" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Gradientes predefinidos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {gradientPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onBackgroundChange("backgroundImage", preset.value);
                        onBackgroundChange("gradient", preset.value);
                      }}
                      className="h-8 rounded border border-gray-300 hover:border-blue-300 transition-colors"
                      style={{ background: preset.value }}
                      title={preset.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Gradiente personalizado
                </label>
                <input
                  type="text"
                  value={backgroundConfig.gradient || ""}
                  onChange={(e) => {
                    onBackgroundChange("gradient", e.target.value);
                    onBackgroundChange("backgroundImage", e.target.value);
                  }}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
                />
              </div>
            </div>
          )}

          {/* Background Attachment (for images) */}
          {backgroundType === "image" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Comportamiento de scroll
              </label>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => onBackgroundChange("backgroundAttachment", "scroll")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    (backgroundConfig.backgroundAttachment || "scroll") === "scroll"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => onBackgroundChange("backgroundAttachment", "fixed")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    backgroundConfig.backgroundAttachment === "fixed"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fijo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundSection; 