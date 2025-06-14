import React, { useState } from "react";
import { BaseElementProps } from "./types";
import RenderBlock from "../RenderBlock";

const CuestionarioElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const [preguntas] = useState([
    {
      id: 1,
      tipo: "texto",
      pregunta: "¿Cuál es tu nombre completo?",
      requerido: true,
    },
    {
      id: 2,
      tipo: "seleccion",
      pregunta: "¿Cuál es tu rango de edad?",
      opciones: ["18-25", "26-35", "36-45", "46+"],
      requerido: true,
    },
    {
      id: 3,
      tipo: "multiple",
      pregunta: "¿Qué temas te interesan? (Selecciona todos los que apliquen)",
      opciones: ["Tecnología", "Deportes", "Arte", "Música", "Viajes"],
      requerido: false,
    },
  ]);

  return (
    <div className="space-y-6" style={styles} {...eventHandlers}>
      <form className="space-y-6">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                {pregunta.pregunta}
                {pregunta.requerido && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </span>

              {pregunta.tipo === "texto" && (
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required={pregunta.requerido}
                />
              )}

              {pregunta.tipo === "seleccion" && (
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required={pregunta.requerido}
                >
                  <option value="">Selecciona una opción</option>
                  {pregunta.opciones?.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              )}

              {pregunta.tipo === "multiple" && (
                <div className="mt-2 space-y-2">
                  {pregunta.opciones?.map((opcion) => (
                    <div key={opcion} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {opcion}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </label>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar respuestas
          </button>
        </div>
      </form>
      {block?.children &&
        block?.children.map((child) => (
          <RenderBlock key={child.id} block={child} />
        ))}
    </div>
  );
};

export default CuestionarioElement;
