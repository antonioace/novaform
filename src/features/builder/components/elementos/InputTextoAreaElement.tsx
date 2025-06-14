import React from "react";
import { BaseElementProps } from "./types";

const InputTextoAreaElement: React.FC<BaseElementProps> = ({ block, styles, eventHandlers }) => {
  return (
    <textarea
      {...eventHandlers}
      style={{
        padding: "8px 12px",
        border: "1px solid #d1d5db",
        borderRadius: "4px",
        fontSize: "14px",
        width: "100%",
        minHeight: "100px",
        resize: "vertical",
        ...styles,
      }}
      placeholder={block.name || "Ingrese texto"}
      className="builder-textarea"
    />
  );
};

export default InputTextoAreaElement; 