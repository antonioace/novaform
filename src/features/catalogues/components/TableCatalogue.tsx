import ServerSideDataTable from "@/components/table/ServerSideDataTable";
import React from "react";
import { ICatalogueResponse } from "../types/catalogue.types";
import { IconButton } from "@mui/material";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Column } from "@/features/shared";

interface TableCatalogueProps {
  onEdit: (catalogue: ICatalogueResponse) => void;
  onDelete: (catalogue: ICatalogueResponse) => void;
}
function TableCatalogue({ onEdit, onDelete }: TableCatalogueProps) {
  const columns: Column[] = [
    {
      id: "name",
      label: "Nombre",
      key: "name",
    },
    {
      id: "description",
      label: "Descripción",
      key: "description",
    },
    {
      id: "code",
      label: "Código",
      key: "code",
    },
    {
      id: "actions",
      label: "Acciones",
      key: "actions",
      format: (value: unknown) => {
        return (
          <div className="flex items-center gap-2">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                onEdit(value as ICatalogueResponse);
              }}
            >
              <FiEdit2 className="h-4 w-4" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                onDelete(value as ICatalogueResponse);
              }}
            >
              <FiTrash2 className="h-4 w-4" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const data: ICatalogueResponse[] = [
    {
      id: "1",
      name: "Catalogo 1",
      description: "Descripcion 1",
      code: "1",
    },
  ];
  return (
    <div>
      <ServerSideDataTable
        columns={columns}
        data={data}
        totalItems={0}
        page={1}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        onSortChange={() => {}}
      />
    </div>
  );
}

export default TableCatalogue;
