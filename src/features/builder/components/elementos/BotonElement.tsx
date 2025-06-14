import React from "react";
import { BaseElementProps } from "./types";

const BotonElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <button
      {...eventHandlers}
      style={{
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        ...styles,
      }}
    >
      {config?.config?.boton_text as string || "Botón"}
    </button>
  );
};

export default BotonElement;
