import { useCallback, useEffect, useState } from "react";
import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { useNotification } from "@/contexts/NotificationContext";
import { TIPOS_CARDINALIDAD } from "../../builder/utils/tiposValoresDatabase";
import {
  ColeccionConfig,
  RelacionConfig,
  ColeccionField,
} from "../components/ColeccionesConfig";
import { DefaultData } from "../utils/utils";

export const useColecciones = () => {
  const { setNodes, setEdges, getNodes } = useReactFlow<
    ColeccionConfig,
    RelacionConfig
  >();
  const nodes = useNodes<ColeccionConfig>();
  const edges = useEdges<RelacionConfig>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRelacionForm, setShowRelacionForm] = useState(false);
  const [defaultDataRelacion, setDefaultDataRelacion] = useState<
    | {
        primaryTable?: string;
        primaryField?: string;
        referencedTable?: string;
        referencedField?: string;
      }
    | undefined
  >(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [selectedOptionConfig, setSelectedOptionConfig] = useState<
    "collections" | "relations"
  >("collections");

  const { showWarn, showNotification } = useNotification();

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      const node = getNodes()?.find((n) => n.id === nodeId);
      if (node) {
        setNodeToDelete(nodeId);
        setShowDeleteConfirm(true);
      }
    },
    [getNodes]
  );

  const confirmDeleteNode = useCallback(() => {
    if (nodeToDelete) {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeToDelete));
      setEdges((edges) =>
        edges.filter(
          (edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete
        )
      );
    }
    setShowDeleteConfirm(false);
    setNodeToDelete(null);
  }, [nodeToDelete, setNodes, setEdges]);

  const cancelDeleteNode = useCallback(() => {
    setShowDeleteConfirm(false);
    setNodeToDelete(null);
  }, []);

  const agregarColeccion = () => {
    setShowConfirm(true);
  };

  const handleConfirmAdd = useCallback(() => {
    const nombreAleatorio = `tabla_${Math.random()
      .toString(36)
      .substring(2, 7)}`;
    const nuevaColeccion: ColeccionConfig = {
      id: nombreAleatorio,
      type: "CustomNodeDatabase",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        id: nombreAleatorio,
        name: nombreAleatorio,
        fields: [
          {
            name: "id",
            id: Math.random().toString(36).substring(2, 7),
            type: "bigint",
            required: true,
          },
        ],
        onDelete: handleDeleteNode,
        onAddRelacion: agregarRelacion,
      },
    };
    setNodes((nodes) => [...nodes, nuevaColeccion]);
    setShowConfirm(false);
  }, [setNodes, handleDeleteNode]);

  const handleCancelAdd = () => {
    setShowConfirm(false);
  };

  const agregarRelacion = (defaultData?: {
    primaryTable?: string;
    primaryField?: string;
    referencedTable?: string;
    referencedField?: string;
  }) => {
    if (defaultData) {
      setDefaultDataRelacion(defaultData);
    }
    setShowRelacionForm(true);
  };

  const handleSubmitRelacion = (data: {
    primaryTable: string;
    primaryField: string;
    referencedTable: string;
    referencedField: string;
  }) => {
    if (
      !data.primaryTable ||
      !data.primaryField ||
      !data.referencedTable ||
      !data.referencedField
    ) {
      return false;
    }

    const infoFieldPrimary = nodes
      ?.find((node) => node.id === data.primaryTable)
      ?.data?.fields?.find((field) => field.id === data.primaryField);
    const infoFieldReferenced = nodes
      ?.find((node) => node.id === data.referencedTable)
      ?.data?.fields?.find((field) => field.id === data.referencedField);

    if (infoFieldPrimary?.type !== infoFieldReferenced?.type) {
      showWarn("Los tipos de datos de los campos no coinciden");
      return false;
    }

    const nuevaRelacion: RelacionConfig = {
      id: `e${data.primaryTable}-${data.referencedTable}`,
      source: data.primaryTable,
      sourceHandle: `source_${data.primaryField}`,
      target: data.referencedTable,
      targetHandle: `target_${data.referencedField}`,
      data: {
        primaryTable: data.primaryTable,
        primaryField: data.primaryField,
        referencedTable: data.referencedTable,
        referencedField: data.referencedField,
        cardinality: TIPOS_CARDINALIDAD.ONE_TO_ONE,
      },
      type: "CustomEdgeButton",
    };

    setEdges((edges) => [...edges, nuevaRelacion]);
    setShowRelacionForm(false);
    setDefaultDataRelacion(undefined);
    return true;
  };

  const editarNombreColeccion = useCallback(
    (id: string, newName: string) => {
      if (!id) return;
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  name: newName,
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const agregarCampoPorColeccion = useCallback(
    (id: string) => {
      if (!id) return;
      setNodes((nodes) => {
        const nodeIndex = nodes.findIndex((node) => node.id === id);
        if (nodeIndex !== -1) {
          const nodesActualizados = nodes.map((node, index) => {
            if (index === nodeIndex) {
              return {
                ...node,
                data: {
                  ...node.data,
                  fields: [
                    ...(node?.data?.fields?.length > 0
                      ? node?.data?.fields
                      : []),
                    {
                      id: Math.random().toString(36).substring(2, 7),
                      name: `campo_${node.data.fields.length + 1}`,
                      type: "string",
                      required: true,
                    },
                  ],
                },
              };
            }
            return node;
          });
          return nodesActualizados;
        }
        return nodes;
      });
    },
    [setNodes]
  );

  const eliminarCampoPorColeccion = useCallback(
    (id: string, idCampo: string) => {
      if (!id) return;
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                fields: node.data.fields.filter(
                  (campo) => campo.id !== idCampo
                ),
              },
            };
          }
          return node;
        });
      });
    },
    [setNodes]
  );

  const editarCampoInfoPorColeccion = useCallback(
    (id: string, idCampo: string, info: Partial<ColeccionField>) => {
      if (!id) return;
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                fields: node.data.fields.map((campo) =>
                  campo.id === idCampo ? { ...campo, ...info } : campo
                ),
              },
            };
          }
          return node;
        });
      });
    },
    [setNodes]
  );

  const editarRelacion = useCallback(
    (id: string, data: RelacionConfig) => {
      setEdges((edges) => edges.map((edge) => (edge.id === id ? data : edge)));
    },
    [setEdges]
  );

  const onSaveData = () => {
    localStorage.setItem(
      "database-creator",
      JSON.stringify({
        nodes,
        edges,
      })
    );
    showNotification("success", "Datos guardados correctamente");
  };

  useEffect(() => {
    const data = localStorage.getItem("database-creator");

    const addNodeHandlers = (nodes: ColeccionConfig[]) => {
      return nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onDelete: handleDeleteNode,
          onAddRelacion: agregarRelacion,
        },
      }));
    };

    if (data) {
      const { nodes, edges } = JSON.parse(data);
      setNodes(addNodeHandlers(nodes));
      setEdges(edges);
    } else {
      setNodes(addNodeHandlers(DefaultData.nodes));
      setEdges(DefaultData.edges);
    }
  }, []);

  return {
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
    setShowRelacionForm,
    setDefaultDataRelacion,
    onSaveData,
  };
};
