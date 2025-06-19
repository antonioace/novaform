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
      onClick={(e) => {
        e.preventDefault();
        eventHandlers?.onClick?.(e);
      }}
      style={{
        ...styles,
      }}
    >
      {(config?.config?.boton_text as string) || "Botón"}
    </button>
  );
};

export default BotonElement;
