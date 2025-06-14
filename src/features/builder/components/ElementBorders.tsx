import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useBuilder } from "../context/BuilderContext";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface ElementBordersProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface BorderInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDropTarget: boolean;
}

const ElementBorders: React.FC<ElementBordersProps> = ({ containerRef }) => {
  const {
    blocksList,
    bloqueActual,
    stylesList,
    dispositivoActual,
    bloqueActualHover,
  } = useBuilder();
  const {} = useDragAndDrop();
  const [selectedBorder, setSelectedBorder] = useState<BorderInfo | null>(null);
  const [hoveredBorder, setHoveredBorder] = useState<BorderInfo | null>(null);

  const updateBorders = useCallback(() => {
    if (!containerRef.current || !bloqueActual) {
      setSelectedBorder(null);
      return;
    }

    const selectedElement = document.querySelector(
      `[data-block-id="${bloqueActual.id}"]`
    ) as HTMLElement;

    if (selectedElement) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = selectedElement.getBoundingClientRect();
      const x = elementRect.left - containerRect.left;
      const y = elementRect.top - containerRect.top;
      const width = elementRect.width;
      const height = elementRect.height;

      setSelectedBorder({
        id: bloqueActual.id,
        x,
        y,
        width,
        height,
        isDropTarget: false,
      });
    } else {
      setSelectedBorder(null);
    }
  }, [bloqueActual, containerRef]);

  const updateHoveredBorder = useCallback(() => {
    if (bloqueActualHover) {
      const selectedElement = document.querySelector(
        `[data-block-id="${bloqueActualHover.id}"]`
      ) as HTMLElement;
      if (selectedElement && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        const x = elementRect.left - containerRect.left;
        const y = elementRect.top - containerRect.top;
        const width = elementRect.width;
        const height = elementRect.height;

        setHoveredBorder({
          id: bloqueActualHover.id,
          x,
          y,
          width,
          height,
          isDropTarget: false,
        });
      }
    } else {
      setHoveredBorder(null);
    }
  }, [bloqueActualHover]);

  useLayoutEffect(() => {
    if (bloqueActualHover) {
      updateHoveredBorder();
    } else {
      setHoveredBorder(null);
    }
  }, [
    bloqueActualHover,
    stylesList,
    blocksList,
    dispositivoActual,
    updateHoveredBorder,
  ]);
  useLayoutEffect(() => {
    updateBorders();
  }, [updateBorders, stylesList, blocksList, dispositivoActual, containerRef]);

  // Escuchar cambios de scroll y resize para actualizar posiciones
  useEffect(() => {
    const handleUpdate = () => {
      updateBorders();
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    // También actualizar cuando cambie el contenido
    const observer = new ResizeObserver(handleUpdate);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
      observer.disconnect();
    };
  }, [containerRef, updateBorders, dispositivoActual]);

  return (
    <>
      {/* Borde de selección */}
      {selectedBorder && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: `${selectedBorder.width}px`,
              height: `${selectedBorder.height}px`,
              transform: `translate(${selectedBorder.x}px, ${selectedBorder.y}px)`,
              border: "2px solid #3b82f6",
              borderRadius: "4px",
              pointerEvents: "none",
              zIndex: 1,
              transition: "all 0.15s ease-out",
            }}
          />

          {/* Título del elemento seleccionado */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${selectedBorder.x}px, ${
                selectedBorder.y - 20
              }px)`,
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "11px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              borderRadius: "4px 4px 0 0",
              fontWeight: "500",
              zIndex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {bloqueActual?.type || "Bloque"}
          </div>
        </>
      )}

      {hoveredBorder && hoveredBorder.id !== bloqueActual?.id && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: `${hoveredBorder.width}px`,
              height: `${hoveredBorder.height}px`,
              transform: `translate(${hoveredBorder.x}px, ${hoveredBorder.y}px)`,
              border: "1px dashed #000000",
              borderRadius: "2px",
              pointerEvents: "none",
              zIndex: 2,
              opacity: 0.7,
              transition: "all 0.1s ease-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${hoveredBorder.x}px, ${
                hoveredBorder.y - 20
              }px)`,
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "11px",
              backgroundColor: "#000000",
              color: "#fff",
              borderRadius: "4px 4px 0 0",
              fontWeight: "500",
              zIndex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {bloqueActualHover?.type || "Bloque"}
          </div>
        </>
      )}
    </>
  );
};

export default ElementBorders;
