import React from "react";
import { BaseElementProps } from "./types";

const TablaElement: React.FC<BaseElementProps> = ({ block, styles, eventHandlers }) => {
  const datosEjemplo = {
    columnas: ["ID", "Nombre", "Email", "Rol"],
    filas: [
      ["1", "Juan Pérez", "juan@ejemplo.com", "Admin"],
      ["2", "María García", "maria@ejemplo.com", "Usuario"],
      ["3", "Carlos López", "carlos@ejemplo.com", "Editor"],
    ],
  };

  return (
    <div className="w-full" style={styles} {...eventHandlers}>
      {block.name && (
        <h3 className="font-semibold text-gray-800 mb-2">{block.name}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {datosEjemplo.columnas.map((columna, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosEjemplo.filas.map((fila, indexFila) => (
              <tr key={indexFila}>
                {fila.map((celda, indexCelda) => (
                  <td
                    key={indexCelda}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.description && (
        <p className="text-sm text-gray-600 mt-2">{block.description}</p>
      )}
    </div>
  );
};

export default TablaElement; 