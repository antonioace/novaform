import React from "react";
import { BaseElementProps } from "./types";

const InputTextoElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  return (
    <input
      type="text"
      {...eventHandlers}
      style={{
        ...styles,
      }}
      placeholder={block.name || "Ingrese texto"}
      className="input-element-builder"
    />
  );
};

export default InputTextoElement;
