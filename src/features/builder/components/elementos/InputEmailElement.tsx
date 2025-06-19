import React from "react";
import { BaseElementProps } from "./types";

const InputEmailElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <input
      type="email"
      {...eventHandlers}
      style={{
        ...styles,
      }}
      className="input-element-builder"
      placeholder={config?.config?.placeholder as string}
    />
  );
};

export default InputEmailElement;
