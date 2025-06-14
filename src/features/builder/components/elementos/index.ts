// Elementos básicos
export { default as BotonElement } from "./BotonElement";
export { default as TextoElement } from "./TextoElement";
export { default as ImagenElement } from "./ImagenElement";
export { default as VideoElement } from "./VideoElement";
export { default as TablaElement } from "./TablaElement";
export { default as ListaElement } from "./ListaElement";
export { default as ContenedorElement } from "./ContenedorElement";

// Formularios
export { default as FormularioElement } from "./FormularioElement";

// Inputs de formulario
export { default as InputTextoElement } from "./InputTextoElement";
export { default as InputNumeroElement } from "./InputNumeroElement";
export { default as InputEmailElement } from "./InputEmailElement";
export { default as InputPasswordElement } from "./InputPasswordElement";
export { default as InputSelectElement } from "./InputSelectElement";
export { default as InputCheckboxElement } from "./InputCheckboxElement";
export { default as InputRadioElement } from "./InputRadioElement";
export { default as InputSwitchElement } from "./InputSwitchElement";
export { default as InputTextoAreaElement } from "./InputTextoAreaElement";
export { default as InputTextoEnriquecidoElement } from "./InputTextoEnriquecidoElement";
export { default as InputSubirImagenElement } from "./InputSubirImagenElement";

// Elementos complejos
export { default as CuestionarioElement } from "./CuestionarioElement";

// Exportar tipos
export type { BaseElementProps } from "./types";

// Mapeo de tipos a componentes
import BotonElement from "./BotonElement";
import TextoElement from "./TextoElement";
import ImagenElement from "./ImagenElement";
import VideoElement from "./VideoElement";
import TablaElement from "./TablaElement";
import ListaElement from "./ListaElement";
import ContenedorElement from "./ContenedorElement";
import FormularioElement from "./FormularioElement";
import InputTextoElement from "./InputTextoElement";
import InputNumeroElement from "./InputNumeroElement";
import InputEmailElement from "./InputEmailElement";
import InputPasswordElement from "./InputPasswordElement";
import InputSelectElement from "./InputSelectElement";
import InputCheckboxElement from "./InputCheckboxElement";
import InputRadioElement from "./InputRadioElement";
import InputSwitchElement from "./InputSwitchElement";
import InputTextoAreaElement from "./InputTextoAreaElement";
import InputTextoEnriquecidoElement from "./InputTextoEnriquecidoElement";
import InputSubirImagenElement from "./InputSubirImagenElement";
import CuestionarioElement from "./CuestionarioElement";
import { TIPOS_BLOQUES } from "../../utils/tiposElementos";

export const ELEMENTOS_COMPONENTES = {
  [TIPOS_BLOQUES.BOTON]: BotonElement,
  [TIPOS_BLOQUES.TEXTO]: TextoElement,
  [TIPOS_BLOQUES.IMAGEN]: ImagenElement,
  [TIPOS_BLOQUES.VIDEO]: VideoElement,
  [TIPOS_BLOQUES.TABLA]: TablaElement,
  [TIPOS_BLOQUES.LISTA]: ListaElement,
  [TIPOS_BLOQUES.CONTENEDOR]: ContenedorElement,
  [TIPOS_BLOQUES.FORMULARIO]: FormularioElement,
  [TIPOS_BLOQUES.INPUT_TEXTO]: InputTextoElement,
  [TIPOS_BLOQUES.INPUT_NUMERO]: InputNumeroElement,
  [TIPOS_BLOQUES.INPUT_EMAIL]: InputEmailElement,
  [TIPOS_BLOQUES.INPUT_PASSWORD]: InputPasswordElement,
  [TIPOS_BLOQUES.INPUT_SELECT]: InputSelectElement,
  [TIPOS_BLOQUES.INPUT_CHECKBOX]: InputCheckboxElement,
  [TIPOS_BLOQUES.INPUT_RADIO]: InputRadioElement,
  [TIPOS_BLOQUES.INPUT_SWITCH]: InputSwitchElement,
  [TIPOS_BLOQUES.INPUT_TEXTO_AREA]: InputTextoAreaElement,
  [TIPOS_BLOQUES.INPUT_TEXTO_ENRIQUECIDO]: InputTextoEnriquecidoElement,
  [TIPOS_BLOQUES.INPUT_SUBIR_IMAGEN]: InputSubirImagenElement,
  [TIPOS_BLOQUES.CUESTIONARIO]: CuestionarioElement,
} as const;
