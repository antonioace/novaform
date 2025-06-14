import React, { useRef, useEffect, useCallback } from "react";
import { useBuilder } from "../context/BuilderContext";
import { DISPOSITIVOS } from "../utils/interfaces";
import BlockElement from "./BlockElement";

const VistaPrevita = () => {
  const {
    dispositivoActual,
    blocksList,
    containerMainStyles,
    setDispositivoActual,
  } = useBuilder();
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para determinar el dispositivo basándose en el ancho
  const getDispositivoByWidth = useCallback((width: number): DISPOSITIVOS => {
    if (width < 768) {
      return DISPOSITIVOS.MOBILE;
    } else if (width < 1200) {
      return DISPOSITIVOS.TABLET;
    } else {
      return DISPOSITIVOS.DESKTOP;
    }
  }, []);

  // Función para actualizar el dispositivo basándose en el tamaño del contenedor
  const updateDispositivoByContainerSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newDispositivo = getDispositivoByWidth(containerWidth);

      if (newDispositivo !== dispositivoActual) {
        setDispositivoActual(newDispositivo);
      }
    }
  }, [getDispositivoByWidth, dispositivoActual, setDispositivoActual]);

  // Observer para detectar cambios de tamaño del contenedor
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateDispositivoByContainerSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      // Ejecutar una vez al montar para establecer el dispositivo inicial
      updateDispositivoByContainerSize();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDispositivoByContainerSize]);

  // También escuchar cambios de ventana
  useEffect(() => {
    const handleResize = () => {
      updateDispositivoByContainerSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDispositivoByContainerSize]);

  const getWidthPorDispositivo = (dispositivo: DISPOSITIVOS): string => {
    if (!dispositivo) {
      return "100%";
    }
    const width: Record<DISPOSITIVOS, string> = {
      [DISPOSITIVOS.DESKTOP]: "100%",
      [DISPOSITIVOS.TABLET]: "768px",
      [DISPOSITIVOS.MOBILE]: "375px",
    };
    return width[dispositivo];
  };

  const hasBlocks = blocksList.length > 0;

  // Obtener estilos del contenedor principal según el dispositivo actual
  const currentContainerStyles = containerMainStyles[dispositivoActual] || {};

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "#ffffff",
      }}
      ref={containerRef}
    >
      <div
        style={{
          width: "100%",
          maxWidth: getWidthPorDispositivo(dispositivoActual),
          minHeight: hasBlocks ? "auto" : "100vh",
          backgroundColor: "#ffffff",
          position: "relative",
          ...currentContainerStyles,
        }}
      >
        {hasBlocks && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              ...currentContainerStyles,
            }}
          >
            {blocksList.map((block) => (
              <BlockElement key={block.id} block={block} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VistaPrevita;
