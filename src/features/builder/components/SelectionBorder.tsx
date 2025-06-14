import React, { useEffect, useState } from "react";
import { useBuilder } from "../context/BuilderContext";

interface SelectionBorderProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const SelectionBorder: React.FC<SelectionBorderProps> = ({ containerRef }) => {
  const { bloqueActual } = useBuilder();
  const [borderStyles, setBorderStyles] = useState<React.CSSProperties>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!bloqueActual || !containerRef.current) {
      setIsVisible(false);
      return;
    }

    // Buscar el elemento DOM del bloque seleccionado
    const selectedElement = document.querySelector(`[data-block-id="${bloqueActual.id}"]`) as HTMLElement;
    
    if (!selectedElement) {
      setIsVisible(false);
      return;
    }

    // Obtener las dimensiones del contenedor y del elemento
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = selectedElement.getBoundingClientRect();

    // Calcular la posición relativa del elemento dentro del contenedor
    const x = elementRect.left - containerRect.left;
    const y = elementRect.top - containerRect.top;
    const width = elementRect.width;
    const height = elementRect.height;

    // Configurar los estilos del border
    setBorderStyles({
      position: "absolute",
      left: 0,
      top: 0,
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px)`,
      border: "2px solid #3b82f6",
      borderRadius: "4px",
      pointerEvents: "none",
      zIndex: 1000,
      transition: "all 0.15s ease-out",
    });

    setIsVisible(true);
  }, [bloqueActual, containerRef]);

  // Escuchar cambios de scroll y resize para reposicionar el border
  useEffect(() => {
    const updatePosition = () => {
      if (bloqueActual && containerRef.current) {
        const selectedElement = document.querySelector(`[data-block-id="${bloqueActual.id}"]`) as HTMLElement;
        
        if (selectedElement) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const elementRect = selectedElement.getBoundingClientRect();
          
          const x = elementRect.left - containerRect.left;
          const y = elementRect.top - containerRect.top;
          
          setBorderStyles(prev => ({
            ...prev,
            transform: `translate(${x}px, ${y}px)`,
          }));
        }
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [bloqueActual, containerRef]);

  if (!isVisible || !bloqueActual) {
    return null;
  }

  return (
    <>
      {/* Border principal */}
      <div style={borderStyles} />
      
      {/* Etiqueta del elemento */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${borderStyles.transform?.toString().match(/translate\(([^)]+)\)/)?.[1] || '0px, 0px'}) translateY(-100%)`,
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "2px",
          paddingBottom: "2px",
          fontSize: "11px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          borderRadius: "4px 4px 0 0",
          fontWeight: "500",
          zIndex: 1001,
          whiteSpace: "nowrap",
        }}
      >
        {bloqueActual.type || "Bloque"}
      </div>
    </>
  );
};

export default SelectionBorder; 