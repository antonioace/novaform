import React from "react";
import { BaseElementProps } from "./types";

const InputCheckboxElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
}) => {
  return <input type="checkbox" style={styles} {...eventHandlers} />;
};

export default InputCheckboxElement;
