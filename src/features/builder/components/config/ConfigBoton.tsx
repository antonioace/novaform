import React from 'react';
import { Block, BlockConfig } from '../../utils/interfaces';
import { BOTON_CONFIG_KEYS } from '../../utils/configKeys';

interface ConfigBotonProps {
  block: Block;
  config: BlockConfig['config'];
  onChange: (config: BlockConfig['config']) => void;
}

export const ConfigBoton: React.FC<ConfigBotonProps> = ({ block, config, onChange }) => {
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
          Texto del botón
        </label>
        <input
          type="text"
          value={config[BOTON_CONFIG_KEYS.text] || ""}
          onChange={(e) => handleChange(BOTON_CONFIG_KEYS.text, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ej: Guardar"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Acción del botón
        </label>
        <select
          value={config[BOTON_CONFIG_KEYS.action] || ""}
          onChange={(e) => handleChange(BOTON_CONFIG_KEYS.action, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Seleccione una acción</option>
          <option value="submit">Enviar formulario</option>
          <option value="reset">Limpiar formulario</option>
          <option value="custom">Acción personalizada</option>
        </select>
      </div>

      {config[BOTON_CONFIG_KEYS.action] === "custom" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Configuración de la acción
          </label>
          <textarea
            value={JSON.stringify(config[BOTON_CONFIG_KEYS.action_config] || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsedValue = JSON.parse(e.target.value);
                handleChange(BOTON_CONFIG_KEYS.action_config, parsedValue);
              } catch (error) {
                // Si hay un error al parsear el JSON, no actualizamos el valor
                console.error("Error al parsear JSON:", error);
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder='{"actions": []}'
          />
        </div>
      )}
    </div>
  );
}; 