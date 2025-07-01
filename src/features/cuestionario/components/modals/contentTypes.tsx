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
        icon: <FiMail className="w-5 h-5" />, 
        title: 'Información de contacto', 
        description: 'Recopila datos básicos', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.CONTACT_INFO 
      },
      { 
        icon: <FiMail className="w-5 h-5" />, 
        title: 'Correo electrónico', 
        description: 'Dirección de email', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.EMAIL 
      },
      { 
        icon: <FiType className="w-5 h-5" />, 
        title: 'Número de teléfono', 
        description: 'Número telefónico', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.PHONE 
      },
      { 
        icon: <FiType className="w-5 h-5" />, 
        title: 'Dirección', 
        description: 'Dirección postal', 
        color: 'bg-pink-100 text-pink-600', 
        type: CONTENT_TYPES.ADDRESS 
      },
      { 
        icon: <FiType className="w-5 h-5" />, 
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
        icon: <FiCircle className="w-5 h-5" />, 
        title: 'Opción múltiple', 
        description: 'Una sola respuesta', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.MULTIPLE_CHOICE 
      },
      { 
        icon: <FiChevronDown className="w-5 h-5" />, 
        title: 'Lista desplegable', 
        description: 'Menú de opciones', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.DROPDOWN 
      },
      { 
        icon: <FiCheckSquare className="w-5 h-5" />, 
        title: 'Casillas de verificación', 
        description: 'Múltiples respuestas', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.CHECKBOX 
      },
      { 
        icon: <FiImage className="w-5 h-5" />, 
        title: 'Elección con imagen', 
        description: 'Opciones visuales', 
        color: 'bg-purple-100 text-purple-600', 
        type: CONTENT_TYPES.IMAGE_CHOICE 
      },
      { 
        icon: <FiHelpCircle className="w-5 h-5" />, 
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
        icon: <FiType className="w-5 h-5" />, 
        title: 'Texto largo', 
        description: 'Respuesta extensa', 
        color: 'bg-blue-100 text-blue-600', 
        type: CONTENT_TYPES.LONG_TEXT 
      },
      { 
        icon: <FiType className="w-5 h-5" />, 
        title: 'Texto corto', 
        description: 'Respuesta breve', 
        color: 'bg-blue-100 text-blue-600', 
        type: CONTENT_TYPES.SHORT_TEXT 
      },
      { 
        icon: <FiVideo className="w-5 h-5" />, 
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
        icon: <FiType className="w-5 h-5" />, 
        title: 'Número', 
        description: 'Valor numérico', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.NUMBER 
      },
      { 
        icon: <FiCalendar className="w-5 h-5" />, 
        title: 'Fecha', 
        description: 'Selector de fecha', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.DATE 
      },
      { 
        icon: <FiPaperclip className="w-5 h-5" />, 
        title: 'Carga de archivo', 
        description: 'Adjuntar archivos', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.FILE_UPLOAD 
      },
      { 
        icon: <FiStar className="w-5 h-5" />, 
        title: 'Calificación', 
        description: 'Sistema de puntuación', 
        color: 'bg-orange-100 text-orange-600', 
        type: CONTENT_TYPES.RATING 
      },
    ]
  }
];