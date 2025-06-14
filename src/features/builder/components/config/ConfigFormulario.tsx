import React from 'react';
import { Block, BlockConfig } from '../../utils/interfaces';
import { FORMULARIO_CONFIG_KEYS } from '../../utils/configKeys';

interface ConfigFormularioProps {
  block: Block;
  config: BlockConfig['config'];
  onChange: (config: BlockConfig['config']) => void;
}

export const ConfigFormulario: React.FC<ConfigFormularioProps> = ({ block, config, onChange }) => {
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
          Nombre del formulario
        </label>
        <input
          type="text"
          value={config[FORMULARIO_CONFIG_KEYS.name] || ''}
          onChange={(e) => handleChange(FORMULARIO_CONFIG_KEYS.name, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: Formulario de contacto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ID del formulario
        </label>
        <input
          type="text"
          value={config[FORMULARIO_CONFIG_KEYS.id] || ''}
          onChange={(e) => handleChange(FORMULARIO_CONFIG_KEYS.id, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: formulario_contacto"
        />
      </div>
    </div>
  );
}; 