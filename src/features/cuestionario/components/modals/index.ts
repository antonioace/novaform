// Exportar componentes y tipos de iconos de contenido
export { 
  ContentTypeIcon, 
  getContentTypeIcon, 
  renderContentTypeIcon,
  CONTENT_TYPES,
  contentTypes,
  CONTENT_TYPE_ICON_EXAMPLES
} from './contentTypes';

export type { 
  ContentType, 
  ContentItem, 
  ContentCategory 
} from './contentTypes';

// Otros exports de modals
export { default as AddContentModal } from './AddContentModal';
export { default as QuestionSettingsModal } from './QuestionSettingsModal';
export { default as EditFormInfoModal } from './EditFormInfoModal'; 