import { useState, useCallback } from "react";
import { useBuilder } from "../context/BuilderContext";
import { Block, BlockStyles, BlockConfig } from "../utils/interfaces";
import { TIPOS_BLOQUES } from "../utils/tiposElementos";

interface DragData {
  type: keyof typeof TIPOS_BLOQUES;
  label: string;
}

export const useDragAndDrop = () => {
  const { addBlock, dispositivoActual } = useBuilder();
  const [draggedElement, setDraggedElement] = useState<DragData | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  // Generar ID único para nuevos bloques
  const generateBlockId = useCallback(() => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Crear estilos por defecto para un nuevo bloque
  const createDefaultStyles = useCallback(
    (type: keyof typeof TIPOS_BLOQUES): BlockStyles => {
      const baseStyles = {
        [dispositivoActual]: {
          margin: "8px",
          padding: "8px",
          borderRadius: "4px",
        },
      };

      // Estilos específicos por tipo de elemento
      const typeSpecificStyles = {
        [TIPOS_BLOQUES.BOTON]: {
          [dispositivoActual]: {
            ...baseStyles[dispositivoActual],
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          },
        },
        [TIPOS_BLOQUES.TEXTO]: {
          [dispositivoActual]: {
            ...baseStyles[dispositivoActual],
            color: "#374151",
            fontSize: "16px",
            lineHeight: "1.5",
          },
        },
        [TIPOS_BLOQUES.IMAGEN]: {
          [dispositivoActual]: {
            ...baseStyles[dispositivoActual],
            width: "100%",
            maxWidth: "400px",
          },
        },
        [TIPOS_BLOQUES.CONTENEDOR]: {
          [dispositivoActual]: {
            ...baseStyles[dispositivoActual],
            border: "2px dashed #d1d5db",
            minHeight: "100px",
            padding: "16px",
          },
        },
        [TIPOS_BLOQUES.FORMULARIO]: {
          [dispositivoActual]: {
            ...baseStyles[dispositivoActual],
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "20px",
          },
        },
      };

      return {
        blockId: "", // Se asignará después
        styles: typeSpecificStyles[type] || baseStyles,
      };
    },
    [dispositivoActual]
  );

  // Crear configuración por defecto para un nuevo bloque
  const createDefaultConfig = useCallback(
    (type: keyof typeof TIPOS_BLOQUES): BlockConfig => {
      return {
        blockId: "", // Se asignará después
        config: {},
      };
    },
    []
  );

  // Iniciar drag desde el panel de elementos
  const handleDragStart = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      elementType: keyof typeof TIPOS_BLOQUES,
      elementLabel: string
    ) => {
      const dragData: DragData = {
        type: elementType,
        label: elementLabel,
      };

      setDraggedElement(dragData);
      event.dataTransfer.setData("application/json", JSON.stringify(dragData));
      event.dataTransfer.effectAllowed = "copy";

      // Estilo visual durante el drag
      if (event.currentTarget) {
        event.currentTarget.style.opacity = "0.5";
      }
    },
    []
  );

  // Finalizar drag
  const handleDragEnd = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      setDraggedElement(null);
      if (event.currentTarget) {
        event.currentTarget.style.opacity = "1";
      }
    },
    []
  );

  // Manejar cuando se arrastra sobre un área de drop válida
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>, targetId?: string) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "copy";

      if (targetId && targetId !== dropTarget) {
        setDropTarget(targetId);
      }
    },
    [dropTarget]
  );

  // Manejar cuando se sale del área de drop
  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setDropTarget(null);
    },
    [dropTarget]
  );

  // Manejar drop
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, targetContainerId?: string) => {
      event.preventDefault();
      event.stopPropagation();
      setDropTarget(null);

      try {
        const dragDataStr = event.dataTransfer.getData("application/json");
        if (!dragDataStr) return;

        const dragData: DragData = JSON.parse(dragDataStr);
        const newBlockId = generateBlockId();

        // Crear el nuevo bloque
        const newBlock: Block = {
          id: newBlockId,
          type: dragData.type,
          name: dragData.label,
          description: `${dragData.label} agregado al lienzo`,
          children: [],
        };

        // Crear estilos por defecto
        const defaultStyles = createDefaultStyles(dragData.type);
        defaultStyles.blockId = newBlockId;

        // Crear configuración por defecto
        const defaultConfig = createDefaultConfig(dragData.type);
        defaultConfig.blockId = newBlockId;

        // Si es un contenedor, agregar al contenedor padre
        if (targetContainerId) {
          // TODO: Implementar lógica para agregar a contenedor específico
          console.log(
            `Agregando ${dragData.type} al contenedor ${targetContainerId}`
          );
        }

        // Agregar el bloque al builder
        addBlock(newBlock, defaultStyles, defaultConfig);

        console.log(
          `✅ Elemento ${dragData.label} agregado con ID: ${newBlockId}`
        );
      } catch (error) {
        console.error("Error al procesar el drop:", error);
      }
    },
    [addBlock, generateBlockId, createDefaultStyles, createDefaultConfig]
  );

  // Verificar si un elemento puede ser dropeado en un contenedor
  const canDropInContainer = useCallback(
    (
      containerType: keyof typeof TIPOS_BLOQUES,
      elementType: keyof typeof TIPOS_BLOQUES
    ): boolean => {
      const dropRules = {
        [TIPOS_BLOQUES.CONTENEDOR]: [
          TIPOS_BLOQUES.BOTON,
          TIPOS_BLOQUES.TEXTO,
          TIPOS_BLOQUES.IMAGEN,
          TIPOS_BLOQUES.VIDEO,
          TIPOS_BLOQUES.TABLA,
          TIPOS_BLOQUES.LISTA,
          TIPOS_BLOQUES.FORMULARIO,
        ],
        [TIPOS_BLOQUES.FORMULARIO]: [
          TIPOS_BLOQUES.INPUT_TEXTO,
          TIPOS_BLOQUES.INPUT_NUMERO,
          TIPOS_BLOQUES.INPUT_EMAIL,
          TIPOS_BLOQUES.INPUT_PASSWORD,
          TIPOS_BLOQUES.INPUT_SELECT,
          TIPOS_BLOQUES.INPUT_CHECKBOX,
          TIPOS_BLOQUES.INPUT_RADIO,
          TIPOS_BLOQUES.INPUT_SWITCH,
          TIPOS_BLOQUES.INPUT_TEXTO_AREA,
          TIPOS_BLOQUES.INPUT_TEXTO_ENRIQUECIDO,
          TIPOS_BLOQUES.INPUT_SUBIR_IMAGEN,
        ],
      };

      const allowedTypes = dropRules[containerType] || [];
      return allowedTypes.includes(elementType);
    },
    []
  );

  return {
    // Estado
    draggedElement,
    dropTarget,

    // Handlers para drag
    handleDragStart,
    handleDragEnd,

    // Handlers para drop
    handleDragOver,
    handleDragLeave,
    handleDrop,

    // Utilidades
    canDropInContainer,
    generateBlockId,
  };
};
