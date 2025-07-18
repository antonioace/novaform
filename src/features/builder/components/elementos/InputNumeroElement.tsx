import React from "react";
import { BaseElementProps } from "./types";

const InputNumeroElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <input
      type="number"
      {...eventHandlers}
      style={{
        ...styles,
      }}
      className="input-element-builder"
      placeholder={config?.config?.placeholder as string}
    />
  );
};

export default InputNumeroElement;
