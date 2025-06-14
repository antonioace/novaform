import React from "react";
import { Block, BlockConfig } from "../../utils/interfaces";
import { TEXTO_CONFIG_KEYS } from "../../utils/configKeys";

interface ConfigTextoProps {
  block: Block;
  config: BlockConfig["config"];
  onChange: (config: BlockConfig["config"]) => void;
}

export const ConfigTexto: React.FC<ConfigTextoProps> = ({
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
          Contenido del texto
        </label>
        <textarea
          value={config[TEXTO_CONFIG_KEYS.content] || ""}
          onChange={(e) =>
            handleChange(TEXTO_CONFIG_KEYS.content, e.target.value)
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={4}
          placeholder="Ingrese el texto aquí..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tooltip
        </label>
        <input
          type="text"
          value={config[TEXTO_CONFIG_KEYS.tooltip] || ""}
          onChange={(e) =>
            handleChange(TEXTO_CONFIG_KEYS.tooltip, e.target.value)
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Texto que aparece al pasar el mouse"
        />
      </div>
    </div>
  );
};
