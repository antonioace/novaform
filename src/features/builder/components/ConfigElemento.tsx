import React from "react";
import { useBuilder } from "../context/BuilderContext";
import StylePanel from "./tools/StylePanel";
import ContainerMainStylePanel from "./tools/ContainerMainStylePanel";

function ConfigElemento() {
  const { bloqueActual } = useBuilder();

  // Verificar si el elemento seleccionado es el contenedor principal
  const isContainerMainSelected = bloqueActual?.id === "container-main";

  return (
    <div
      className="border-l-[#DDDDDD] border-l flex flex-col h-full w-[240px] max-w-[240px] bg-white overflow-hidden"
      style={{
        position: "fixed",
        right: 0,
        top: "35px",
        height: "calc(100vh - 35px)",
      }}
    >
      {bloqueActual ? (
        <div className="h-full">
          {isContainerMainSelected ? (
            <ContainerMainStylePanel />
          ) : (
            <StylePanel blockId={bloqueActual.id} />
          )}
        </div>
      ) : (
        <div className="bg-gray-50 flex justify-center flex-col items-center p-5 m-5 rounded-2xl border border-gray-200 gap-5">
          <h3 className="font-bold text-gray-800">Información</h3>
          <p className="text-xs text-gray-600 text-center">
            Selecciona un elemento para ver su configuración
          </p>
        </div>
      )}
    </div>
  );
}

export default ConfigElemento;
