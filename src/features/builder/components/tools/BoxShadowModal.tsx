import React, { useState, useEffect } from "react";
import { MdClose, MdAdd } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface BoxShadowModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (shadowValue: string) => void;
  initialValue?: string;
}

interface ShadowConfig {
  type: "outside" | "inside";
  x: number;
  y: number;
  blur: number;
  size: number;
  color: string;
}

const BoxShadowModal: React.FC<BoxShadowModalProps> = ({
  open,
  onClose,
  onSave,
  initialValue = "none",
}) => {
  const [shadows, setShadows] = useState<ShadowConfig[]>([
    {
      type: "outside",
      x: 0,
      y: 2,
      blur: 5,
      size: 0,
      color: "rgba(19, 19, 19, 0.2)",
    },
  ]);

  // Parsear valor inicial al abrir modal
  useEffect(() => {
    if (open) {
      if (initialValue && initialValue !== "none" && initialValue.trim() !== "") {
        console.log("initialValue", initialValue);
        parseShadowValue(initialValue);
      } else {
        // Resetear a valores por defecto
        setShadows(resetToDefault());
      }
    }
  }, [open, initialValue]);

  const parseShadowValue = (value: string) => {
    try {
      const shadowsArray: ShadowConfig[] = [];
      
      // Función para dividir correctamente las sombras respetando rgba()
      const splitShadows = (str: string): string[] => {
        const shadows: string[] = [];
        let current = "";
        let parenCount = 0;
        
        for (let i = 0; i < str.length; i++) {
          const char = str[i];
          
          if (char === "(") {
            parenCount++;
          } else if (char === ")") {
            parenCount--;
          } else if (char === "," && parenCount === 0) {
            shadows.push(current.trim());
            current = "";
            continue;
          }
          
          current += char;
        }
        
        if (current.trim()) {
          shadows.push(current.trim());
        }
        
        return shadows;
      };

      const shadowParts = splitShadows(value);
      console.log("shadowParts", shadowParts);
      console.log("value", value);
      shadowParts.forEach((shadow) => {
        const trimmed = shadow.trim();
        if (!trimmed) return;

        const isInset = trimmed.includes("inset");
        const workingString = trimmed.replace(/^inset\s+/, "").trim();

        // Regex específico para capturar colores rgba/rgb correctamente
        // Busca: número número número número color(rgba/rgb/hex/nombre)
        const shadowWithRgbaRegex = /^(-?\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+(-?\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+(\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+(-?\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+((?:rgba?\([^)]+\)|#[a-fA-F0-9]+|\w+))$/;
        
        // Regex para formato sin spread-radius
        const shadowWithoutSpreadRegex = /^(-?\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+(-?\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+(\d+(?:\.\d+)?(?:px|em|rem|%)?)\s+((?:rgba?\([^)]+\)|#[a-fA-F0-9]+|\w+))$/;

        
        let match = workingString.match(shadowWithRgbaRegex);
        
        if (match) {
          const [, xStr, yStr, blurStr, sizeStr, colorStr] = match;
          
          shadowsArray.push({
            type: isInset ? "inside" : "outside",
            x: parseInt(xStr) || 0,
            y: parseInt(yStr) || 0,
            blur: parseInt(blurStr) || 0,
            size: parseInt(sizeStr) || 0,
            color: colorStr.trim() || "rgba(19, 19, 19, 0.2)",
          });
        } else {
          // Intentar sin spread-radius
          match = workingString.match(shadowWithoutSpreadRegex);
          
          if (match) {
            const [, xStr, yStr, blurStr, colorStr] = match;
            console.log("Match without spread:", { xStr, yStr, blurStr, colorStr });
            
            shadowsArray.push({
              type: isInset ? "inside" : "outside",
              x: parseInt(xStr) || 0,
              y: parseInt(yStr) || 0,
              blur: parseInt(blurStr) || 0,
              size: 0,
              color: colorStr.trim() || "rgba(19, 19, 19, 0.2)",
            });
          } else {
            console.warn("No se pudo parsear la sombra:", workingString);
          }
        }
      });

      if (shadowsArray.length > 0) {
        console.log("Sombras parseadas:", shadowsArray);
        setShadows(shadowsArray);
      } else {
        // Si no se pudo parsear, usar valor por defecto
        setShadows(resetToDefault());
      }
    } catch (error) {
      console.warn("Error parseando box-shadow:", error);
      // En caso de error, usar valor por defecto
      setShadows(resetToDefault());
    }
  };

  const generateShadowValue = (): string => {
    return shadows
      .map((shadow) => {
        const insetPrefix = shadow.type === "inside" ? "inset " : "";
        return `${insetPrefix}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.size}px ${shadow.color}`;
      })
      .join(", ");
  };

  const updateShadow = (index: number, field: keyof ShadowConfig, value: string | number) => {
    setShadows((prev) =>
      prev.map((shadow, i) =>
        i === index ? { ...shadow, [field]: value } : shadow
      )
    );
  };

  const addShadow = () => {
    setShadows((prev) => [
      ...prev,
      {
        type: "outside",
        x: 0,
        y: 2,
        blur: 5,
        size: 0,
        color: "rgba(0, 0, 0, 0.2)",
      },
    ]);
  };

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    const shadowValue = generateShadowValue();
    onSave(shadowValue);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  // Función para resetear a valores por defecto
  const resetToDefault = () => {
    return [
      {
        type: "outside" as const,
        x: 0,
        y: 2,
        blur: 5,
        size: 0,
        color: "rgba(19, 19, 19, 0.2)",
      },
    ];
  };

  // Funciones auxiliares para manejar colores
  const convertToHex = (color: string): string => {
    if (!color || typeof color !== 'string') {
      return "#000000";
    }

    const cleanColor = color.trim();
    
    // Si ya es hex, validarlo y devolverlo
    if (cleanColor.startsWith("#")) {
      const hex = cleanColor.toUpperCase();
      if (hex.length === 7 && /^#[0-9A-F]{6}$/.test(hex)) {
        return hex;
      } else if (hex.length === 4 && /^#[0-9A-F]{3}$/.test(hex)) {
        // Convertir hex corto a hex largo: #ABC -> #AABBCC
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
      }
      return "#000000";
    }
    
    // Si es rgba o rgb, extraer RGB y convertir a hex
    const rgbaMatch = cleanColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/i);
    if (rgbaMatch) {
      const r = Math.max(0, Math.min(255, parseInt(rgbaMatch[1]) || 0));
      const g = Math.max(0, Math.min(255, parseInt(rgbaMatch[2]) || 0));
      const b = Math.max(0, Math.min(255, parseInt(rgbaMatch[3]) || 0));
      
      // Convertir a hex con padding de ceros
      const toHex = (n: number) => {
        const hex = n.toString(16).toUpperCase();
        return hex.length === 1 ? "0" + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    // Manejar colores con nombres (black, white, etc.)
    const colorNames: { [key: string]: string } = {
      black: "#000000",
      white: "#FFFFFF",
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      yellow: "#FFFF00",
      cyan: "#00FFFF",
      magenta: "#FF00FF",
      gray: "#808080",
      grey: "#808080",
      transparent: "#000000",
    };
    
    const colorLower = cleanColor.toLowerCase();
    if (colorNames[colorLower]) {
      return colorNames[colorLower];
    }
    
    return "#000000"; // Color por defecto
  };

  const hexToRgba = (hex: string, alpha: number): string => {
    if (!hex || !hex.startsWith("#")) {
      return `rgba(0, 0, 0, ${alpha})`;
    }

    let cleanHex = hex.slice(1);
    
    // Manejar hex corto (#ABC -> AABBCC)
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    
    if (cleanHex.length !== 6) {
      return `rgba(0, 0, 0, ${alpha})`;
    }

    const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  };

  const getOpacityFromColor = (color: string): number => {
    if (!color || typeof color !== 'string') {
      return 1;
    }

    const cleanColor = color.trim();
    
    // Para colores RGBA, extraer el valor alpha
    const rgbaMatch = cleanColor.match(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i);
    if (rgbaMatch && rgbaMatch[1]) {
      const opacity = parseFloat(rgbaMatch[1]);
      return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
    }
    
    // Para colores RGB o hex, la opacidad es 1 (completamente opaco)
    return 1;
  };

  const getBaseColorFromRgba = (color: string): { r: number; g: number; b: number } => {
    if (!color || typeof color !== 'string') {
      return { r: 0, g: 0, b: 0 };
    }

    const cleanColor = color.trim();
    
    // Manejar colores RGB/RGBA
    const rgbaMatch = cleanColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/i);
    if (rgbaMatch) {
      return {
        r: Math.max(0, Math.min(255, parseInt(rgbaMatch[1]) || 0)),
        g: Math.max(0, Math.min(255, parseInt(rgbaMatch[2]) || 0)),
        b: Math.max(0, Math.min(255, parseInt(rgbaMatch[3]) || 0)),
      };
    }
    
    // Manejar colores hex
    if (cleanColor.startsWith("#")) {
      let hex = cleanColor.slice(1);
      
      // Convertir hex corto a largo
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      
      if (hex.length === 6 && /^[0-9A-F]{6}$/i.test(hex)) {
        return {
          r: parseInt(hex.slice(0, 2), 16) || 0,
          g: parseInt(hex.slice(2, 4), 16) || 0,
          b: parseInt(hex.slice(4, 6), 16) || 0,
        };
      }
    }
    
    return { r: 0, g: 0, b: 0 }; // Negro por defecto
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between">
          <span className="text-[#232323] text-sm font-semibold">
            Configurar Sombras
          </span>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <MdClose className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="space-y-4">
          {shadows.map((shadow, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-700">
                  Sombra {index + 1}
                </span>
                {shadows.length > 1 && (
                  <button
                    onClick={() => removeShadow(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              {/* Tipo de sombra */}
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Tipo
                </label>
                <div className="flex bg-white rounded-md border border-gray-300 p-1">
                  <button
                    onClick={() => updateShadow(index, "type", "outside")}
                    className={`flex-1 text-xs font-medium rounded px-3 py-1 transition-colors ${
                      shadow.type === "outside"
                        ? "bg-gray-800 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Outside
                  </button>
                  <button
                    onClick={() => updateShadow(index, "type", "inside")}
                    className={`flex-1 text-xs font-medium rounded px-3 py-1 transition-colors ${
                      shadow.type === "inside"
                        ? "bg-gray-800 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Inside
                  </button>
                </div>
              </div>

              {/* Controles de valores */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    X
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={shadow.x}
                      onChange={(e) =>
                        updateShadow(index, "x", parseInt(e.target.value))
                      }
                      className="flex-1 h-1 bg-gray-200 rounded-lg"
                    />
                    <span className="text-xs text-gray-600 w-8">
                      {shadow.x}
                    </span>
                    <span className="text-xs text-gray-400">px</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Y
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={shadow.y}
                      onChange={(e) =>
                        updateShadow(index, "y", parseInt(e.target.value))
                      }
                      className="flex-1 h-1 bg-gray-200 rounded-lg"
                    />
                    <span className="text-xs text-gray-600 w-8">
                      {shadow.y}
                    </span>
                    <span className="text-xs text-gray-400">px</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Blur
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.blur}
                      onChange={(e) =>
                        updateShadow(index, "blur", parseInt(e.target.value))
                      }
                      className="flex-1 h-1 bg-gray-200 rounded-lg"
                    />
                    <span className="text-xs text-gray-600 w-8">
                      {shadow.blur}
                    </span>
                    <span className="text-xs text-gray-400">px</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Size
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="range"
                      min="-20"
                      max="50"
                      value={shadow.size}
                      onChange={(e) =>
                        updateShadow(index, "size", parseInt(e.target.value))
                      }
                      className="flex-1 h-1 bg-gray-200 rounded-lg"
                    />
                    <span className="text-xs text-gray-600 w-8">
                      {shadow.size}
                    </span>
                    <span className="text-xs text-gray-400">px</span>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div className="mt-3">
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <input
                      type="color"
                      value={convertToHex(shadow.color)}
                      onChange={(e) => {
                        const hexColor = e.target.value;
                        const currentOpacity = getOpacityFromColor(shadow.color);
                        const rgbaColor = hexToRgba(hexColor, currentOpacity);
                       
                        updateShadow(index, "color", rgbaColor);
                      }}
                      className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                      title="Seleccionar color"
                    />
                    <div
                      className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: shadow.color }}
                      title="Vista previa del color"
                    />
                  </div>
                  <input
                    type="text"
                    value={shadow.color}
                    onChange={(e) =>
                      updateShadow(index, "color", e.target.value)
                    }
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="rgba(19, 19, 19, 0.2)"
                  />
                </div>
                
                {/* Slider de opacidad */}
                <div className="mt-2">
                  <label className="text-xs text-gray-600 mb-1 block">
                    Opacidad
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={getOpacityFromColor(shadow.color)}
                      onChange={(e) => {
                        const opacity = parseFloat(e.target.value);
                        const baseColor = getBaseColorFromRgba(shadow.color);
                        const newColor = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`;
                        updateShadow(index, "color", newColor);
                      }}
                      className="flex-1 h-1 bg-gray-200 rounded-lg"
                    />
                    <span className="text-xs text-gray-600 w-10">
                      {Math.round(getOpacityFromColor(shadow.color) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Botón para agregar sombra */}
          <button
            onClick={addShadow}
            className="w-full flex items-center justify-center space-x-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <MdAdd className="w-4 h-4" />
            <span className="text-xs font-medium">Agregar Sombra</span>
          </button>

          {/* Vista previa */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Vista Previa:
            </div>
            <div
              className="w-full h-16 bg-white rounded border"
              style={{ boxShadow: generateShadowValue() }}
            />
            <div className="mt-2 text-xs font-mono text-gray-600 break-all">
              box-shadow: {generateShadowValue()}
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Aplicar Sombras
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoxShadowModal; 