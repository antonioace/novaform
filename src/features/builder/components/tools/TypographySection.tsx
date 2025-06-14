import React, { useState } from "react";
import { MdExpandMore, MdExpandLess, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough } from "react-icons/md";

interface TypographySectionProps {
  typographyConfig: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
    textDecoration?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
    fontStyle?: string;
  };
  onTypographyChange: (property: string, value: string) => void;
}

const TypographySection: React.FC<TypographySectionProps> = ({
  typographyConfig,
  onTypographyChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const fontFamilies = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Open Sans, sans-serif", label: "Open Sans" },
    { value: "Poppins, sans-serif", label: "Poppins" },
  ];

  const fontWeights = [
    { value: "100", label: "100 - Thin" },
    { value: "200", label: "200 - Extra Light" },
    { value: "300", label: "300 - Light" },
    { value: "400", label: "400 - Normal" },
    { value: "500", label: "500 - Medium" },
    { value: "600", label: "600 - Semi Bold" },
    { value: "700", label: "700 - Bold" },
    { value: "800", label: "800 - Extra Bold" },
    { value: "900", label: "900 - Black" },
  ];

  const textAlignOptions = [
    { value: "left", label: "⬅", title: "Izquierda" },
    { value: "center", label: "⬌", title: "Centro" },
    { value: "right", label: "➡", title: "Derecha" },
    { value: "justify", label: "⬍", title: "Justificado" },
  ];

  const textDecorationOptions = [
    { value: "none", label: "Sin decoración" },
    { value: "underline", label: "Subrayado" },
    { value: "overline", label: "Línea superior" },
    { value: "line-through", label: "Tachado" },
  ];

  const textTransformOptions = [
    { value: "none", label: "Normal" },
    { value: "uppercase", label: "MAYÚSCULAS" },
    { value: "lowercase", label: "minúsculas" },
    { value: "capitalize", label: "Capitalizado" },
  ];

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#232323] text-xs cursor-pointer font-semibold">
          Tipografía
        </span>
        {isExpanded ? (
          <MdExpandLess className="w-4 h-4 text-gray-500" />
        ) : (
          <MdExpandMore className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Fuente
            </label>
            <select
              value={typographyConfig.fontFamily || "Arial, sans-serif"}
              onChange={(e) => onTypographyChange("fontFamily", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilies.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Peso
            </label>
            <select
              value={typographyConfig.fontWeight || "400"}
              onChange={(e) => onTypographyChange("fontWeight", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size & Line Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Tamaño
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={parseInt(typographyConfig.fontSize || "16")}
                  onChange={(e) => onTypographyChange("fontSize", `${e.target.value}px`)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="8"
                  max="200"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Altura de línea
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  step="0.1"
                  value={parseFloat(typographyConfig.lineHeight || "1.4")}
                  onChange={(e) => onTypographyChange("lineHeight", e.target.value)}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.5"
                  max="3"
                />
                <span className="text-xs text-gray-500">em</span>
              </div>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={typographyConfig.color || "#000000"}
                onChange={(e) => onTypographyChange("color", e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={typographyConfig.color || "#000000"}
                onChange={(e) => onTypographyChange("color", e.target.value)}
                className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Text Align */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Alineación
            </label>
            <div className="grid grid-cols-4 gap-1">
              {textAlignOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onTypographyChange("textAlign", option.value)}
                  title={option.title}
                  className={`px-2 py-1 text-sm rounded border text-center transition-colors ${
                    typographyConfig.textAlign === option.value
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Decoration */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Decoración
            </label>
            <div className="grid grid-cols-2 gap-1">
              {textDecorationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onTypographyChange("textDecoration", option.value)}
                  className={`px-2 py-1 text-xs rounded border text-center transition-colors ${
                    typographyConfig.textDecoration === option.value
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Transform */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Transformación
            </label>
            <select
              value={typographyConfig.textTransform || "none"}
              onChange={(e) => onTypographyChange("textTransform", e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {textTransformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Espaciado entre letras
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                value={parseFloat(typographyConfig.letterSpacing || "0")}
                onChange={(e) => onTypographyChange("letterSpacing", `${e.target.value}px`)}
                className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="-5"
                max="10"
              />
              <span className="text-xs text-gray-500">px</span>
            </div>
          </div>

          {/* Font Style Toggles */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Estilo
            </label>
            <div className="flex space-x-1">
              <button
                onClick={() => onTypographyChange("fontStyle", typographyConfig.fontStyle === "italic" ? "normal" : "italic")}
                className={`px-2 py-1 rounded border transition-colors ${
                  typographyConfig.fontStyle === "italic"
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                title="Cursiva"
              >
                <MdFormatItalic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographySection; 