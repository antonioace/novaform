import React from "react";
import {
  MdOutlineClose,
  MdOutlineDelete,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TIPOS_VALORES_DATABASE } from "../../builder/utils/tiposValoresDatabase";
import { ColeccionConfig, ColeccionField } from "./ColeccionesConfig";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export interface ListElementsConfigProps {
  elements?: ColeccionField[];
  coleccion?: ColeccionConfig;
  agregarCampoPorColeccion: (id: string) => void;
  eliminarCampoPorColeccion: (id: string, idCampo: string) => void;
  editarCampoInfoPorColeccion: (
    id: string,
    idCampo: string,
    info: ColeccionField
  ) => void;
  editarNombreColeccion: (id: string, newName: string) => void;
  handleDeleteNode: (id: string) => void;
}

function ListElementsConfig({
  elements,
  coleccion,
  agregarCampoPorColeccion,
  eliminarCampoPorColeccion,
  editarCampoInfoPorColeccion,
  editarNombreColeccion,
  handleDeleteNode,
}: ListElementsConfigProps) {
  const [open, setOpen] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [campoAEliminar, setCampoAEliminar] = React.useState<string | null>(
    null
  );
  const [nombreColeccion, setNombreColeccion] = React.useState("");

  const onClickOpen = () => {
    setOpen(!open);
  };

  const handleDeleteClick = (idCampo: string) => {
    setCampoAEliminar(idCampo);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (campoAEliminar) {
      eliminarCampoPorColeccion(coleccion?.id || "", campoAEliminar);
    }
    setShowConfirm(false);
    setCampoAEliminar(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setCampoAEliminar(null);
  };

  React.useEffect(() => {
    if (open) {
      setNombreColeccion(coleccion?.data.name || "");
    }
  }, [open, coleccion?.data.name]);

  return (
    <div className="w-full border-b border-b-[#eeeeee] py-1 flex flex-col">
      <div className="flex items-center justify-between px-2 pt-2 pb-1">
        <span className="text-xs font-semibold text-[#232323]">
          {coleccion?.data.name}
        </span>
        <div className="flex items-center gap-1">
          <button
            className="text-[#b0b0b0] text-xs cursor-pointer hover:text-red-500"
            onClick={() => handleDeleteNode(coleccion?.id || "")}
          >
            <MdOutlineDelete />
          </button>
          <span className="text-[#b0b0b0] text-[10px] cursor-pointer bg-black rounded-full w-5 h-5 flex items-center justify-center">
            {elements?.length}
          </span>
          <span
            className="text-[#b0b0b0] text-xs cursor-pointer"
            onClick={onClickOpen}
          >
            {open ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </span>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center">
            <div className="flex items-center justify-between gap-2 p-2 w-full">
              <input
                type="text"
                value={nombreColeccion}
                onChange={(e) => setNombreColeccion(e.target.value)}
                placeholder="Nombre de colección"
                className="text-xs p-2 rounded-md border border-[#eeeeee] flex-1"
              />
              <button
                className="flex items-center justify-center text-[9px] p-2 bg-[#121212] text-white rounded-md"
                onClick={() =>
                  editarNombreColeccion(coleccion?.id || "", nombreColeccion)
                }
              >
                Guardar
              </button>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#cccccc] p-2">
            Campos
          </span>
          {elements?.map((el) => (
            <div key={el.id} className="flex items-center justify-between gap-2 px-2">
              <input
                type="text"
                value={el.name}
                onChange={(e) =>
                  editarCampoInfoPorColeccion(coleccion?.id || "", el.id, {
                    ...el,
                    name: e.target.value,
                  })
                }
                className="text-xs font-semibold text-[#232323] p-2 rounded-md border border-[#eeeeee] min-w-[80px] max-w-[80px]"
              />
              <select
                value={el.type}
                onChange={(e) =>
                  editarCampoInfoPorColeccion(coleccion?.id || "", el.id, {
                    ...el,
                    type: e.target.value,
                  })
                }
                className="text-xs text-[#b0b0b0] p-2 rounded-md border border-[#eeeeee] min-w-[110px] max-w-[110px]"
              >
                {Object.keys(TIPOS_VALORES_DATABASE).map((tipo, index) => (
                  <option key={index} value={TIPOS_VALORES_DATABASE[tipo]}>
                    {tipo}
                  </option>
                ))}
              </select>
              <button
                className="text-xs text-[#b0b0b0] hover:text-red-500"
                onClick={() => handleDeleteClick(el.id)}
              >
                <MdOutlineClose />
              </button>
            </div>
          ))}

          <button
            className="w-full bg-black text-white text-xs font-semibold py-2 px-2 rounded-md"
            onClick={() => agregarCampoPorColeccion(coleccion?.id || "")}
          >
            Agregar campo
          </button>
        </div>
      )}

      {showConfirm && (
        <Dialog 
          open={showConfirm} 
          onClose={handleCancelDelete}
          PaperProps={{
            sx: {
              minWidth: '300px',
              maxWidth: '400px',
              padding: '16px'
            }
          }}
        >
          <DialogTitle sx={{ fontSize: '14px', padding: '8px 0' }}>
            ¿Estás seguro de que deseas eliminar este campo?
          </DialogTitle>
          <DialogActions sx={{ padding: '8px 0' }}>
            <Button 
              onClick={handleCancelDelete} 
              color="inherit"
              size="small"
              sx={{ fontSize: '12px' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              size="small"
              sx={{ fontSize: '12px' }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default ListElementsConfig;
