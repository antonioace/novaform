import React, { useRef } from "react";
import { useBuilder } from "../context/BuilderContext";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import BlockElement from "./BlockElement";
import ElementBorders from "./ElementBorders";
import { DISPOSITIVOS } from "../utils/interfaces";
import ContextMenu from "./ContextMenu";

const Canvas = () => {
  const {
    dispositivoActual,
    bloqueActual,
    blocksList,
    containerMainStyles,
    setBloqueActual,
  } = useBuilder();
  const { handleDragOver, handleDragLeave, handleDrop, dropTarget } =
    useDragAndDrop();
  const canvasRef = useRef<HTMLDivElement>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    handleDrop(e);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    handleDragOver(e, "canvas-main");
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    handleDragLeave(e);
  };

  // Función para seleccionar el contenedor principal
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBloqueActual({
      id: "container-main",
      type: "CONTENEDOR",
      name: "Contenedor Principal",
      description: "Contenedor que contiene todos los bloques de la página",
    });
  };

  const getWidthPorDispositivo = (dispositivo: DISPOSITIVOS): string => {
    if (!dispositivo) {
      return "1200px";
    }
    const width: Record<DISPOSITIVOS, string> = {
      [DISPOSITIVOS.DESKTOP]: "1200px",
      [DISPOSITIVOS.TABLET]: "768px",
      [DISPOSITIVOS.MOBILE]: "375px",
    };
    return width[dispositivo];
  };

  const isDropTarget = dropTarget === "canvas-main";
  const hasBlocks = blocksList.length > 0;

  // Obtener estilos del contenedor principal según el dispositivo actual
  const currentContainerStyles = containerMainStyles[dispositivoActual] || {};

  // Verificar si el contenedor principal está seleccionado
  const isContainerSelected = bloqueActual?.id === "container-main";

  return (
    <>
      <div
        className="canvas flex overflow-auto relative"
        style={{
          marginRight: "240px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div
          ref={canvasRef}
          onClick={handleContainerClick}
          style={{
            border: isDropTarget
              ? "2px dashed #3b82f6"
              : !bloqueActual?.id && !hasBlocks
              ? "2px dashed #1890ff"
              : isContainerSelected
              ? "2px solid #1890ff"
              : "1px solid #e5e7eb",
            backgroundColor: isDropTarget ? "#f0f9ff" : "transparent",
            width: getWidthPorDispositivo(dispositivoActual),
            minWidth: getWidthPorDispositivo(dispositivoActual),
            maxWidth: getWidthPorDispositivo(dispositivoActual),
            minHeight: hasBlocks ? "auto" : "400px",
            position: "relative",
            padding: "16px",
            transition: "all 0.2s ease-in-out",
            margin: "0 auto",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          {/* Etiqueta de identificación */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "11px",
              backgroundColor: isDropTarget
                ? "#3b82f6"
                : isContainerSelected
                ? "#1890ff"
                : "#1890ff",
              color: "#fff",
              zIndex: 2,
              borderRadius: "0 0 4px 0",
            }}
          >
            {isDropTarget
              ? "Soltar aquí"
              : isContainerSelected
              ? "Contenedor Seleccionado"
              : "Canvas Principal"}
          </div>

          {/* Contenido del canvas */}
          {hasBlocks ? (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                ...currentContainerStyles,
              }}
            >
              {blocksList.map((block) => (
                <BlockElement key={block.id} block={block} />
              ))}
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ height: "400px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Canvas vacío
                </h3>
                <p className="text-sm text-gray-500">
                  Arrastra elementos desde el panel lateral
                  <br />
                  para comenzar a construir tu diseño
                </p>
              </div>
            </div>
          )}

          {/* Bordes de elementos */}
          <ElementBorders containerRef={canvasRef} />
          <ContextMenu />
        </div>
      </div>
    </>
  );
};

export default Canvas;
