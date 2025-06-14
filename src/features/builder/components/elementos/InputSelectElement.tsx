import React from "react";
import { BaseElementProps } from "./types";

const InputSelectElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  // Opciones de ejemplo - en un caso real vendrían de la configuración del bloque
  const options = [
    { value: "", label: block.name || "Seleccione una opción" },
    { value: "opcion1", label: "Opción 1" },
    { value: "opcion2", label: "Opción 2" },
    { value: "opcion3", label: "Opción 3" },
  ];

  return (
    <select
      {...eventHandlers}
      style={{
        ...styles,
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelectElement;
