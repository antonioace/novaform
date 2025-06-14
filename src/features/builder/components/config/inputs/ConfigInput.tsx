import React from 'react';
import { Block, BlockConfig } from '../../../utils/interfaces';
import { INPUT_CONFIG_KEYS } from '../../../utils/configKeys';

interface ConfigInputProps {
  block: Block;
  config: BlockConfig['config'];
  onChange: (config: BlockConfig['config']) => void;
}

export const ConfigInput: React.FC<ConfigInputProps> = ({ block, config, onChange }) => {
  const handleChange = (key: string, value: unknown) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Clave del campo
        </label>
        <input
          type="text"
          value={config[INPUT_CONFIG_KEYS.key] || ''}
          onChange={(e) => handleChange(INPUT_CONFIG_KEYS.key, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: nombre_usuario"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Valor por defecto
        </label>
        <input
          type="text"
          value={config[INPUT_CONFIG_KEYS.default_value] || ''}
          onChange={(e) => handleChange(INPUT_CONFIG_KEYS.default_value, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Placeholder
        </label>
        <input
          type="text"
          value={config[INPUT_CONFIG_KEYS.placeholder] || ''}
          onChange={(e) => handleChange(INPUT_CONFIG_KEYS.placeholder, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: Ingrese su nombre"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={config[INPUT_CONFIG_KEYS.is_dynamic] || false}
          onChange={(e) => handleChange(INPUT_CONFIG_KEYS.is_dynamic, e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Es un campo dinámico
        </label>
      </div>

      {config[INPUT_CONFIG_KEYS.is_dynamic] && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la colección
            </label>
            <input
              type="text"
              value={config[INPUT_CONFIG_KEYS.collection_name] || ''}
              onChange={(e) => handleChange(INPUT_CONFIG_KEYS.collection_name, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej: usuarios"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID de la colección
            </label>
            <input
              type="text"
              value={config[INPUT_CONFIG_KEYS.collection_id] || ''}
              onChange={(e) => handleChange(INPUT_CONFIG_KEYS.collection_id, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej: 123456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campo dinámico
            </label>
            <input
              type="text"
              value={config[INPUT_CONFIG_KEYS.dynamic_value_collection] || ''}
              onChange={(e) => handleChange(INPUT_CONFIG_KEYS.dynamic_value_collection, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej: nombre"
            />
          </div>
        </>
      )}

      {/* Configuración específica para select */}
      {block.type === 'INPUT_SELECT' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Configuración del select
          </label>
          <select
            value={config.input_select_config?.datasource || ''}
            onChange={(e) => handleChange('input_select_config', {
              ...config.input_select_config,
              datasource: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="LISTA">Lista</option>
            <option value="JSON">JSON</option>
            <option value="API">API</option>
          </select>
        </div>
      )}
    </div>
  );
}; 