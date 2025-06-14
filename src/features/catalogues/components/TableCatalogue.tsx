import ServerSideDataTable from "@/components/table/ServerSideDataTable";
import React from "react";
import { ICatalogueResponse } from "../types/catalogue.types";
import { IconButton } from "@mui/material";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Column } from "@/features/shared";

interface TableCatalogueProps {
  onEdit: (catalogue: ICatalogueResponse) => void;
  onDelete: (catalogue: ICatalogueResponse) => void;
  catalogues: ICatalogueResponse[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}
function TableCatalogue({ onEdit, onDelete, catalogues, page, total, onPageChange }: TableCatalogueProps) {
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
  return (
    <div>
      <ServerSideDataTable
        columns={columns}
        data={catalogues}
        totalItems={total}
        page={page}
        rowsPerPage={10}
        onPageChange={onPageChange}
        onRowsPerPageChange={() => {}}
        onSortChange={() => {}}
      />
    </div>
  );
}

export default TableCatalogue;
