import React, { useState, useCallback } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  OnNodesChange,
  OnEdgesChange,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomNodeDatabase from "./node-types/CustomNodeDatabase";
import {
  ColeccionConfig,
  RelacionConfig,
} from "@/features/database-creator/components/ColeccionesConfig";
import { TIPOS_CARDINALIDAD } from "@/features/builder/utils/tiposValoresDatabase";
import CustomEdgeButton from "./edge-types/CustomEdgeButton";

export default function FlowDatabaseCreator() {
  const nodeTypes = {
    CustomNodeDatabase: CustomNodeDatabase,
  };
  const edgeTypes = {
    CustomEdgeButton: CustomEdgeButton,
  };
  const [nodes, setNodes] = useState<ColeccionConfig[]>([]);
  const [edges, setEdges] = useState<RelacionConfig[]>([]);
  const onNodesChange: OnNodesChange<ColeccionConfig> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange<RelacionConfig> = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  console.log("edges", edges);
  console.log("nodes", nodes);
  const onConnect = useCallback(
    (connection) => {
      console.log("connection", connection);
      if (
        connection?.source !== connection?.target &&
        connection?.sourceHandle !== connection?.targetHandle
      ) {
        setEdges((eds) =>
          addEdge<RelacionConfig>(
            {
              ...connection,
              type: "CustomEdgeButton",
              data: {
                primaryTable: connection.source,
                primaryField:
                  connection.sourceHandle?.split("_")[1] ||
                  connection.sourceHandle,
                referencedTable: connection.target,
                referencedField:
                  connection.targetHandle?.split("_")[1] ||
                  connection.targetHandle,
                cardinality: TIPOS_CARDINALIDAD.ONE_TO_ONE,
              },
            },
            eds
          )
        );
      }
    },
    [setEdges]
  );

  return (
    <div
      style={{ display: "flex", flex: 1, height: "100%", position: "relative" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        zoomOnDoubleClick={false}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
