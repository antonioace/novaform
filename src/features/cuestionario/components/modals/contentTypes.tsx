import React from 'react';
import {
  FiMail,
  FiType,
  FiCheckSquare,
  FiCircle,
  FiChevronDown,
  FiImage,
  FiVideo,
  FiCalendar,
  FiPaperclip,
  FiStar,
  FiHelpCircle,
} from 'react-icons/fi';

export const CONTENT_TYPES = {
  CONTACT_INFO: 'contact_info',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
  WEBSITE: 'website',
  MULTIPLE_CHOICE: 'multiple_choice',
  DROPDOWN: 'dropdown',
  CHECKBOX: 'checkbox',
  IMAGE_CHOICE: 'image_choice',
  YES_NO: 'yes_no',
  LONG_TEXT: 'long_text',
  SHORT_TEXT: 'short_text',
  VIDEO_AUDIO: 'video_audio',
  NUMBER: 'number',
  DATE: 'date',
  FILE_UPLOAD: 'file_upload',
  RATING: 'rating'
} as const;

export type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES];

// Tipo para los iconos que acepta tanto SVG props como size
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;

// Mapa de iconos por tipo de contenido
const contentTypeIcons: Record<ContentType, IconComponent> = {
  [CONTENT_TYPES.CONTACT_INFO]: FiMail,
  [CONTENT_TYPES.EMAIL]: FiMail,
  [CONTENT_TYPES.PHONE]: FiType,
  [CONTENT_TYPES.ADDRESS]: FiType,
  [CONTENT_TYPES.WEBSITE]: FiType,
  [CONTENT_TYPES.MULTIPLE_CHOICE]: FiCircle,
  [CONTENT_TYPES.DROPDOWN]: FiChevronDown,
  [CONTENT_TYPES.CHECKBOX]: FiCheckSquare,
  [CONTENT_TYPES.IMAGE_CHOICE]: FiImage,
  [CONTENT_TYPES.YES_NO]: FiHelpCircle,
  [CONTENT_TYPES.LONG_TEXT]: FiType,
  [CONTENT_TYPES.SHORT_TEXT]: FiType,
  [CONTENT_TYPES.VIDEO_AUDIO]: FiVideo,
  [CONTENT_TYPES.NUMBER]: FiType,
  [CONTENT_TYPES.DATE]: FiCalendar,
  [CONTENT_TYPES.FILE_UPLOAD]: FiPaperclip,
  [CONTENT_TYPES.RATING]: FiStar,
};

interface ContentTypeIconProps {
  type: ContentType;
  className?: string;
  size?: number;
}

/**
 * Componente para mostrar el icono correspondiente a un tipo de contenido
 * @param type - Tipo de contenido (CONTENT_TYPES)
 * @param className - Clases CSS personalizadas (por defecto: "w-5 h-5")
 * @param size - Tamaño del icono en píxeles
 * @example
 * <ContentTypeIcon type={CONTENT_TYPES.EMAIL} className="w-6 h-6 text-blue-500" />
 */
export const ContentTypeIcon: React.FC<ContentTypeIconProps> = ({ 
  type, 
  className = "w-5 h-5",
  size 
}) => {
  const IconComponent = contentTypeIcons[type];
  
  if (!IconComponent) {
    // Icono por defecto si el tipo no existe
    return <FiHelpCircle className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
};

/**
 * Función helper para obtener el componente de icono de un tipo
 */
export const getContentTypeIcon = (type: ContentType): IconComponent => {
  return contentTypeIcons[type] || FiHelpCircle;
};

/**
 * Función helper para renderizar el icono de un tipo con props customizadas
 */
export const renderContentTypeIcon = (
  type: ContentType, 
  props: { className?: string; size?: number } = {}
): React.ReactNode => {
  const IconComponent = getContentTypeIcon(type);
  return <IconComponent className={props.className || "w-5 h-5"} size={props.size} />;
};

export interface ContentItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  type: string;
}

export interface ContentCategory {
  category: string;
  items: ContentItem[];
}

export const contentTypes: ContentCategory[] = [
  {
    category: 'Información de contacto',
    items: [
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.CONTACT_INFO} className="w-5 h-5" />, 
        title: 'Información de contacto', 
        description: 'Recopila datos básicos', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.CONTACT_INFO 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.EMAIL} className="w-5 h-5 text-pink-600" />, 
        title: 'Correo electrónico', 
        description: 'Dirección de email', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.EMAIL 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.PHONE} />, 
        title: 'Número de teléfono', 
        description: 'Número telefónico', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.PHONE 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.ADDRESS} />, 
        title: 'Dirección', 
        description: 'Dirección postal', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.ADDRESS 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.WEBSITE} />, 
        title: 'Sitio web', 
        description: 'URL del sitio web', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.WEBSITE 
      },
    ]
  },
  {
    category: 'Elección',
    items: [
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.MULTIPLE_CHOICE} className="w-5 h-5 text-purple-600" />, 
        title: 'Opción múltiple', 
        description: 'Una sola respuesta', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.MULTIPLE_CHOICE 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.DROPDOWN} className="w-5 h-5" size={20} />, 
        title: 'Lista desplegable', 
        description: 'Menú de opciones', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.DROPDOWN 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.CHECKBOX} />, 
        title: 'Casillas de verificación', 
        description: 'Múltiples respuestas', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.CHECKBOX 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.IMAGE_CHOICE} />, 
        title: 'Elección con imagen', 
        description: 'Opciones visuales', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.IMAGE_CHOICE 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.YES_NO} />, 
        title: 'Sí/No', 
        description: 'Respuesta binaria', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.YES_NO 
      },
    ]
  },
  {
    category: 'Texto y video',
    items: [
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.LONG_TEXT} />, 
        title: 'Texto largo', 
        description: 'Respuesta extensa', 
        color: 'bg-blue-100 text-blue-600', 
        type: CONTENT_TYPES.LONG_TEXT 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.SHORT_TEXT} />, 
        title: 'Texto corto', 
        description: 'Respuesta breve', 
        color: 'bg-blue-100 text-blue-600', 
        type: CONTENT_TYPES.SHORT_TEXT 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.VIDEO_AUDIO} />, 
        title: 'Video y audio', 
        description: 'Contenido multimedia', 
        color: 'bg-blue-100 text-blue-600', 
        type: CONTENT_TYPES.VIDEO_AUDIO 
      },
    ]
  },
  {
    category: 'Otros',
    items: [
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.NUMBER} />, 
        title: 'Número', 
        description: 'Valor numérico', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.NUMBER 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.DATE} />, 
        title: 'Fecha', 
        description: 'Selector de fecha', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.DATE 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.FILE_UPLOAD} />, 
        title: 'Carga de archivo', 
        description: 'Adjuntar archivos', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.FILE_UPLOAD 
      },
      { 
        icon: <ContentTypeIcon type={CONTENT_TYPES.RATING} />, 
        title: 'Calificación', 
        description: 'Sistema de puntuación', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.RATING 
      },
    ]
  }
];

// Ejemplos de uso del ContentTypeIcon con diferentes props
export const CONTENT_TYPE_ICON_EXAMPLES = {
  // Uso básico (tamaño por defecto)
  basic: <ContentTypeIcon type={CONTENT_TYPES.EMAIL} />,
  
  // Con className personalizado
  withCustomClass: <ContentTypeIcon type={CONTENT_TYPES.RATING} className="w-6 h-6 text-yellow-500" />,
  
  // Con tamaño personalizado
  withSize: <ContentTypeIcon type={CONTENT_TYPES.DATE} size={24} />,
  
  // Con className y tamaño
  withBoth: <ContentTypeIcon type={CONTENT_TYPES.VIDEO_AUDIO} className="w-8 h-8 text-blue-600" size={32} />,
  
  // Para botones
  forButton: <ContentTypeIcon type={CONTENT_TYPES.FILE_UPLOAD} className="w-4 h-4 mr-2" />,
  
  // Para títulos grandes
  forTitle: <ContentTypeIcon type={CONTENT_TYPES.MULTIPLE_CHOICE} className="w-12 h-12 text-purple-700" />,
  
  // Con efectos hover
  withHover: <ContentTypeIcon type={CONTENT_TYPES.CHECKBOX} className="w-5 h-5 hover:text-green-600 transition-colors" />
};