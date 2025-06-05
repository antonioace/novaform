// Definir un tipo para los elementos de datos
export interface DataItem {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Para propiedades dinámicas
}

// Actualizar la interfaz de Column
export interface Column {
  id: string;
  label: string;
  numeric?: boolean;
  width?: number | string;
  align?: "left" | "right" | "center";
  format?: (value: unknown) => React.ReactNode;
  sortable?: boolean;
  disablePadding?: boolean;
  key: string;
}

// Actualizar la interfaz de ServerSideDataTableProps con genérico
export interface ServerSideDataTableProps<T extends DataItem = DataItem> {
  columns: Column[];
  data: T[];
  totalItems: number;
  loading?: boolean;
  title?: string;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  onRowSelect?: (selectedRows: T[]) => void;
  actions?: {
    icon?: React.ReactNode;
    label: string;
    onClick: (row: T) => void;
  }[];

  // Props para control de página/ordenamiento
  page: number;
  rowsPerPage: number;
  orderBy?: string;
  order?: "asc" | "desc";

  // Callbacks para cuando el usuario interactúa con la tabla
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onSortChange?: (column: string, direction: "asc" | "desc") => void;

  rowsPerPageOptions?: number[];
  stickyHeader?: boolean;
  maxHeight?: number | string;
  className?: string;
  style?: React.CSSProperties;
  styleHeader?: React.CSSProperties;
  styleCell?: React.CSSProperties;
}
