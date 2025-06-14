import { useBuilder } from "../context/BuilderContext";
import { Block } from "../utils/interfaces";

export const useBlockStyles = (block: Block) => {
  const { stylesList, dispositivoActual } = useBuilder();

  const formatearEstilos = (estilos: Record<string, unknown>) => {
    const unidadPorPropiedad = {
      width: "unitWidth",
      minWidth: "unitMinWidth",
      maxWidth: "unitMaxWidth",
      height: "unitHeight",
      minHeight: "unitMinHeight",
      maxHeight: "unitMaxHeight",
      gap: "unitGap",
      marginRight: "unitMarginRight",
      marginLeft: "unitMarginLeft",
      marginTop: "unitMarginTop",
      marginBottom: "unitMarginBottom",
      paddingRight: "unitPaddingRight",
      paddingLeft: "unitPaddingLeft",
      paddingTop: "unitPaddingTop",
      paddingBottom: "unitPaddingBottom",
    };

    if (!estilos) return {};
    return Object.keys(estilos).reduce((acc, key) => {
      if (key === "estilosPersonalizados") {
        return acc;
      }
      if (unidadPorPropiedad[key]) {
        return {
          ...acc,
          [key]: `${estilos[key]}${estilos[unidadPorPropiedad[key]] || ""}`,
        };
      }

      if (
        !unidadPorPropiedad[key] &&
        !Object.values(unidadPorPropiedad).includes(key)
      ) {
        return {
          ...acc,
          [key]: estilos[key],
        };
      }

      return acc;
    }, {});
  };

  // Obtener estilos del bloque para el dispositivo actual
  const blockStyles = stylesList.find((style) => style.blockId === block.id);
  const currentDeviceStyles = blockStyles?.styles[dispositivoActual] || {};

  // Aplicar estilos formateados
  const elementStyles = {
    ...formatearEstilos(currentDeviceStyles),
    position: "relative" as const,
    cursor: "pointer",
  };

  return {
    elementStyles,
  };
}; 