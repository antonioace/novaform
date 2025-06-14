import React from 'react';
import { Block, BlockConfig } from '../../utils/interfaces';
import { CONTENEDOR_CONFIG_KEYS } from '../../utils/configKeys';

interface ConfigContenedorProps {
  block: Block;
  config: BlockConfig['config'];
  onChange: (config: BlockConfig['config']) => void;
}

export const ConfigContenedor: React.FC<ConfigContenedorProps> = ({ block, config, onChange }) => {
  const handleChange = (key: string, value: unknown) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={config[CONTENEDOR_CONFIG_KEYS.is_duplicate] || false}
          onChange={(e) =>
            handleChange(CONTENEDOR_CONFIG_KEYS.is_duplicate, e.target.checked)
          }
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Es un contenedor duplicado
        </label>
      </div>

      {config[CONTENEDOR_CONFIG_KEYS.is_duplicate] && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del contenedor duplicado
            </label>
            <input
              type="text"
              value={
                config[CONTENEDOR_CONFIG_KEYS.duplicate_config]?.duplicate_name ||
                ""
              }
              onChange={(e) =>
                handleChange(CONTENEDOR_CONFIG_KEYS.duplicate_config, {
                  ...config[CONTENEDOR_CONFIG_KEYS.duplicate_config],
                  duplicate_name: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej: Contenedor Principal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID del contenedor duplicado
            </label>
            <input
              type="text"
              value={
                config[CONTENEDOR_CONFIG_KEYS.duplicate_config]?.duplicate_id || ""
              }
              onChange={(e) =>
                handleChange(CONTENEDOR_CONFIG_KEYS.duplicate_config, {
                  ...config[CONTENEDOR_CONFIG_KEYS.duplicate_config],
                  duplicate_id: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej: contenedor_principal"
            />
          </div>
        </>
      )}
    </div>
  );
}; 