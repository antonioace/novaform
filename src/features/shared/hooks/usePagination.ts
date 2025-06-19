import { useState, useCallback } from "react";
import { 
  FrontendPaginationParams, 
  BackendPaginationParams,
  convertFrontendToBackendParams 
} from "../utils/pagination.utils";

interface UsePaginationProps {
  initialPage?: number;
  initialRowsPerPage?: number;
  initialOrderBy?: string;
  initialOrder?: 'asc' | 'desc';
}

interface UsePaginationReturn {
  // Estados del frontend (basados en 0)
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
  
  // Funciones para actualizar estados
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setOrderBy: (orderBy: string) => void;
  setOrder: (order: 'asc' | 'desc') => void;
  
  // Función para obtener parámetros del backend
  getBackendParams: () => BackendPaginationParams;
  
  // Función para manejar cambio de página (compatible con Material-UI)
  handlePageChange: (event: unknown, newPage: number) => void;
  
  // Función para manejar cambio de filas por página
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Función para manejar cambio de ordenamiento
  handleSortChange: (column: string, direction: 'asc' | 'desc') => void;
  
  // Función para resetear a la primera página
  resetToFirstPage: () => void;
}

export const usePagination = ({
  initialPage = 0,
  initialRowsPerPage = 10,
  initialOrderBy = 'id',
  initialOrder = 'asc'
}: UsePaginationProps = {}): UsePaginationReturn => {
  
  const [page, setPageState] = useState(initialPage);
  const [rowsPerPage, setRowsPerPageState] = useState(initialRowsPerPage);
  const [orderBy, setOrderByState] = useState(initialOrderBy);
  const [order, setOrderState] = useState<'asc' | 'desc'>(initialOrder);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  const setRowsPerPage = useCallback((newRowsPerPage: number) => {
    setRowsPerPageState(newRowsPerPage);
    setPageState(0); // Resetear a la primera página cuando cambia el tamaño
  }, []);

  const setOrderBy = useCallback((newOrderBy: string) => {
    setOrderByState(newOrderBy);
  }, []);

  const setOrder = useCallback((newOrder: 'asc' | 'desc') => {
    setOrderState(newOrder);
  }, []);

  const getBackendParams = useCallback((): BackendPaginationParams => {
    const frontendParams: FrontendPaginationParams = {
      page,
      rowsPerPage,
      orderBy,
      order
    };
    return convertFrontendToBackendParams(frontendParams);
  }, [page, rowsPerPage, orderBy, order]);

  const handlePageChange = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
  }, [setRowsPerPage]);

  const handleSortChange = useCallback((column: string, direction: 'asc' | 'desc') => {
    setOrderBy(column);
    setOrder(direction);
  }, [setOrderBy, setOrder]);

  const resetToFirstPage = useCallback(() => {
    setPage(0);
  }, [setPage]);

  return {
    // Estados
    page,
    rowsPerPage,
    orderBy,
    order,
    
    // Setters
    setPage,
    setRowsPerPage,
    setOrderBy,
    setOrder,
    
    // Utilidades
    getBackendParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    resetToFirstPage,
  };
}; 