import { useBuilder } from "../context/BuilderContext";
import { useDragAndDrop } from "./useDragAndDrop";
import { Block } from "../utils/interfaces";

export const useBlockEventHandlers = (block: Block) => {
  const {
    bloqueActual,
    setBloqueActual,
    setBloqueActualHover,
    showContextMenu,
    mode,
  } = useBuilder();

  const { handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop();

  // Verificar si este bloque está seleccionado
  const isSelected = bloqueActual?.id === block.id;

  // Verificar si este bloque puede recibir drops
  const canReceiveDrops =
    block.type === "CONTENEDOR" || block.type === "FORMULARIO";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let blockEventHandlers: any = { "data-block-id": block.id };

  if (mode === 'edit') {
    blockEventHandlers = {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (bloqueActual?.id !== block.id) {
          setBloqueActual(block);
        } else {
          setBloqueActual(null);
        }
      },
      onContextMenu: (e: React.MouseEvent<HTMLElement>) => {
        // Solo mostrar menú si el bloque está seleccionado
        e.stopPropagation();
        if (isSelected) {
          showContextMenu(e, block);
        } else {
          // Si no está seleccionado, seleccionarlo primero
          e.preventDefault();
          setBloqueActual(block);
        }
      },
      onDragStart: (e: React.DragEvent<HTMLElement>) => e.preventDefault(),
      onDragOver: canReceiveDrops
        ? (e: React.DragEvent<HTMLElement>) => {
            const event = e as unknown as React.DragEvent<HTMLDivElement>;
            return handleDragOver(event, block.id);
          }
        : undefined,
      onDragLeave: canReceiveDrops
        ? (e: React.DragEvent<HTMLElement>) => {
            const event = e as unknown as React.DragEvent<HTMLDivElement>;
            return handleDragLeave(event);
          }
        : undefined,
      onDrop: canReceiveDrops
        ? (e: React.DragEvent<HTMLElement>) => {
            const event = e as unknown as React.DragEvent<HTMLDivElement>;
            return handleDrop(event, block.id);
          }
        : undefined,
      onMouseEnter: () => {
        setBloqueActualHover(block);
      },
      onMouseLeave: () => {
        setBloqueActualHover(null);
      },
      "data-block-id": block.id,
    };
  }

  return {
    blockEventHandlers,
    isSelected,
    canReceiveDrops,
  };
};
