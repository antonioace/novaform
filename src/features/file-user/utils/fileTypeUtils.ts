import { FileType } from "../types/file-user.types";

/**
 * Determina el tipo de archivo basado en la extensión del nombre del archivo
 * @param fileName - Nombre del archivo con extensión
 * @returns FileType correspondiente
 */
export const getFileTypeFromFileName = (fileName: string): FileType => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (!extension) {
    return FileType.FOLDER;
  }

  switch (extension) {
    case 'pdf':
      return FileType.PDF;
    
    case 'xlsx':
    case 'xls':
      return FileType.XLSX;
    
    case 'docx':
    case 'doc':
      return FileType.DOCX;
    
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
    case 'webp':
      return FileType.IMAGE;
    
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
    case 'flv':
    case 'webm':
    case 'mkv':
      return FileType.VIDEO;
    
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'ogg':
    case 'm4a':
      return FileType.AUDIO;
    
    case 'txt':
    case 'md':
    case 'rtf':
    case 'csv':
      return FileType.TEXT;
    
    default:
      return FileType.FOLDER;
  }
};

/**
 * Determina el tipo de archivo basado en la URL
 * @param url - URL del archivo
 * @returns FileType correspondiente
 */
export const getFileTypeFromUrl = (url: string): FileType => {
  const fileName = url.split('/').pop() || '';
  return getFileTypeFromFileName(fileName);
};

/**
 * Obtiene el texto descriptivo del tipo de archivo en español
 * @param fileType - Tipo de archivo
 * @returns Descripción en español del tipo de archivo
 */
export const getFileTypeLabel = (fileType: FileType): string => {
  switch (fileType) {
    case FileType.PDF:
      return "PDF";
    case FileType.XLS:
    case FileType.XLSX:
      return "Hoja de cálculo";
    case FileType.DOC:
    case FileType.DOCX:
      return "Documento";
    case FileType.IMAGE:
      return "Imagen";
    case FileType.VIDEO:
      return "Video";
    case FileType.AUDIO:
      return "Audio";
    case FileType.TEXT:
      return "Texto";
    case FileType.FOLDER:
    default:
      return "Carpeta";
  }
};

/**
 * Verifica si un archivo es de tipo imagen
 * @param fileName - Nombre del archivo
 * @returns true si es imagen, false en caso contrario
 */
export const isImageFile = (fileName: string): boolean => {
  return getFileTypeFromFileName(fileName) === FileType.IMAGE;
};

/**
 * Verifica si un archivo es de tipo documento
 * @param fileName - Nombre del archivo
 * @returns true si es documento, false en caso contrario
 */
export const isDocumentFile = (fileName: string): boolean => {
  const fileType = getFileTypeFromFileName(fileName);
  return [FileType.PDF, FileType.DOC, FileType.DOCX, FileType.XLS, FileType.XLSX, FileType.TEXT].includes(fileType);
};

/**
 * Verifica si un archivo es de tipo multimedia
 * @param fileName - Nombre del archivo
 * @returns true si es multimedia, false en caso contrario
 */
export const isMediaFile = (fileName: string): boolean => {
  const fileType = getFileTypeFromFileName(fileName);
  return [FileType.IMAGE, FileType.VIDEO, FileType.AUDIO].includes(fileType);
};

/**
 * Calcula y formatea el tamaño de un archivo desde una URL
 * @param url - URL del archivo
 * @returns Promise con el tamaño formateado (ej: "1.5 MB", "256 KB") o "N/A" si hay error
 */
export const calculateFileSize = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    
    if (!contentLength) {
      return "N/A";
    }
    
    const bytes = parseInt(contentLength, 10);
    
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  } catch (error) {
    console.error('Error calculando tamaño del archivo:', error);
    return "N/A";
  }
}; 