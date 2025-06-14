import React from "react";
import { BaseElementProps } from "./types";

const ListaElement: React.FC<BaseElementProps> = ({ block, styles, eventHandlers }) => {
  const itemsEjemplo = [
    "Primer elemento de la lista",
    "Segundo elemento de la lista",
    "Tercer elemento de la lista",
    "Cuarto elemento de la lista",
  ];

  return (
    <div className="w-full" style={styles} {...eventHandlers}>
      {block.name && (
        <h3 className="font-semibold text-gray-800 mb-2">{block.name}</h3>
      )}
      <ul className="space-y-2">
        {itemsEjemplo.map((item, index) => (
          <li
            key={index}
            className="flex items-start space-x-2 text-gray-700"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {block.description && (
        <p className="text-sm text-gray-600 mt-2">{block.description}</p>
      )}
    </div>
  );
};

export default ListaElement; 