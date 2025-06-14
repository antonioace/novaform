import React from "react";
import { Block, BlockConfig } from "../../utils/interfaces";
import { IMAGEN_CONFIG_KEYS } from "../../utils/configKeys";

interface ConfigImagenProps {
  block: Block;
  config: BlockConfig["config"];
  onChange: (config: BlockConfig["config"]) => void;
}

export const ConfigImagen: React.FC<ConfigImagenProps> = ({
  block,
  config,
  onChange,
}) => {
  const handleChange = (key: string, value: unknown) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL de la imagen
        </label>
        <input
          type="text"
          value={config[IMAGEN_CONFIG_KEYS.src] || ""}
          onChange={(e) => handleChange(IMAGEN_CONFIG_KEYS.src, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      {config[IMAGEN_CONFIG_KEYS.src] && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vista previa
          </label>
          <img
            src={config[IMAGEN_CONFIG_KEYS.src]}
            alt="Vista previa"
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};
