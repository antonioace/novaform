import React from "react";

function Config() {
  return (
    <div
      className="border-l-[#DDDDDD] border-l flex flex-col h-full w-[240px] max-w-[240px] bg-[#fff] overflow-hidden"
      style={{
        position: "fixed",
        right: 0,
        top: "35px",
        height: "calc(100vh - 35px)",
      }}
    >
      <div className="bg-[#f4f5f6] flex justify-center flex-col items-center p-5 m-5 rounded-2xl border border-[#f0f0f0] gap-5">
        <h3 className="font-bold text-[#121212]">Información</h3>
        <p className="text-xs">
          Selecciona un elemento para ver su configuración
        </p>
      </div>
    </div>
  );
}

export default Config;
