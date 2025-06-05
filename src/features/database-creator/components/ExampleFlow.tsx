import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  Position,
  NodeProps,
  Controls,
  MiniMap,
  BackgroundVariant,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface TextUpdaterNodeProps extends NodeProps {
  data: {
    value: number;
  };
}

function TextUpdaterNode({ data }: TextUpdaterNodeProps) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "10px",
        borderRadius: "3px",
        border: "1px solid #1a192b",
      }}
    >
      <Handle type="source" position={Position.Bottom} id="a" />
      <div>
        <label htmlFor="text">Valor: {data.value}</label>
        <input id="text" name="text" />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: Position.Top,
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
  },
  {
    id: "node-3",
    type: "output",
    targetPosition: Position.Top,
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

function ExampleFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />{" "}
    </ReactFlow>
  );
}

export default ExampleFlow;
