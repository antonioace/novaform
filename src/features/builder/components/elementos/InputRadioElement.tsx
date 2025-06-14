import React from "react";
import { BaseElementProps } from "./types";

const InputRadioElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const opciones = ["Primera opción", "Segunda opción", "Tercera opción"];

  return (
    <div style={styles} {...eventHandlers}>
      <div className="space-y-2">
        {opciones.map((opcion, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={`radio-group-${block.id}`}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label className="ml-2 text-sm text-gray-700">{opcion}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputRadioElement;
