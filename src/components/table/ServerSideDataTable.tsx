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
  IconButton,
} from "@mui/material";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DataItem, ServerSideDataTableProps } from "@/features/shared";

export const ServerSideDataTable = <T extends DataItem>({
  columns,
  data,
  totalItems,
  loading = false,
  title,
  selectable = false,
  onRowClick,
  actions,
  page,
  rowsPerPage,
  orderBy,
  order,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  rowsPerPageOptions = [5, 10, 25],
  stickyHeader = true,
  maxHeight = 650,
  className,
  style,
  styleHeader,
  styleCell,
}: ServerSideDataTableProps<T>) => {
  // Función para ordenar los datos
  const handleRequestSort = (property: string) => {
    const newOrder = orderBy === property && order === "asc" ? "desc" : "asc";
    onSortChange?.(property, newOrder);
  };

  // Funciones para paginación
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10));
  };

  return (
    <Paper
      className={className}
      style={{ ...style, position: "relative" }}
      elevation={3}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "16px",
        boxShadow:
          "0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)",
      }}
    >
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
        <Table
          stickyHeader={stickyHeader}
          size="medium"
          style={{
            borderCollapse: "collapse",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || (column.numeric ? "right" : "left")}
                  style={{
                    width: column.width,
                    fontWeight: 600,
                    backgroundColor: "#f4f5f6",
                    color: "#545454",
                    borderBottom: "none",
                    ...styleHeader,
                  }}
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
                  <Typography variant="subtitle2">Acciones</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody key={`table-body-${data?.length || 0}-${page}`}>
            {data?.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={
                        column.align || (column.numeric ? "right" : "left")
                      }
                      style={{
                        borderBottomStyle: "dashed",
                        borderBottomWidth: "1px",
                        borderBottomColor: "#d9d9d9",
                        ...styleCell,
                      }}
                      padding={column.disablePadding ? "none" : "normal"}
                    >
                      {column.format ? column.format(row) : value}
                    </TableCell>
                  );
                })}

                {actions && actions.length > 0 && (
                  <TableCell padding="checkbox" align="right">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí se podría implementar un menú de acciones
                      }}
                      size="small"
                    >
                      <PlusCircleIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        suppressHydrationWarning={true}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />

      {/* Máscara de carga transparente */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          >
            <AiOutlineLoading3Quarters
              size={40}
              color="#1976d2"
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ServerSideDataTable;
