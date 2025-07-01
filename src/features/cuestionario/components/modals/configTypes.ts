import { CONTENT_TYPES } from "./contentTypes";

interface BaseQuestionCfg {
  id: string; // UUID interno
  type: (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
  label: string; // Texto visible al usuario
  description?: string; // Texto visible al usuario
  // Lógica condicional ("show if …")
}
/* ---- 1. Catálogo de validaciones ---------------------------------- */
type ValidationType =
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "min" // numérico / fecha
  | "max"
  | "custom"; // función bool

interface FieldValidation {
  id: string;
  type: ValidationType;
  value?: number | string | RegExp | ((v: unknown) => boolean);
  message: string; // Texto de error a mostrar
}

/* ---- 2. Sub-campo de ContactInfo con validaciones ----------------- */
interface ContactSubField {
  id: string;
  key: string;
  label: string;
  type: "text" | "email" | "phone" | "url" | "address" | "date" | "number";
  placeholder?: string;
  helpText?: string;
  validations?: FieldValidation[]; // ← aquí el array pedido
}

/* ---- 3. Pregunta ContactInfo completa ----------------------------- */
export interface ContactInfoCfg extends BaseQuestionCfg {
  type: typeof CONTENT_TYPES.CONTACT_INFO;
  fields: ContactSubField[];
}
/* ---------- 1. Estructura de opciones reutilizable ------------------ */
interface OptionBase {
  label: string;
  value: string;
}
interface ImageOption extends OptionBase {
  imageUrl: string; // Solo para IMAGE_CHOICE
}
type Option = OptionBase | ImageOption;

/* ---------- 2. Tres formas de inyectar opciones --------------------- */
type OptionSource =
  /* A) JSON embebido o cargado desde archivo ------------------------- */
  | {
      mode: "static"; // “json” en tu UI
      options: Option[]; // Array plano dentro del schema
    }
  /* B) Manual via FieldArray (editor) -------------------------------- */
  | {
      mode: "fieldArray"; // Construidas a mano en el builder
      options: Option[]; // El resultado se guarda igual
    }
  /* C) Dinámico desde API -------------------------------------------- */
  | {
      mode: "api"; // Petición en runtime
      url: string; // Endpoint
      method?: "GET" | "POST";
      headers?: Record<string, string>;
      queryParams?: Record<string, string>;
      responsePath: string; // Ej. "data.items"
      map: {
        // Qué prop del JSON va a qué
        label: string; // "name"
        value: string; // "id"
        imageUrl?: string; // "thumb" (solo si aplica)
      };
      cacheSeconds?: number; // TTL opcional
    };

/* ---------- 3. Preguntas de elección reutilizando OptionSource ------ */
interface ChoiceBase extends BaseQuestionCfg {
  optionSource: OptionSource; // ← aquí la magia
  randomize?: boolean;
  allowOther?: boolean;
}

export interface MultipleChoiceCfg extends ChoiceBase {
  type: typeof CONTENT_TYPES.MULTIPLE_CHOICE;
}

export interface DropdownCfg extends ChoiceBase {
  type: typeof CONTENT_TYPES.DROPDOWN;
  searchable?: boolean;
}

export interface CheckboxCfg extends ChoiceBase {
  type: typeof CONTENT_TYPES.CHECKBOX;
  minSelections?: number;
  maxSelections?: number;
}

export interface ImageChoiceCfg extends ChoiceBase {
  type: typeof CONTENT_TYPES.IMAGE_CHOICE;
  multiple?: boolean;
}
