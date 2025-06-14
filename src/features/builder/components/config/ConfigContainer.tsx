import React from "react";
import { Block, BlockConfig } from "../../utils/interfaces";
import { useBuilder } from "../../context/BuilderContext";
import { TIPOS_BLOQUES } from "../../utils/tiposElementos";

// Componentes de configuración específicos
import { ConfigInput } from "./inputs/ConfigInput";
import { ConfigBoton } from "./ConfigBoton";
import { ConfigTexto } from "./ConfigTexto";
import { ConfigImagen } from "./ConfigImagen";
import { ConfigContenedor } from "./ConfigContenedor";
import { ConfigFormulario } from "./ConfigFormulario";

interface ConfigContainerProps {
  block?: Block | null;
}

const ConfigContainer: React.FC<ConfigContainerProps> = ({ block }) => {
  const { updateBlockConfig, configList } = useBuilder();

  // Obtener la configuración actual del bloque
  const currentConfig =
    configList.find((config) => config.blockId === block?.id)?.config || {};

  const handleConfigChange = (newConfig: BlockConfig["config"]) => {
    if (!block) return;
    updateBlockConfig(block.id, newConfig);
  };

  // Renderizar el componente de configuración específico según el tipo de bloque
  const renderConfigComponent = () => {
    if (!block?.type) return null;

    // Configuraciones para inputs
    if (block.type.startsWith("INPUT_")) {
      return (
        <ConfigInput
          block={block}
          config={currentConfig}
          onChange={handleConfigChange}
        />
      );
    }

    // Configuraciones específicas por tipo
    switch (block?.type) {
      case TIPOS_BLOQUES.BOTON:
        return (
          <ConfigBoton
            block={block}
            config={currentConfig}
            onChange={handleConfigChange}
          />
        );
      case TIPOS_BLOQUES.TEXTO:
        return (
          <ConfigTexto
            block={block}
            config={currentConfig}
            onChange={handleConfigChange}
          />
        );
      case TIPOS_BLOQUES.IMAGEN:
        return (
          <ConfigImagen
            block={block}
            config={currentConfig}
            onChange={handleConfigChange}
          />
        );
      case TIPOS_BLOQUES.CONTENEDOR:
        return (
          <ConfigContenedor
            block={block}
            config={currentConfig}
            onChange={handleConfigChange}
          />
        );
      case TIPOS_BLOQUES.FORMULARIO:
        return (
          <ConfigFormulario
            block={block}
            config={currentConfig}
            onChange={handleConfigChange}
          />
        );
      default:
        return (
          <div className="p-4 text-gray-500">
            No hay configuración disponible para este tipo de elemento
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-[#232323] text-xs cursor-pointer font-semibold mb-5">
        Configuración de {block?.name || block?.type}
      </h3>
      {renderConfigComponent()}
    </div>
  );
};

export default ConfigContainer;
