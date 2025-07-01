import { TIPOS_BLOQUES } from './tiposElementos';

// Claves de configuración para inputs
export const INPUT_CONFIG_KEYS = {
  key: 'input_key',
  is_dynamic: 'input_is_dynamic',
  collection_name: 'input_collection_name',
  collection_id: 'input_collection_id',
  dynamic_value_collection: 'input_dynamic_value_collection',
  default_value: 'input_default_value',
  placeholder: 'input_placeholder',
  validations: 'input_validations',
  dependencies: 'input_dependencies',
  select_config: 'input_select_config',
  texto_enriquecido: 'input_content_rich_text',
} as const;

// Claves de configuración para botones
export const BOTON_CONFIG_KEYS = {
  text: 'boton_text',
  action: 'boton_action',
  action_config: 'boton_action_config',
} as const;

// Claves de configuración para textos
export const TEXTO_CONFIG_KEYS = {
  content: 'texto_content',
  tooltip: 'texto_tooltip',
} as const;

// Claves de configuración para imágenes
export const IMAGEN_CONFIG_KEYS = {
  src: 'imagen_src',
} as const;

// Claves de configuración para formularios
export const FORMULARIO_CONFIG_KEYS = {
  name: 'formulario_name',
  id: 'formulario_id',
} as const;

// Claves de configuración para contenedores
export const CONTENEDOR_CONFIG_KEYS = {
  is_duplicate: 'contenedor_is_duplicate',
  duplicate_config: 'contenedot_is_duplicate_config',
} as const;

export const CUENTIONARIO_CONFIG_KEYS = {
  name: 'cuestionario_name',
  description: 'cuestionario_description',
  questions: 'cuestionario_questions',

} as const;

// Mapeo de tipos de bloques a sus claves de configuración
export const BLOCK_CONFIG_KEYS = {
  [TIPOS_BLOQUES.INPUT_TEXTO]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_NUMERO]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_EMAIL]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_PASSWORD]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_SELECT]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_CHECKBOX]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_RADIO]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_SWITCH]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_TEXTO_AREA]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_TEXTO_ENRIQUECIDO]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.INPUT_SUBIR_IMAGEN]: INPUT_CONFIG_KEYS,
  [TIPOS_BLOQUES.BOTON]: BOTON_CONFIG_KEYS,
  [TIPOS_BLOQUES.TEXTO]: TEXTO_CONFIG_KEYS,
  [TIPOS_BLOQUES.IMAGEN]: IMAGEN_CONFIG_KEYS,
  [TIPOS_BLOQUES.FORMULARIO]: FORMULARIO_CONFIG_KEYS,
  [TIPOS_BLOQUES.CONTENEDOR]: CONTENEDOR_CONFIG_KEYS,
} as const;

// Tipo para obtener las claves de configuración de un tipo de bloque
export type BlockConfigKeys<T extends keyof typeof TIPOS_BLOQUES> = 
  T extends keyof typeof BLOCK_CONFIG_KEYS 
    ? typeof BLOCK_CONFIG_KEYS[T] 
    : never;

// Tipo para obtener el tipo de valor de una clave de configuración
export type ConfigValueType<T extends string> = {
  [K in T]: unknown;
}[T]; 