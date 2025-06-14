import { TIPOS_BLOQUES } from "./tiposElementos";
import { IPage } from "@/features/page/types";
import { 
  INPUT_CONFIG_KEYS, 
  BOTON_CONFIG_KEYS, 
  TEXTO_CONFIG_KEYS, 
  IMAGEN_CONFIG_KEYS, 
  FORMULARIO_CONFIG_KEYS, 
  CONTENEDOR_CONFIG_KEYS 
} from './configKeys';

export enum DISPOSITIVOS {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

// Bloque para la estructura visual (solo layout)
export interface Block {
  id: string;
  type?: keyof typeof TIPOS_BLOQUES;
  name?: string;
  description?: string;
  children?: Block[];
}

// Configuración de estilos para cada bloque
export interface BlockStyles {
  blockId: string;
  styles: {
    [key in DISPOSITIVOS]?: {
      // Estilos CSS específicos para cada dispositivo
      backgroundColor?: string;
      color?: string;
      fontSize?: string;
      padding?: string;
      margin?: string;
      width?: string;
      height?: string;
      border?: string;
      borderRadius?: string;
      boxShadow?: string;
      display?: string;
      flexDirection?: string;
      justifyContent?: string;
      alignItems?: string;
      gap?: string;
      // Agregar más propiedades CSS según necesites
      [key: string]: string | number | undefined;
    };
  };
}

export enum VALIDATION_TYPES {
  REQUIRED = "required",
  MIN_LENGTH = "minLength",
  MAX_LENGTH = "maxLength",
  PATTERN = "pattern",
  MIN_VALUE = "minValue",
  MAX_VALUE = "maxValue",
  EMAIL = "email",
  URL = "url",
  NUMBER = "number",
  CUSTOM = "custom",
}
export enum OPERATORS {
  EQUAL = "equal",
  NOT_EQUAL = "not_equal",
  CONTAINS = "contains",
  NOT_CONTAINS = "not_contains",
  STARTS_WITH = "starts_with",
  ENDS_WITH = "ends_with",
  IS_EMPTY = "is_empty",
  IS_NOT_EMPTY = "is_not_empty",
  IS_NULL = "is_null",
  IS_NOT_NULL = "is_not_null",
  IS_TRUE = "is_true",
}
export enum TYPE_FIELDS {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  BOOLEAN = "boolean",
  SELECT = "select",
}

export enum DATA_SOURCE {
  LISTA = "LISTA",
  JSON = "JSON",
  API = "API",
}

export enum ACTION_TYPES {
  REDIRECT = "REDIRECT",
  RESET_VALUES = "RESET_VALUES",
  SHOW_MESSAGE = "SHOW_MESSAGE",
  CLEAR_VALUES_FORM = "CLEAR_VALUES_FORM",
  LOAD_DATA_COLLECTION = "LOAD_DATA_COLLECTION",
  DELETE_DATA_COLLECTION = "DELETE_DATA_COLLECTION",
  UPDATE_DATA_COLLECTION = "UPDATE_DATA_COLLECTION",
  ADD_DATA_COLLECTION = "ADD_DATA_COLLECTION",
  RELOAD_PAGE = "RELOAD_PAGE",
}
export interface Validation {
  validation_type: VALIDATION_TYPES;
  validation_type_field: TYPE_FIELDS;
  validation_value: string;
  validation_message: string;
}

export interface Dependencie {
  dependencia_field: string;
  dependencie_operator: OPERATORS;
  dependencie_type_field: TYPE_FIELDS;
  dependencie_value: string;
}

export interface Action {
  action_type: string;
  action_config: {
    [key: string]: unknown;
  };
}
export interface ConfigAction {
  actions: Action[];
}

export interface ConfigInputSelect {
  datasource: DATA_SOURCE;
  datasource_config_list?: {
    label: string;
    value: string;
  };
  datasource_config_api?: {
    url: string;
    method: string;
    headers: {
      [key: string]: string;
    };
  };
  datasource_config_json?: {
    key_label: string;
    key_value: string;
    json: string;
  };
}
// Configuración funcional para cada bloque
export interface BlockConfig {
  blockId: string;
  config: {
    // Configuración común
    isVisible?: boolean;

    // Configuración de inputs
    [INPUT_CONFIG_KEYS.key]?: string;
    [INPUT_CONFIG_KEYS.is_dynamic]?: boolean;
    [INPUT_CONFIG_KEYS.collection_name]?: string;
    [INPUT_CONFIG_KEYS.collection_id]?: string;
    [INPUT_CONFIG_KEYS.dynamic_value_collection]?: string;
    [INPUT_CONFIG_KEYS.default_value]?: string;
    [INPUT_CONFIG_KEYS.placeholder]?: string;
    [INPUT_CONFIG_KEYS.validations]?: Validation[];
    [INPUT_CONFIG_KEYS.dependencies]?: Dependencie[];
    [INPUT_CONFIG_KEYS.select_config]?: ConfigInputSelect;

    // Configuración de botones
    [BOTON_CONFIG_KEYS.text]?: string;
    [BOTON_CONFIG_KEYS.action]?: string;
    [BOTON_CONFIG_KEYS.action_config]?: ConfigAction;

    // Configuración de textos
    [TEXTO_CONFIG_KEYS.content]?: string;
    [TEXTO_CONFIG_KEYS.tooltip]?: string;

    // Configuración de imágenes
    [IMAGEN_CONFIG_KEYS.src]?: string;

    // Configuración de formularios
    [FORMULARIO_CONFIG_KEYS.name]?: string;
    [FORMULARIO_CONFIG_KEYS.id]?: string;

    // Configuración de contenedores
    [CONTENEDOR_CONFIG_KEYS.is_duplicate]?: boolean;
    [CONTENEDOR_CONFIG_KEYS.duplicate_config]?: {
      duplicate_name: string;
      duplicate_id: string;
    };

    // Configuraciones específicas del tipo de bloque
    [key: string]: unknown;
  };
}

export interface ContextMenuState {
  isVisible: boolean;
  x: number;
  y: number;
  targetBlock: Block | null;
}

export interface BuilderContextType {
  // Gestión de dispositivos
  dispositivoActual: DISPOSITIVOS;
  setDispositivoActual: (dispositivo: DISPOSITIVOS) => void;

  // Bloque actual seleccionado
  bloqueActual: Block | null;
  setBloqueActual: (bloque: Block | null) => void;

  // SEPARACIÓN DE RESPONSABILIDADES
  // 1. Lista de bloques (solo estructura)
  blocksList: Block[];
  setBlocksList: (bloques: Block[]) => void;

  // 2. Lista de estilos (solo apariencia)
  stylesList: BlockStyles[];
  setStylesList: (estilos: BlockStyles[]) => void;

  // 3. Lista de configuraciones (solo comportamiento)
  configList: BlockConfig[];
  setConfigList: (configuraciones: BlockConfig[]) => void;

  // Estilos del contenedor principal
  containerMainStyles: {
    [key in DISPOSITIVOS]?: React.CSSProperties;
  };
  setContainerMainStyles: (styles: {
    [key in DISPOSITIVOS]?: React.CSSProperties;
  }) => void;

  // Métodos auxiliares para gestionar la sincronización
  addBlock: (block: Block, styles?: BlockStyles, config?: BlockConfig) => void;
  removeBlock: (blockId: string) => void;
  updateBlockStyles: (blockId: string, styles: BlockStyles["styles"]) => void;
  updateBlockConfig: (blockId: string, config: BlockConfig["config"]) => void;
  bloqueActualHover: Block | null;
  setBloqueActualHover: (bloque: Block | null) => void;
  duplicateBlock: (blockId: string) => void;
  getConfigAndStylesByBlockId: (blockId: string) => { blockList: Block[]; stylesList: BlockStyles[]; configList: BlockConfig[]; } | null;

  // Gestión del menú contextual
  contextMenu: ContextMenuState;
  showContextMenu: (event: React.MouseEvent, block: Block) => void;
  hideContextMenu: () => void;

  // Nuevas funciones de manipulación de bloques
  selectParent: (blockId: string) => void;
  wrapInContainer: (blockId: string) => void;

  // Gestión de página
  loadingPage: boolean;
  savingPage: boolean;
  page: IPage | null;
  savePage: () => Promise<boolean>;

  // Métodos para mover bloques
  moveBlockUp: (blockId: string) => void;
  moveBlockDown: (blockId: string) => void;
  moveBlockForward: (blockId: string) => void;
  moveBlockBackward: (blockId: string) => void;
  addAsChild: (blocks: Block[], parentId: string, newChild: Block) => Block[];
}

export interface IElementBlockProps {
  block: Block;
}
