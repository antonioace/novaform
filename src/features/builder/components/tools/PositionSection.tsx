import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface PositionSectionProps {
  positionConfig: {
    position?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    zIndex?: string;
  };
  onPositionChange: (property: string, value: string) => void;
}

const PositionSection: React.FC<PositionSectionProps> = ({ positionConfig, onPositionChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const positionOptions = [
    { value: "static", label: "Estático", icon: "📍" },
    { value: "relative", label: "Relativo", icon: "📌" },
    { value: "absolute", label: "Absoluto", icon: "🎯" },
    { value: "fixed", label: "Fijo", icon: "🔒" },
    { value: "sticky", label: "Pegajoso", icon: "📎" },
  ];

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Posición
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Position Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Tipo de Posición</label>
            <div className="space-y-1">
              {positionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onPositionChange("position", option.value)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-xs rounded border text-left transition-colors ${
                    positionConfig.position === option.value
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Position Values - Solo mostrar si no es static */}
          {positionConfig.position && positionConfig.position !== "static" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Valores de Posición</label>
              <div className="grid grid-cols-3 gap-2 items-center">
                {/* Top */}
                <div></div>
                <div>
                  <input
                    type="number"
                    placeholder="auto"
                    value={parseInt(positionConfig.top || "0")}
                    onChange={(e) => onPositionChange("top", `${e.target.value}px`)}
                    className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Arriba</div>
                </div>
                <div></div>

                {/* Left & Right */}
                <div>
                  <input
                    type="number"
                    placeholder="auto"
                    value={parseInt(positionConfig.left || "0")}
                    onChange={(e) => onPositionChange("left", `${e.target.value}px`)}
                    className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Izquierda</div>
                </div>
                                  <div className="bg-gray-100 rounded p-4 text-center">
                    <div className="text-xs text-gray-500">Elemento</div>
                  </div>
                <div>
                  <input
                    type="number"
                    placeholder="auto"
                    value={parseInt(positionConfig.right || "0")}
                    onChange={(e) => onPositionChange("right", `${e.target.value}px`)}
                    className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Derecha</div>
                </div>

                {/* Bottom */}
                <div></div>
                <div>
                  <input
                    type="number"
                    placeholder="auto"
                    value={parseInt(positionConfig.bottom || "0")}
                    onChange={(e) => onPositionChange("bottom", `${e.target.value}px`)}
                    className="w-full text-xs text-center border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-gray-500 text-center mt-1">Abajo</div>
                </div>
                <div></div>
              </div>
            </div>
          )}

          {/* Z-Index */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Z-Index</label>
            <input
              type="number"
              value={parseInt(positionConfig.zIndex || "1")}
              onChange={(e) => onPositionChange("zIndex", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionSection; 