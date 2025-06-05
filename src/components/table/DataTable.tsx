import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

// Tipo para las definiciones de columnas
export interface Column {
  id: string;
  label: string;
  numeric?: boolean;
  width?: number | string;
  align?: "left" | "right" | "center";
  format?: (value: any) => React.ReactNode;
  sortable?: boolean;
  disablePadding?: boolean;
  key: string;
}

// Props para el componente DataTable
interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  loading?: boolean;
  selectable?: boolean;
  onRowClick?: (row: any) => void;
  onRowSelect?: (selectedRows: any[]) => void;
  actions?: {
    icon?: React.ReactNode;
    label: string;
    onClick: (row: any) => void;
  }[];
  defaultSortBy?: string;
  defaultSortDirection?: "asc" | "desc";
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const DataTable = ({
  columns,
  data,
  title,
  loading = false,
  selectable = false,
  onRowClick,
  onRowSelect,
  actions,
  defaultSortBy,
  defaultSortDirection = "asc",
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  stickyHeader = true,
  maxHeight = 650,
  className,
  style

}: DataTableProps) => {
  // Estados para ordenamiento, paginación y selección
  const [order, setOrder] = useState<"asc" | "desc">(defaultSortDirection);
  const [orderBy, setOrderBy] = useState<string>(
    defaultSortBy || columns[0].id
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<string[]>([]);

  // Función para ordenar los datos
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Funciones para paginación
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Funciones para selección
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      onRowSelect && onRowSelect(data);
      return;
    }
    setSelected([]);
    onRowSelect && onRowSelect([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: string,
    row: any
  ) => {
    if (selectable) {
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
      onRowSelect &&
        onRowSelect(data.filter((row) => newSelected.includes(row.id)));
    }

    if (onRowClick) {
      onRowClick(row);
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Ordenar datos
  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator<T>(
    order: "asc" | "desc",
    orderBy: string
  ): (a: T, b: T) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Datos ordenados y paginados
  const sortedData = stableSort(data, getComparator(order, orderBy));
  const displayData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className={className} elevation={3} style={style}>
      {title && (
        <Box
          sx={{
            padding: "16px 16px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, color: "#000000" }}
          >
            {title}
          </Typography>
        </Box>
      )}

      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader={stickyHeader} size="medium">
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all" }}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || (column.numeric ? "right" : "left")}
                  style={{ width: column.width, fontWeight: 600 }}
                  padding={column.disablePadding ? "none" : "normal"}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {actions && actions.length > 0 && (
                <TableCell padding="checkbox" align="right">
                  <Typography variant="srOnly">Acciones</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody key={`table-body-${data.length}`}>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                  align="center"
                >
                  Cargando...
                </TableCell>
              </TableRow>
            ) : displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                  align="center"
                >
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={
                            column.align || (column.numeric ? "right" : "left")
                          }
                          padding={column.disablePadding ? "none" : "normal"}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}

                    {actions && actions.length > 0 && (
                      <TableCell padding="checkbox" align="right">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            // Aquí podrías abrir un menú con varias acciones
                          }}
                          size="small"
                        >
                          <PlusCircleIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Paper>
  );
};

export default DataTable;
