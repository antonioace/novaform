import FlowDatabaseCreator from "@/features/database-creator/components/FlowDatabaseCreator";
import React from "react";
import { MdAdd, MdSave } from "react-icons/md";
import ListaEsquemaColeccionConfig from "./ListaEsquemaColeccionConfig";
import ListaEsquemaRelacionConfig from "./ListaEsquemaRelacionConfig";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Edge, Node } from "@xyflow/react";
import FormularioRelacion from "./FormularioRelacion";
import FormularioEliminarColeccion from "./FormularioEliminarColeccion";
import { useColecciones } from "../hooks/useColecciones";
import { createPortal } from "react-dom";

export interface ColeccionConfig extends Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    id: string;
    name: string;
    fields: ColeccionField[];
    onDelete?: (id: string) => void;
    onAddRelacion?: (defaultData?: {
      primaryTable?: string;
      primaryField?: string;
      referencedTable?: string;
      referencedField?: string;
    }) => void;
  };
}

export interface RelacionConfig extends Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  data: {
    primaryTable: string;
    primaryField: string;
    referencedTable: string;
    referencedField: string;
    cardinality?: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
  };
}

export interface ColeccionField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

function ColeccionesConfig() {
  const {
    nodes,
    edges,
    showConfirm,
    showRelacionForm,
    defaultDataRelacion,
    showDeleteConfirm,
    nodeToDelete,
    selectedOptionConfig,
    setSelectedOptionConfig,
    handleDeleteNode,
    confirmDeleteNode,
    cancelDeleteNode,
    agregarColeccion,
    handleConfirmAdd,
    handleCancelAdd,
    agregarRelacion,
    handleSubmitRelacion,
    editarNombreColeccion,
    agregarCampoPorColeccion,
    eliminarCampoPorColeccion,
    editarCampoInfoPorColeccion,
    editarRelacion,
    setDefaultDataRelacion,
    setShowRelacionForm,
    onSaveData,
  } = useColecciones();

  const renderFixedElements = () => {
    return typeof document !== "undefined"
      ? createPortal(
          <>
            <div
              className="fixed top-0 left-0 w-full h-[35px] ml-[40px] z-[300] bg-white
            border-b border-b-[#EEEEEE]s
            "
            >
              <div
                className="flex items-center w-full h-full px-2
              
              "
              >
                <div
                  className="text-xs rounded-2xl mr-4  border border-[#EEEEEE] py-[3px] px-2 font-medium flex items-center  justify-center gap-3 cursor-pointer
                hover:bg-[#F5F5F5]
                transition-colors duration-150
                "
                  onClick={onSaveData}
                >
                  <MdSave
                    style={{
                      fontSize: "10px",
                      color: "#D1D1D1",
                    }}
                  />{" "}
                  Guardar
                </div>
              </div>
            </div>
          </>,
          document.body
        )
      : null;
  };

  return (
    <div
      className="flex h-full w-full flex-1 overflow-auto
  
    "
      style={{
        scrollbarWidth: "none",
        scrollbarColor: "transparent transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          height: "100%",
          width: "var(--editor-width-tabpanel)",
          maxWidth: "var(--editor-width-tabpanel)",
          outline: "none",
          borderRight: "1px solid #eeeeee",
        }}
      >
        <div className="flex flex-col border-b border-b-[#EEEEEE] pb-2 px-2 pt-2">
          <h1 className="text-sm font-semibold mb-3">Base de datos</h1>
          <div className="flex bg-[#fff] rounded-md mt-2 w-full h-7 border border-[#eeeeee] p-[2px]">
            <button
              className="flex-1 text-xs font-semibold rounded-md transition-colors duration-150 h-full px-3 focus:outline-none"
              style={{
                background:
                  selectedOptionConfig === "collections"
                    ? "#111"
                    : "transparent",
                color:
                  selectedOptionConfig === "collections" ? "#fff" : "#b0b0b0",
                boxShadow: "none",
              }}
              onClick={() => setSelectedOptionConfig("collections")}
            >
              Colecciones
            </button>
            <button
              className="flex-1 text-xs font-semibold rounded-md transition-colors duration-150 h-full px-3 focus:outline-none"
              style={{
                background:
                  selectedOptionConfig === "relations" ? "#111" : "transparent",
                color:
                  selectedOptionConfig === "relations" ? "#fff" : "#b0b0b0",
                boxShadow: "none",
              }}
              onClick={() => setSelectedOptionConfig("relations")}
            >
              Relaciones
            </button>
          </div>
        </div>

        {selectedOptionConfig === "collections" && (
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-semibold mb-3">Colecciones</h1>
              <button
                className="text-sm font-semibold mb-3"
                onClick={agregarColeccion}
              >
                <MdAdd />
              </button>
            </div>
            {nodes?.map((node) => (
              <ListaEsquemaColeccionConfig
                key={node.id}
                elements={node?.data?.fields as ColeccionField[]}
                coleccion={node as ColeccionConfig}
                agregarCampoPorColeccion={agregarCampoPorColeccion}
                eliminarCampoPorColeccion={eliminarCampoPorColeccion}
                editarCampoInfoPorColeccion={editarCampoInfoPorColeccion}
                editarNombreColeccion={editarNombreColeccion}
                handleDeleteNode={handleDeleteNode}
              />
            ))}
          </div>
        )}

        {selectedOptionConfig === "relations" && (
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-semibold mb-3">Relaciones</h1>
              <button
                className="text-sm font-semibold mb-3"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  agregarRelacion();
                }}
              >
                <MdAdd />
              </button>
            </div>
            {edges?.map((relacion) => (
              <ListaEsquemaRelacionConfig
                key={relacion.id}
                relacion={relacion}
                editarRelacion={editarRelacion}
                colecciones={nodes}
              />
            ))}
          </div>
        )}

        {showConfirm && (
          <Dialog open={showConfirm} onClose={handleCancelAdd}>
            <DialogTitle
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
              }}
            >
              ¿Deseas agregar una nueva colección?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCancelAdd} color="inherit">
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmAdd}
                color="primary"
                variant="contained"
              >
                Agregar
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <FormularioEliminarColeccion
          open={showDeleteConfirm}
          onClose={cancelDeleteNode}
          onConfirm={confirmDeleteNode}
          nombreColeccion={
            nodes.find((n) => n.id === nodeToDelete)?.data.name || ""
          }
        />

        <FormularioRelacion
          open={showRelacionForm}
          onClose={() => {
            setShowRelacionForm(false);
            setDefaultDataRelacion(undefined);
          }}
          onSubmit={handleSubmitRelacion}
          tables={nodes}
          defaultData={defaultDataRelacion}
        />
      </div>
      {renderFixedElements()}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#fff",
          marginLeft: "calc(var(--editor-width-tabpanel) + 40px)",
          display: "flex",
          flexDirection: "column",
          marginTop: "35px",
        }}
      >
        <div className="flex flex-col grow">
          <FlowDatabaseCreator />
        </div>
      </div>
    </div>
  );
}

export default ColeccionesConfig;
