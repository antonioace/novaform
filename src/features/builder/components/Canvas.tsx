import React from "react";
import { useBuilder } from "../context/BuilderContext";

enum DISPOSITIVOS {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

const Canvas = () => {
  const { dispositivoActual, bloqueActual } = useBuilder();
  console.log(dispositivoActual);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    /*   setNodoDrop(null); */
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

  return (
    <>
      {" "}
      <div
        className="canvas flex  flex-grow overflow-auto relative"
        style={{
          marginRight: "240px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          minHeight: "500px",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          style={{
            border: !bloqueActual?.id ? "2px dashed #1890ff" : "none",

            flexGrow: 1,
            width: getWidthPorDispositivo(dispositivoActual),
            minWidth: getWidthPorDispositivo(dispositivoActual),
            height: "100%",
            position: "relative",
          }}
        >
          {true && (
            <>
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
                  zIndex: 2,
                }}
              >
                Principal
              </div>
            </>
          )}
        </div>
      </div>
      {/*   <DropdownConstructor /> */}
    </>
  );
};

export default Canvas;
