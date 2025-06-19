import React from "react";
import { BaseElementProps } from "./types";

const InputTextoAreaElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  return (
    <textarea
      {...eventHandlers}
      style={{
        ...styles,
      }}
      placeholder={block.name || "Ingrese texto"}
      className="builder-textarea"
    />
  );
};

export default InputTextoAreaElement;
