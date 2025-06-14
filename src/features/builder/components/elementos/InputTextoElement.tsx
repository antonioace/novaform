import React from "react";
import { BaseElementProps } from "./types";

const InputTextoElement: React.FC<BaseElementProps> = ({ block, styles, eventHandlers }) => {
  return (
    <input
      type="text"
      {...eventHandlers}
      style={{
        padding: "8px 12px",
        border: "1px solid #d1d5db",
        borderRadius: "4px",
        fontSize: "14px",
        width: "100%",
        ...styles,
      }}
      placeholder={block.name || "Ingrese texto"}
      className="builder-input"
    />
  );
};

export default InputTextoElement; 