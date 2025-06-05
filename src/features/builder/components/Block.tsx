import React from "react";
import { Block, useBuilder } from "../context/BuilderContext";
import RenderBlock from "./RenderBlock";

export interface BlockProps {
  block: Block;
}
function Block({ block }: BlockProps) {
  const formatearEstilos = (estilos) => {
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
      // Si la propiedad tiene una unidad asociada
      if (key === "estilosPersonalizados") {
        return acc;
      }
      if (unidadPorPropiedad[key]) {
        // Sobrescribimos la propiedad clave con el valor formateado (valor + unidad)
        return {
          ...acc,
          [key]: `${estilos[key]}${estilos[unidadPorPropiedad[key]] || ""}`,
        };
      }

      // Devolvemos las propiedades que no son unidades
      if (
        !unidadPorPropiedad[key] &&
        !Object.values(unidadPorPropiedad).includes(key)
      ) {
        return {
          ...acc,
          [key]: estilos[key],
        };
      }

      return acc; // Ignorar las propiedades de unidad (como unitWidth)
    }, {});
  };
  const renderBorde = () => {
    return (
      <>
        <div
          style={{
            border: "2px dashed #d1d1d1",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        ></div>
        {
          // Si el nodo seleccionado es el actual, mostrar un borde
          /*   (nodoDrop?.id === id || nodoSelected?.id === id) && (
            <>
              <div
                style={{
                  border: "1px dashed #1890ff",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontSize: "11px",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                }}
              >
                {node?.type}
              </div>
            </>
          ) */
        }
      </>
    );
  };
  const eventHandlers = {
    onClick: (e) => {
      e.stopPropagation();
      if (nodoSelected?.id !== id) {
       /*  selectNode(id); */
      } else {
       /*  selectNode(null); */
      }
    },
    onContextMenu: (e) => {
      e.preventDefault();
      e.stopPropagation();
      /*   selectNode(id);
      setMenuContext({
        visible: true,
        x: e.clientX,
        y: e.clientY,
      }); */
    },
  };

  /*   const estilosConfigSeleccionada = {
    [DISPOSITIVOS.DESKTOP]: {
      estilos: { ...node?.config?.[DISPOSITIVOS.DESKTOP]?.estilos },
    },
    [DISPOSITIVOS.TABLET]: {
      estilos: {
        ...node?.config?.[DISPOSITIVOS.DESKTOP]?.estilos,
        ...node?.config?.[DISPOSITIVOS.TABLET]?.estilos,
      },
    },
    [DISPOSITIVOS.MOBILE]: {
      estilos: {
        ...node?.config?.[DISPOSITIVOS.DESKTOP]?.estilos,
        ...node?.config?.[DISPOSITIVOS.TABLET]?.estilos,
        ...node?.config?.[DISPOSITIVOS.MOBILE]?.estilos,
      },
    },
  };
 */
  /*  const elementStyles = {
    ...(formatearEstilos(estilosConfigSeleccionada?.[modoEdicion]?.estilos) ||
      {}),
    position: "relative",
    boxSizing: "border-box",
    ...(estilosConfigSeleccionada?.[modoEdicion]?.estilos
      ?.estilosPersonalizados || {}),
  };
 */

  return (
    <div
      /*  style={elementStyles}
      {...eventHandlers} */
      onDragStart={(e) => e.preventDefault()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        /*  setNodoDrop(node); */
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        /*   saveState();
        const tipoElementoDrag = e.dataTransfer.getData("componentType");
        console.log("tipoElementoDrag", tipoElementoDrag);
        if (node?.type === "container") {
          addComponent(node?.id, { ...getConfigDefault(tipoElementoDrag) });
        }
        setNodoDrop(null); */
      }}
    >
      {/*    {renderBorde()} */}
      <RenderBlock block={block} />
    </div>
  );
}

export default Block;
