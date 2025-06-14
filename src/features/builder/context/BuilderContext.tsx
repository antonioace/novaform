import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Block,
  BlockStyles,
  BlockConfig,
  BuilderContextType,
  DISPOSITIVOS,
  ContextMenuState,
} from "../utils/interfaces";
import {
  useGetPageByProjectId,
  useUpdatePageByIdProject,
} from "@/features/project/hooks";
import { TIPOS_BLOQUES } from "../utils/tiposElementos";
import { useNotification } from "@/contexts/NotificationContext";

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{
  children: React.ReactNode;
  id?: string;
  config?: BlockConfig[];
  styles?: BlockStyles[];
  blocks?: Block[];
}> = ({ children, id, config, styles, blocks }) => {
  const [dispositivoActual, setDispositivoActual] = useState<DISPOSITIVOS>(
    DISPOSITIVOS.DESKTOP
  );

  // Hooks para cargar y actualizar la página
  const {
    loading: loadingPage,
    page,
    getPageByProjectId,
  } = useGetPageByProjectId();
  const { loading: savingPage, updatePageByIdProject } =
    useUpdatePageByIdProject();

  const [bloqueActual, setBloqueActual] = useState<Block | null>(null);
  const [bloqueActualHover, setBloqueActualHover] = useState<Block | null>(
    null
  );

  // SEPARACIÓN DE RESPONSABILIDADES
  const [blocksList, setBlocksList] = useState<Block[]>([]);
  const [stylesList, setStylesList] = useState<BlockStyles[]>([]);
  const [configList, setConfigList] = useState<BlockConfig[]>([]);
  const { showNotification } = useNotification();
  // Estilos del contenedor principal que contiene todos los bloques
  const [containerMainStyles, setContainerMainStyles] = useState<{
    [key in DISPOSITIVOS]?: React.CSSProperties;
  }>({
    [DISPOSITIVOS.DESKTOP]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      gap: "16px",
      marginTop: "24px",
      marginBottom: "24px",
      marginLeft: "0px",
      marginRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    [DISPOSITIVOS.TABLET]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      gap: "12px",
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "0px",
      marginRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    [DISPOSITIVOS.MOBILE]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      gap: "8px",
      marginTop: "16px",
      marginBottom: "16px",
      marginLeft: "0px",
      marginRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  });

  // Cargar la página cuando el ID cambie
  useEffect(() => {
    if (id) {
      getPageByProjectId(id, "Home");
    }
  }, [id]);

  useEffect(() => {
    if (config) {
      setConfigList(config);
    }
  }, [config]);

  useEffect(() => {
    if (styles) {
      setStylesList(styles);
    }
  }, [styles]);

  useEffect(() => {
    if (blocks) {
      setBlocksList(blocks);
    }
  }, [blocks]);

  // Cargar el contenido de la página en los estados cuando se obtenga la data
  useEffect(() => {
    if (page?.content) {
      if (page?.content?.blocksList) {
        setBlocksList(page?.content?.blocksList || []);
      }
      if (page?.content?.stylesList) {
        setStylesList(page?.content?.stylesList || []);
      }
      if (page?.content?.configList) {
        setConfigList(page?.content?.configList || []);
      }
      if (page?.content?.containerMainStyles) {
        setContainerMainStyles(page?.content?.containerMainStyles);
      }
    }
  }, [page]);

  // Estado del menú contextual
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isVisible: false,
    x: 0,
    y: 0,
    targetBlock: null,
  });

  const FORMULARIO_TYPES = [
    TIPOS_BLOQUES.INPUT_TEXTO,
    TIPOS_BLOQUES.INPUT_NUMERO,
    TIPOS_BLOQUES.INPUT_EMAIL,
    TIPOS_BLOQUES.INPUT_PASSWORD,
    TIPOS_BLOQUES.INPUT_SELECT,
    TIPOS_BLOQUES.INPUT_CHECKBOX,
    TIPOS_BLOQUES.INPUT_RADIO,
  ];
  // Funciones del menú contextual
  const showContextMenu = useCallback(
    (event: React.MouseEvent, block: Block) => {
      event.preventDefault();
      setContextMenu({
        isVisible: true,
        x: event.clientX,
        y: event.clientY,
        targetBlock: block,
      });
    },
    []
  );

  const hideContextMenu = useCallback(() => {
    setContextMenu({
      isVisible: false,
      x: 0,
      y: 0,
      targetBlock: null,
    });
  }, []);

  const validationsAddBlock = (block: Block) => {
    // QUIERE DECIR QUE NO ES BLOQUE FORMULARIO ENTONCES PASA DIRECTO
    if (!FORMULARIO_TYPES.includes(block.type as keyof typeof TIPOS_BLOQUES)) {
      return true;
    }

    // SI ES BLOQUE FORMULARIO ENTONCES VERIFICA SI EL BLOQUE ES DE TIPO FORMULARIO
    if (
      bloqueActual?.type === TIPOS_BLOQUES.FORMULARIO &&
      FORMULARIO_TYPES.includes(block.type as keyof typeof TIPOS_BLOQUES)
    ) {
      return true;
    }
    showNotification("error", "El bloque no es válido para el formulario");
    return false;
  };

  const addAsChild = (
    blocks: Block[],
    parentId: string,
    newChild: Block
  ): Block[] => {
    return blocks.map((b) => {
      if (b.id === parentId) {
        const updatedChildren = b.children
          ? [...b.children, newChild]
          : [newChild];
        return { ...b, children: updatedChildren };
      }
      if (b.children && b.children.length > 0) {
        return {
          ...b,
          children: addAsChild(b.children, parentId, newChild),
        };
      }
      return b;
    });
  };
  // Métodos auxiliares para gestionar la sincronización
  const addBlock = (
    block: Block,
    styles?: BlockStyles,
    config?: BlockConfig
  ) => {
    if (!validationsAddBlock(block)) {
      return;
    }
    // Si hay un bloque seleccionado y es de tipo 'CONTENEDOR', añadir el nuevo bloque como hijo.
    if (
      bloqueActual &&
      [
        TIPOS_BLOQUES.CONTENEDOR,
        TIPOS_BLOQUES.FORMULARIO,
        TIPOS_BLOQUES.CUESTIONARIO,
      ].includes(bloqueActual.type as keyof typeof TIPOS_BLOQUES) &&
      bloqueActual.id !== "container-main"
    ) {
      setBlocksList((prev) => addAsChild(prev, bloqueActual.id, block));
    } else {
      // De lo contrario, añadir el bloque al nivel raíz.
      setBlocksList((prev) => [...prev, block]);
    }

    // Agregar estilos si se proporcionan
    if (styles) {
      setStylesList((prev) => [...prev, styles]);
    }

    // Agregar configuración si se proporciona
    if (config) {
      setConfigList((prev) => [...prev, config]);
    }
  };

  const removeBlock = (blockId: string) => {
    // Función recursiva para remover el bloque y sus descendientes de los estados
    const removeRecursively = (id: string, blocks: Block[]) => {
      const blockToRemove = blocks.find((b) => findBlock(b, id));
      if (!blockToRemove) return;

      const descendantIds = new Set<string>();
      const getDescendantIds = (block: Block) => {
        descendantIds.add(block.id);
        block.children?.forEach(getDescendantIds);
      };

      const foundBlock = findBlock(blockToRemove, id);
      if (foundBlock) {
        getDescendantIds(foundBlock);
      }

      setBlocksList((prev) => prev.filter((b) => !descendantIds.has(b.id)));
      setStylesList((prev) =>
        prev.filter((s) => !descendantIds.has(s.blockId))
      );
      setConfigList((prev) =>
        prev.filter((c) => !descendantIds.has(c.blockId))
      );

      // Limpiar selección si es necesario
      if (bloqueActual && descendantIds.has(bloqueActual.id)) {
        setBloqueActual(null);
      }
    };

    // Función auxiliar para encontrar un bloque en la jerarquía
    const findBlock = (block: Block, id: string): Block | undefined => {
      if (block.id === id) return block;
      return block.children
        ?.map((child) => findBlock(child, id))
        .find((found) => found);
    };

    // Remover bloque de la lista principal (y recursivamente de hijos)
    const removeTopLevel = (blocks: Block[], id: string): Block[] => {
      return blocks.reduce((acc, block) => {
        if (block.id === id) {
          removeRecursively(id, blocks); // Inicia la eliminación recursiva de estados
          return acc;
        }
        if (block.children) {
          block.children = removeTopLevel(block.children, id);
        }
        acc.push(block);
        return acc;
      }, [] as Block[]);
    };

    setBlocksList((prev) => removeTopLevel(prev, blockId));
  };

  const duplicateBlock = (blockId: string) => {
    // 1) Acumularemos estilos y config nuevos aquí
    const stylesToAdd: BlockStyles[] = [];
    const configsToAdd: BlockConfig[] = [];

    // 2) Clon profundo con ID nuevo
    const deepDuplicate = (block: Block): Block => {
      const newId = `block_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 9)}`;

      // Copiar estilos / config al buffer
      const style = stylesList.find((s) => s.blockId === block.id);
      if (style) stylesToAdd.push({ ...style, blockId: newId });

      const cfg = configList.find((c) => c.blockId === block.id);
      if (cfg) configsToAdd.push({ ...cfg, blockId: newId });

      return {
        ...block,
        id: newId,
        children: block.children?.map(deepDuplicate) ?? [],
      };
    };

    // 3) Generar el nuevo árbol sin mutar nada
    setBlocksList((prev) => {
      const walk = (blocks: Block[]): Block[] =>
        blocks.flatMap((b) => {
          if (b.id === blockId) {
            const clone = deepDuplicate(b);
            return [b, clone]; // original + duplicado
          }
          const kids = b.children ? walk(b.children) : undefined;
          return [{ ...b, children: kids ?? b.children }];
        });

      return walk(prev);
    });

    // 4) Añadir estilos y configs duplicados una sola vez
    if (stylesToAdd.length) setStylesList((prev) => [...prev, ...stylesToAdd]);
    if (configsToAdd.length)
      setConfigList((prev) => [...prev, ...configsToAdd]);
  };

  const updateBlockStyles = (
    blockId: string,
    styles: BlockStyles["styles"]
  ) => {
    setStylesList((prev) => {
      const existingIndex = prev.findIndex(
        (style) => style.blockId === blockId
      );

      if (existingIndex >= 0) {
        // Actualizar estilos existentes
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], styles };
        return updated;
      } else {
        // Crear nuevos estilos
        return [...prev, { blockId, styles }];
      }
    });
  };

  const updateBlockConfig = (
    blockId: string,
    config: BlockConfig["config"]
  ) => {
    setConfigList((prev) => {
      const existingIndex = prev.findIndex((cfg) => cfg.blockId === blockId);

      if (existingIndex >= 0) {
        // Actualizar configuración existente
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], config };
        return updated;
      } else {
        // Crear nueva configuración
        return [...prev, { blockId, config }];
      }
    });
  };

  // Función para encontrar el padre de un bloque
  const findParentBlock = useCallback(
    (blocks: Block[], targetId: string): Block | null => {
      for (const block of blocks) {
        if (block.children?.some((child) => child.id === targetId)) {
          return block;
        }
        if (block.children) {
          const parent = findParentBlock(block.children, targetId);
          if (parent) return parent;
        }
      }
      return null;
    },
    []
  );

  // Función para seleccionar el elemento padre
  const selectParent = useCallback(
    (blockId: string) => {
      const parentBlock = findParentBlock(blocksList, blockId);
      if (parentBlock) {
        setBloqueActual(parentBlock);
      }
    },
    [blocksList, setBloqueActual, findParentBlock]
  );

  // Función para envolver un bloque en un contenedor
  const wrapInContainer = useCallback((blockId: string) => {
    const findAndWrapBlock = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.id === blockId) {
          // Crear nuevo contenedor
          const containerId = `container_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          const container: Block = {
            id: containerId,
            type: "CONTENEDOR",
            name: "Nuevo Contenedor",
            children: [block],
          };
          return container;
        }
        if (block.children) {
          return {
            ...block,
            children: findAndWrapBlock(block.children),
          };
        }
        return block;
      });
    };

    setBlocksList((prevBlocks) => {
      // Primero buscamos si el bloque está en el nivel raíz
      const blockIndex = prevBlocks.findIndex((b) => b.id === blockId);
      if (blockIndex !== -1) {
        // Si está en el nivel raíz, lo envolvemos directamente
        const targetBlock = prevBlocks[blockIndex];
        const containerId = `container_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const container: Block = {
          id: containerId,
          type: "CONTENEDOR",
          name: "Nuevo Contenedor",
          children: [targetBlock],
        };
        const newBlocks = [...prevBlocks];
        newBlocks.splice(blockIndex, 1, container);
        return newBlocks;
      }
      // Si no está en el nivel raíz, buscamos en los hijos
      return findAndWrapBlock(prevBlocks);
    });
  }, []);

  // Función para guardar la página
  const savePage = useCallback(async (): Promise<boolean> => {
    if (!page?.id) return false;

    const pageData = {
      content: {
        blocksList,
        stylesList,
        configList,
        containerMainStyles,
      },
    };

    return await updatePageByIdProject({
      ...pageData,
      id: page.id,
    });
  }, [
    page?.id,
    blocksList,
    stylesList,
    configList,
    containerMainStyles,
    updatePageByIdProject,
  ]);

  // Función para mover un bloque hacia arriba
  const moveBlockUp = useCallback((blockId: string) => {
    const findAndMoveBlock = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.children) {
          const childIndex = block.children.findIndex(
            (child) => child.id === blockId
          );
          if (childIndex > 0) {
            const newChildren = [...block.children];
            [newChildren[childIndex - 1], newChildren[childIndex]] = [
              newChildren[childIndex],
              newChildren[childIndex - 1],
            ];
            return { ...block, children: newChildren };
          }
          return {
            ...block,
            children: findAndMoveBlock(block.children),
          };
        }
        return block;
      });
    };

    setBlocksList((prev) => findAndMoveBlock(prev));
  }, []);

  // Función para mover un bloque hacia abajo
  const moveBlockDown = useCallback((blockId: string) => {
    const findAndMoveBlock = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.children) {
          const childIndex = block.children.findIndex(
            (child) => child.id === blockId
          );
          if (childIndex >= 0 && childIndex < block.children.length - 1) {
            const newChildren = [...block.children];
            [newChildren[childIndex], newChildren[childIndex + 1]] = [
              newChildren[childIndex + 1],
              newChildren[childIndex],
            ];
            return { ...block, children: newChildren };
          }
          return {
            ...block,
            children: findAndMoveBlock(block.children),
          };
        }
        return block;
      });
    };

    setBlocksList((prev) => findAndMoveBlock(prev));
  }, []);

  const findBlockByIdRecursive = (
    blocks: Block[],
    blockId: string
  ): Block | null => {
    for (const block of blocks) {
      if (block.id === blockId) return block;
      if (block.children?.length) {
        const found = findBlockByIdRecursive(block.children, blockId);
        if (found) return found;
      }
    }
    return null;
  };
  // Función para mover un bloque hacia adelante (derecha)
  const moveBlockForward = useCallback((blockId: string) => {
    const findAndMoveBlock = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.children) {
          const childIndex = block.children.findIndex(
            (child) => child.id === blockId
          );
          if (childIndex >= 0 && childIndex < block.children.length - 1) {
            const newChildren = [...block.children];
            [newChildren[childIndex], newChildren[childIndex + 1]] = [
              newChildren[childIndex + 1],
              newChildren[childIndex],
            ];
            return { ...block, children: newChildren };
          }
          return {
            ...block,
            children: findAndMoveBlock(block.children),
          };
        }
        return block;
      });
    };

    setBlocksList((prev) => findAndMoveBlock(prev));
  }, []);

  // Función para mover un bloque hacia atrás (izquierda)
  const moveBlockBackward = useCallback((blockId: string) => {
    const findAndMoveBlock = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.children) {
          const childIndex = block.children.findIndex(
            (child) => child.id === blockId
          );
          if (childIndex > 0) {
            const newChildren = [...block.children];
            [newChildren[childIndex - 1], newChildren[childIndex]] = [
              newChildren[childIndex],
              newChildren[childIndex - 1],
            ];
            return { ...block, children: newChildren };
          }
          return {
            ...block,
            children: findAndMoveBlock(block.children),
          };
        }
        return block;
      });
    };

    setBlocksList((prev) => findAndMoveBlock(prev));
  }, []);

  const getConfigAndStylesByBlockId = (blockId: string) => {
    if (bloqueActual) {
      // 1. Obtener todos los IDs de bloques (incluyendo hijos)
      const getAllBlockIds = (block: Block): string[] => {
        const childIds: string[] = [];
        block?.children?.forEach((child) => {
          if (child.children) {
            childIds.push(...getAllBlockIds(child));
          }
          childIds.push(child?.id as string);
        });
        return [...childIds];
      };
      const blockIds = [bloqueActual.id, ...getAllBlockIds(bloqueActual)];

      // 3. Obtener los estilos y configuraciones correspondientes
      const stylesToCopy = stylesList.filter((style) =>
        blockIds.includes(style.blockId)
      );
      const configsToCopy = configList.filter((config) =>
        blockIds.includes(config.blockId)
      );

      const blockFound = findBlockByIdRecursive(blocksList, blockId);
      if (blockFound) {
        return {
          blockList: [blockFound],
          stylesList: stylesToCopy,
          configList: configsToCopy,
        };
      }
    }
    return null;
  };

  const contextValue: BuilderContextType = {
    // Gestión de dispositivos
    dispositivoActual,
    setDispositivoActual,

    // Bloque actual seleccionado
    bloqueActual,
    setBloqueActual,

    // SEPARACIÓN DE RESPONSABILIDADES
    blocksList,
    setBlocksList,
    stylesList,
    setStylesList,
    configList,
    setConfigList,

    // Estilos del contenedor principal
    containerMainStyles,
    setContainerMainStyles,

    // Métodos auxiliares
    addBlock,
    removeBlock,
    duplicateBlock,
    bloqueActualHover,
    setBloqueActualHover,
    updateBlockStyles,
    updateBlockConfig,
    getConfigAndStylesByBlockId,

    // Menú contextual
    contextMenu,
    showContextMenu,
    hideContextMenu,

    // Nuevos métodos
    selectParent,
    wrapInContainer,

    // Gestión de página
    loadingPage,
    savingPage,
    page,
    savePage,

    // Métodos para mover bloques
    moveBlockUp,
    moveBlockDown,
    moveBlockForward,
    moveBlockBackward,

    addAsChild,
  };

  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder debe ser usado dentro de BuilderProvider");
  }
  return context;
};
