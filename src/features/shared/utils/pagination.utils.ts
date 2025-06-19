/**
 * Utilidades para manejar la conversión entre paginación basada en 0 (frontend) 
 * y paginación basada en 1 (backend)
 */

/**
 * Convierte página del frontend (basada en 0) a página del backend (basada en 1)
 * @param frontendPage - Página del frontend (0, 1, 2, ...)
 * @returns Página para el backend (1, 2, 3, ...)
 */
export const frontendToBackendPage = (frontendPage: number): number => {
  return frontendPage + 1;
};

/**
 * Convierte página del backend (basada en 1) a página del frontend (basada en 0)
 * @param backendPage - Página del backend (1, 2, 3, ...)
 * @returns Página para el frontend (0, 1, 2, ...)
 */
export const backendToFrontendPage = (backendPage: number): number => {
  return Math.max(0, backendPage - 1);
};

/**
 * Interfaz para parámetros de paginación del frontend
 */
export interface FrontendPaginationParams {
  page: number; // Basada en 0
  rowsPerPage: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

/**
 * Interfaz para parámetros de paginación del backend
 */
export interface BackendPaginationParams {
  page: number; // Basada en 1
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Convierte parámetros de paginación del frontend al formato del backend
 * @param frontendParams - Parámetros del frontend
 * @returns Parámetros para el backend
 */
export const convertFrontendToBackendParams = (
  frontendParams: FrontendPaginationParams
): BackendPaginationParams => {
  return {
    page: frontendToBackendPage(frontendParams.page),
    limit: frontendParams.rowsPerPage,
    sortBy: frontendParams.orderBy,
    sortOrder: frontendParams.order,
  };
};

/**
 * Interfaz para respuesta de paginación del backend
 */
export interface BackendPaginationResponse {
  page: number; // Basada en 1
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Interfaz para estado de paginación del frontend
 */
export interface FrontendPaginationState {
  page: number; // Basada en 0
  rowsPerPage: number;
  total: number;
  totalPages: number;
}

/**
 * Convierte respuesta de paginación del backend al formato del frontend
 * @param backendResponse - Respuesta del backend
 * @returns Estado de paginación para el frontend
 */
export const convertBackendToFrontendPagination = (
  backendResponse: BackendPaginationResponse
): FrontendPaginationState => {
  return {
    page: backendToFrontendPage(backendResponse.page),
    rowsPerPage: backendResponse.limit,
    total: backendResponse.total,
    totalPages: backendResponse.totalPages,
  };
}; 