import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { MdOutlineTableChart, MdLink } from "react-icons/md";
import { ColeccionConfig } from "./ColeccionesConfig";

interface FormularioRelacionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    primaryTable: string;
    primaryField: string;
    referencedTable: string;
    referencedField: string;
  }) => boolean;
  tables?: ColeccionConfig[];
  defaultData?: {
    primaryTable?: string;
    primaryField?: string;
    referencedTable?: string;
    referencedField?: string;
  };
}

const FormularioRelacion: React.FC<FormularioRelacionProps> = ({
  open,
  onClose,
  onSubmit,
  tables,
  defaultData,
}) => {
  const [primaryTable, setPrimaryTable] = React.useState(
    defaultData?.primaryTable || ""
  );
  const [primaryField, setPrimaryField] = React.useState(
    defaultData?.primaryField || ""
  );
  const [referencedTable, setReferencedTable] = React.useState(
    defaultData?.referencedTable || ""
  );
  const [referencedField, setReferencedField] = React.useState(
    defaultData?.referencedField || ""
  );

  const handleSubmit = () => {
    const result = onSubmit({
      primaryTable,
      primaryField,
      referencedTable,
      referencedField,
    });
    if (result) { 
      handleReset();
    }
  };

  const handleReset = () => {
    setPrimaryTable("");
    setPrimaryField("");
    setReferencedTable("");
    setReferencedField("");
  };

  const primaryFields = React.useMemo(() => {
    const table = tables?.find((t) => t.id === primaryTable);
    return table?.data?.fields || [];
  }, [primaryTable, tables]);

  const referencedFields = React.useMemo(() => {
    const table = tables?.find((t) => t.id === referencedTable);
    return table?.data?.fields || [];
  }, [referencedTable, tables]);

  React.useEffect(() => {
    if (open) {
      setPrimaryTable(defaultData?.primaryTable || "");
      setPrimaryField(defaultData?.primaryField || "");
      setReferencedTable(defaultData?.referencedTable || "");
      setReferencedField(defaultData?.referencedField || "");
    } else {
      handleReset();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="p-6">
        <DialogTitle
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            padding: "0 0 20px 0",
          }}
        >
          Crear Relación
        </DialogTitle>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MdOutlineTableChart className="text-xl text-gray-500" />
              <span className="text-sm font-medium">Tabla Primaria</span>
            </div>
            <div className="flex gap-4">
              <select
                value={primaryTable}
                onChange={(e) => setPrimaryTable(e.target.value)}
                className="flex-1 text-xs p-2 rounded-md border border-[#eeeeee] bg-white"
              >
                <option value="">Seleccionar tabla</option>
                {tables?.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.data?.name}
                  </option>
                ))}
              </select>
              <select
                value={primaryField}
                onChange={(e) => setPrimaryField(e.target.value)}
                className="flex-1 text-xs p-2 rounded-md border border-[#eeeeee] bg-white"
              >
                <option value="">Seleccionar campo</option>
                {primaryFields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {`${field.name} (${field.type})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <MdLink className="text-2xl text-gray-400" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MdOutlineTableChart className="text-xl text-gray-500" />
              <span className="text-sm font-medium">Tabla Referenciada</span>
            </div>
            <div className="flex gap-4">
              <select
                value={referencedTable}
                onChange={(e) => setReferencedTable(e.target.value)}
                className="flex-1 text-xs p-2 rounded-md border border-[#eeeeee] bg-white"
              >
                <option value="">Seleccionar tabla</option>
                {tables?.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.data?.name}
                  </option>
                ))}
              </select>
              <select
                value={referencedField}
                onChange={(e) => setReferencedField(e.target.value)}
                className="flex-1 text-xs p-2 rounded-md border border-[#eeeeee] bg-white"
              >
                <option value="">Seleccionar campo</option>
                {referencedFields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {`${field.name} (${field.type})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DialogActions sx={{ padding: "20px 0 0 0" }}>
          <Button
            onClick={onClose}
            sx={{
              color: "#666",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#121212",
              "&:hover": {
                backgroundColor: "#000",
              },
              textTransform: "none",
              fontSize: "14px",
            }}
            disabled={
              !primaryTable ||
              !primaryField ||
              !referencedTable ||
              !referencedField
            }
          >
            Crear
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default FormularioRelacion;
