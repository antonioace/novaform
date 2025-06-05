import {
  MdImage,
  MdOutlineSmartButton,
  MdTextFields,
  MdNumbers,
  MdEmail,
  MdPassword,
  MdArrowDropDown,
  MdCheckBox,
  MdRadioButtonChecked,
  MdToggleOn,
  MdShortText,
  MdFormatColorText,
  MdFileUpload,
} from "react-icons/md";
import { TIPOS_BLOQUES } from "./tiposElementos";

interface ConfiguracionByElement {
  title: string;
  elements: {
    type: string;
    icon: React.ReactNode;
    label: string;
  }[];
}

export const configuracionByElement: ConfiguracionByElement[] = [
  {
    title: "Básicos",
    elements: [
      {
        type: TIPOS_BLOQUES.BOTON,
        icon: (
          <MdOutlineSmartButton
            style={{ fontSize: "20px", color: "#232323" }}
          />
        ),
        label: "Boton",
      },
      {
        type: TIPOS_BLOQUES.TEXTO,
        icon: <MdTextFields style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Texto",
      },
      {
        type: TIPOS_BLOQUES.IMAGEN,
        icon: <MdImage style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Imagen",
      },
    ],
  },
  {
    title: "Formulario",
    elements: [
      {
        type: TIPOS_BLOQUES.INPUT_TEXTO,
        icon: <MdShortText style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Texto",
      },
      {
        type: TIPOS_BLOQUES.INPUT_NUMERO,
        icon: <MdNumbers style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Número",
      },
      {
        type: TIPOS_BLOQUES.INPUT_EMAIL,
        icon: <MdEmail style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Email",
      },
      {
        type: TIPOS_BLOQUES.INPUT_PASSWORD,
        icon: <MdPassword style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Password",
      },
      {
        type: TIPOS_BLOQUES.INPUT_SELECT,
        icon: (
          <MdArrowDropDown style={{ fontSize: "20px", color: "#232323" }} />
        ),
        label: "Input Select",
      },
      {
        type: TIPOS_BLOQUES.INPUT_CHECKBOX,
        icon: <MdCheckBox style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Checkbox",
      },
      {
        type: TIPOS_BLOQUES.INPUT_RADIO,
        icon: (
          <MdRadioButtonChecked
            style={{ fontSize: "20px", color: "#232323" }}
          />
        ),
        label: "Input Radio",
      },
      {
        type: TIPOS_BLOQUES.INPUT_SWITCH,
        icon: <MdToggleOn style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Switch",
      },
      {
        type: TIPOS_BLOQUES.INPUT_TEXTO_AREA,
        icon: <MdShortText style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Texto Area",
      },
      {
        type: TIPOS_BLOQUES.INPUT_TEXTO_ENRIQUECIDO,
        icon: (
          <MdFormatColorText style={{ fontSize: "20px", color: "#232323" }} />
        ),
        label: "Input Texto Enriquecido",
      },
      {
        type: TIPOS_BLOQUES.INPUT_SUBIR_IMAGEN,
        icon: <MdFileUpload style={{ fontSize: "20px", color: "#232323" }} />,
        label: "Input Subir Imagen",
      },
    ],
  },
];
