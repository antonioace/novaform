import React from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useBuilder } from "../context/BuilderContext";
import { TIPOS_BLOQUES } from "../utils/tiposElementos";
import { DISPOSITIVOS } from "../utils/interfaces";

function CardElement({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type?: keyof typeof TIPOS_BLOQUES;
}) {
  const { handleDragStart, handleDragEnd } = useDragAndDrop();
  const { addBlock } = useBuilder();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (type) {
      handleDragStart(event, type, label);
    }
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    handleDragEnd(event);
  };

  // Función para generar ID único
  const generateBlockId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Función para obtener estilos por defecto según el tipo
  const getDefaultStyles = (blockType: keyof typeof TIPOS_BLOQUES) => {
    const baseStyles = {
      [DISPOSITIVOS.DESKTOP]: {
        padding: "8px",
        margin: "4px",
        borderRadius: "4px",
        minHeight: "40px",
      },
      [DISPOSITIVOS.TABLET]: {
        padding: "6px",
        margin: "3px",
        borderRadius: "4px",
        minHeight: "36px",
      },
      [DISPOSITIVOS.MOBILE]: {
        padding: "4px",
        margin: "2px",
        borderRadius: "4px",
        minHeight: "32px",
      },
    };

    // Estilos específicos por tipo de elemento
    const typeSpecificStyles = {
      BOTON: {
        [DISPOSITIVOS.DESKTOP]: { ...baseStyles[DISPOSITIVOS.DESKTOP], backgroundColor: "#3b82f6", color: "#ffffff", cursor: "pointer" },
        [DISPOSITIVOS.TABLET]: { ...baseStyles[DISPOSITIVOS.TABLET], backgroundColor: "#3b82f6", color: "#ffffff", cursor: "pointer" },
        [DISPOSITIVOS.MOBILE]: { ...baseStyles[DISPOSITIVOS.MOBILE], backgroundColor: "#3b82f6", color: "#ffffff", cursor: "pointer" },
      },
      TEXTO: {
        [DISPOSITIVOS.DESKTOP]: { ...baseStyles[DISPOSITIVOS.DESKTOP], fontSize: "16px", color: "#374151" },
        [DISPOSITIVOS.TABLET]: { ...baseStyles[DISPOSITIVOS.TABLET], fontSize: "14px", color: "#374151" },
        [DISPOSITIVOS.MOBILE]: { ...baseStyles[DISPOSITIVOS.MOBILE], fontSize: "12px", color: "#374151" },
      },
      CONTENEDOR: {
        [DISPOSITIVOS.DESKTOP]: { ...baseStyles[DISPOSITIVOS.DESKTOP], border: "1px dashed #d1d5db", minHeight: "100px" },
        [DISPOSITIVOS.TABLET]: { ...baseStyles[DISPOSITIVOS.TABLET], border: "1px dashed #d1d5db", minHeight: "80px" },
        [DISPOSITIVOS.MOBILE]: { ...baseStyles[DISPOSITIVOS.MOBILE], border: "1px dashed #d1d5db", minHeight: "60px" },
      },
    };

    return typeSpecificStyles[blockType] || baseStyles;
  };

  // Función para obtener configuración por defecto
  const getDefaultConfig = () => {
    return {
      isVisible: true,
      isDisabled: false,
      validation: {
        required: false,
      },
    };
  };

  // Handler para agregar elemento con click
  const handleClick = () => {
    if (!type) return;

    const newBlockId = generateBlockId();
    
    // Crear nuevo bloque
    const newBlock = {
      id: newBlockId,
      type: type,
      name: label,
      description: `${label} agregado desde panel`,
      children: [],
    };

    // Crear estilos por defecto
    const newStyles = {
      blockId: newBlockId,
      styles: getDefaultStyles(type),
    };

    // Crear configuración por defecto
    const newConfig = {
      blockId: newBlockId,
      config: getDefaultConfig(),
    };

    console.log("newStyles", newStyles);
    // Agregar al contexto
    addBlock(newBlock, newStyles, newConfig);
  };

  return (
    <div 
      className="flex flex-col items-center group relative cursor-grab active:cursor-grabbing"
      draggable={!!type}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
    >
      <div className="w-12 h-12 flex items-center justify-center border border-[#eeeeee] rounded-md group-hover:border-[#2563eb] group-hover:bg-blue-50 transition-all duration-150 group-active:bg-blue-100 group-active:scale-95">
        {icon}
      </div>
      <span className="text-[10px] text-center text-[#232323] mt-1 flex items-center justify-center group-hover:text-blue-600 transition-colors">
        {label}
      </span>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          Click para agregar
        </div>
      </div>
    </div>
  );
}

export default CardElement;
