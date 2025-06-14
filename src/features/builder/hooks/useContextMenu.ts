import { useCallback, useState } from "react";
import { useBuilder } from "../context/BuilderContext";
import { DISPOSITIVOS } from "../utils/interfaces";
import { useNotification } from "@/contexts/NotificationContext";
import { Block, BlockStyles, BlockConfig } from "../utils/interfaces";
import { TIPOS_BLOQUES } from "../utils/tiposElementos";

// Interfaz para el contenido copiado
export interface CopiedContent {
  blocksList: Block[];
  stylesList: BlockStyles[];
  configList: BlockConfig[];
}

export const useContextMenu = () => {
  const {
    removeBlock,
    duplicateBlock,
    contextMenu,
    showContextMenu,
    hideContextMenu,
    bloqueActual,
    selectParent,
    wrapInContainer,
    stylesList,
    configList,
    blocksList,
    setBlocksList,
    setStylesList,
    setConfigList,
    updateBlockStyles,
    dispositivoActual,
    moveBlockUp,
    moveBlockDown,
    moveBlockForward,
    moveBlockBackward,
    addAsChild,
  } = useBuilder();

  const { showNotification } = useNotification();
  const [copiedContent, setCopiedContent] = useState<CopiedContent | null>(
    null
  );

  // Función para generar un nuevo ID único
  const generateNewId = useCallback(() => {
    return `block_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }, []);

  // Función para obtener todos los IDs de un bloque y sus hijos
  const getAllBlockIds = useCallback((block: Block): string[] => {
    const childIds: string[] = [];
    block?.children?.forEach((child) => {
      if (child.children) {
        childIds.push(...getAllBlockIds(child));
      }
      childIds.push(child?.id as string);
    });
    return [...childIds];
  }, []);

  console.log("copiedContent", copiedContent);
  // Función para copiar un bloque y todo su contenido
  const copyBlock = useCallback(() => {
    if (bloqueActual) {
      // 1. Obtener todos los IDs de bloques (incluyendo hijos)
      const blockIds = [bloqueActual.id, ...getAllBlockIds(bloqueActual)];

      // 3. Obtener los estilos y configuraciones correspondientes
      const stylesToCopy = stylesList.filter((style) =>
        blockIds.includes(style.blockId)
      );
      const configsToCopy = configList.filter((config) =>
        blockIds.includes(config.blockId)
      );

      // 4. Guardar todo en el estado
      setCopiedContent({
        blocksList: [bloqueActual],
        stylesList: stylesToCopy,
        configList: configsToCopy,
      });

      showNotification("success", "Bloque copiado correctamente");
      hideContextMenu();
    }
  }, [
    bloqueActual,
    stylesList,
    configList,
    getAllBlockIds,
    hideContextMenu,
    showNotification,
  ]);

  // Pegar bloque
  const pasteBlock = (copiedContent: CopiedContent) => {
    if (!copiedContent) {
      showNotification("error", "No hay ningún bloque copiado");
      return;
    }

    // 1. Mapa de ids antiguos → nuevos
    const idMap = new Map<string, string>();

    // 2. Clonar bloques recursivamente asignando ids nuevos
    const cloneBlock = (block: Block): Block => {
      const newId = generateNewId();
      idMap.set(block.id, newId);

      return {
        ...block,
        id: newId,
        children: block.children?.map(cloneBlock) || [],
      };
    };

    const newBlocks = copiedContent.blocksList.map(cloneBlock) as Block[];

    // 3. Remapear estilos y configs con los ids nuevos
    const newStyles = copiedContent.stylesList.map((style) => ({
      ...style,
      blockId: idMap.get(style.blockId) as string,
    }));

    const newConfigs = copiedContent.configList.map((config) => ({
      ...config,
      blockId: idMap.get(config.blockId) as string,
    }));

    // 4. Actualizar estado
    console.log("bloque actual", bloqueActual);
    if (
      bloqueActual &&
      [
        TIPOS_BLOQUES.CONTENEDOR,
        TIPOS_BLOQUES.CUESTIONARIO,
        TIPOS_BLOQUES.FORMULARIO,
      ].includes(bloqueActual.type as string)
    ) {
      setBlocksList(addAsChild(blocksList, bloqueActual.id, newBlocks[0]));
    } else {
      setBlocksList([...blocksList, ...newBlocks]);
    }

    setStylesList([...stylesList, ...newStyles]);
    setConfigList([...configList, ...newConfigs]);

    showNotification("success", "Bloque pegado correctamente");
    hideContextMenu();
  };
  // Eliminar bloque
  const deleteBlock = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (bloqueActual) {
        console.log("Eliminando bloque:", bloqueActual);
        removeBlock(bloqueActual.id);
        hideContextMenu();
      }
    },
    [bloqueActual, removeBlock, hideContextMenu]
  );

  // Duplicar bloque
  const handleDuplicate = useCallback(() => {
    if (bloqueActual) {
      duplicateBlock(bloqueActual.id);
      hideContextMenu();
    }
  }, [bloqueActual, duplicateBlock, hideContextMenu]);

  const handleWrapInContainer = useCallback(() => {
    if (bloqueActual) {
      wrapInContainer(bloqueActual.id);
      hideContextMenu();
    }
  }, [bloqueActual, wrapInContainer, hideContextMenu]);

  const handleSelectParent = useCallback(() => {
    if (bloqueActual) {
      selectParent(bloqueActual.id);
      hideContextMenu();
    }
  }, [bloqueActual, selectParent, hideContextMenu]);

  // Copiar estilos del dispositivo actual a otro dispositivo
  const copyStylesToDevice = useCallback(
    (targetDevice: DISPOSITIVOS) => {
      if (bloqueActual) {
        // Buscar los estilos actuales del bloque
        const blockStyles = stylesList.find(
          (style) => style.blockId === bloqueActual.id
        );

        if (blockStyles && blockStyles.styles[dispositivoActual]) {
          // Copiar los estilos del dispositivo actual al dispositivo objetivo
          const currentStyles = blockStyles.styles[dispositivoActual];
          const updatedStyles = {
            ...blockStyles.styles,
            [targetDevice]: { ...currentStyles },
          };

          updateBlockStyles(bloqueActual.id, updatedStyles);
          hideContextMenu();
          showNotification("success", "Estilos copiados correctamente");
        }
      }
    },
    [
      bloqueActual,
      stylesList,
      dispositivoActual,
      updateBlockStyles,
      hideContextMenu,
      showNotification,
    ]
  );

  // Funciones específicas para cada dispositivo
  const copyStylesToDesktop = useCallback(() => {
    copyStylesToDevice(DISPOSITIVOS.DESKTOP);
  }, [copyStylesToDevice]);

  const copyStylesToTablet = useCallback(() => {
    copyStylesToDevice(DISPOSITIVOS.TABLET);
  }, [copyStylesToDevice]);

  const copyStylesToMobile = useCallback(() => {
    copyStylesToDevice(DISPOSITIVOS.MOBILE);
  }, [copyStylesToDevice]);

  // Copiar estilos a todos los elementos de un dispositivo específico
  const copyStylesToAllDevicesOfType = useCallback(
    (targetDevice: DISPOSITIVOS) => {
      if (bloqueActual) {
        const blockStyles = stylesList.find(
          (style) => style.blockId === bloqueActual.id
        );

        if (blockStyles && blockStyles.styles[dispositivoActual]) {
          const currentStyles = blockStyles.styles[dispositivoActual];

          // Actualizar todos los bloques con los estilos del dispositivo actual
          stylesList.forEach((style) => {
            if (style.blockId !== bloqueActual.id) {
              const updatedStyles = {
                ...style.styles,
                [targetDevice]: { ...currentStyles },
              };
              updateBlockStyles(style.blockId, updatedStyles);
            }
          });

          hideContextMenu();
          showNotification(
            "success",
            `Estilos copiados a todos los elementos en ${targetDevice}`
          );
        }
      }
    },
    [
      bloqueActual,
      stylesList,
      dispositivoActual,
      updateBlockStyles,
      hideContextMenu,
      showNotification,
    ]
  );

  // Funciones específicas para copiar a todos los elementos
  const copyStylesToAllTablets = useCallback(() => {
    copyStylesToAllDevicesOfType(DISPOSITIVOS.TABLET);
  }, [copyStylesToAllDevicesOfType]);

  const copyStylesToAllMobiles = useCallback(() => {
    copyStylesToAllDevicesOfType(DISPOSITIVOS.MOBILE);
  }, [copyStylesToAllDevicesOfType]);

  const copyStylesToAllDevices = useCallback(() => {
    if (bloqueActual) {
      const blockStyles = stylesList.find(
        (style) => style.blockId === bloqueActual.id
      );

      if (blockStyles && blockStyles.styles[dispositivoActual]) {
        const currentStyles = blockStyles.styles[dispositivoActual];

        // Actualizar todos los bloques con los estilos del dispositivo actual
        stylesList.forEach((style) => {
          if (style.blockId !== bloqueActual.id) {
            const updatedStyles = {
              ...style.styles,
              [DISPOSITIVOS.DESKTOP]: { ...currentStyles },
              [DISPOSITIVOS.TABLET]: { ...currentStyles },
              [DISPOSITIVOS.MOBILE]: { ...currentStyles },
            };
            updateBlockStyles(style.blockId, updatedStyles);
          }
        });

        hideContextMenu();
        showNotification(
          "success",
          "Estilos copiados a todos los elementos en todos los dispositivos"
        );
      }
    }
  }, [
    bloqueActual,
    stylesList,
    dispositivoActual,
    updateBlockStyles,
    hideContextMenu,
    showNotification,
  ]);

  return {
    contextMenu,
    showContextMenu,
    hideContextMenu,
    deleteBlock,
    duplicateBlock: handleDuplicate,
    wrapInContainer: handleWrapInContainer,
    selectParent: handleSelectParent,
    copyStylesToDesktop,
    copyStylesToTablet,
    copyStylesToMobile,
    copyStylesToAllTablets,
    copyStylesToAllMobiles,
    copyStylesToAllDevices,
    dispositivoActual,
    moveBlockUp,
    moveBlockDown,
    moveBlockForward,
    moveBlockBackward,
    copyBlock,
    pasteBlock,
    hasCopiedBlock: !!copiedContent,
    copiedContent,
    setCopiedContent,
  };
};
