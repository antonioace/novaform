import { useBuilder } from "../context/BuilderContext";
import { Block, BlockConfig } from "../utils/interfaces";
import { TIPOS_BLOQUES } from "../utils/tiposElementos";
import { 
  INPUT_CONFIG_KEYS, 
  BOTON_CONFIG_KEYS, 
  TEXTO_CONFIG_KEYS, 
  IMAGEN_CONFIG_KEYS, 
  FORMULARIO_CONFIG_KEYS, 
  CONTENEDOR_CONFIG_KEYS 
} from "../utils/configKeys";

export const useBlockConfig = (block: Block) => {
  const { configList } = useBuilder();

  // Obtener configuración del bloque específico

  const blockConfig = configList.find((config) => config.blockId === block.id);
  const config = blockConfig?.config || {};

  // Configuración por defecto según el tipo de bloque
  const getDefaultConfig = (): BlockConfig["config"] => {
    const defaultConfig: BlockConfig["config"] = {
      isVisible: true,
    };

    // Configuración específica según el tipo de bloque
    if (block.type?.startsWith("INPUT_")) {
      return {
        ...defaultConfig,
        [INPUT_CONFIG_KEYS.key]: "",
        [INPUT_CONFIG_KEYS.is_dynamic]: false,
        [INPUT_CONFIG_KEYS.collection_name]: "",
        [INPUT_CONFIG_KEYS.collection_id]: "",
        [INPUT_CONFIG_KEYS.dynamic_value_collection]: "",
        [INPUT_CONFIG_KEYS.default_value]: "",
        [INPUT_CONFIG_KEYS.placeholder]: "",
        [INPUT_CONFIG_KEYS.validations]: [],
        [INPUT_CONFIG_KEYS.dependencies]: [],
      };
    }

    switch (block.type) {
      case TIPOS_BLOQUES.BOTON:
        return {
          ...defaultConfig,
          [BOTON_CONFIG_KEYS.text]: "Botón",
          [BOTON_CONFIG_KEYS.action]: "",
          [BOTON_CONFIG_KEYS.action_config]: { actions: [] },
        };

      case TIPOS_BLOQUES.TEXTO:
        return {
          ...defaultConfig,
          [TEXTO_CONFIG_KEYS.content]: "Texto",
          [TEXTO_CONFIG_KEYS.tooltip]: "",
        };

      case TIPOS_BLOQUES.IMAGEN:
        return {
          ...defaultConfig,
          [IMAGEN_CONFIG_KEYS.src]: "",
        };

      case TIPOS_BLOQUES.FORMULARIO:
        return {
          ...defaultConfig,
          [FORMULARIO_CONFIG_KEYS.name]: "Formulario",
          [FORMULARIO_CONFIG_KEYS.id]: `form_${Date.now()}`,
        };

      case TIPOS_BLOQUES.CONTENEDOR:
        return {
          ...defaultConfig,
          [CONTENEDOR_CONFIG_KEYS.is_duplicate]: false,
          [CONTENEDOR_CONFIG_KEYS.duplicate_config]: {
            duplicate_name: "",
            duplicate_id: "",
          },
        };

      default:
        return defaultConfig;
    }
  };

  // Combinar configuración por defecto con configuración específica del bloque
  const finalConfig = {
    ...getDefaultConfig(),
    ...config,
  };

  return {
    config: finalConfig,
    hasConfig: !!blockConfig,
  };
};
