import { Handle, Position, NodeProps, useEdges } from "@xyflow/react";
import React, { useState } from "react";
import styles from "./custom-node-database.module.css";
import {
  ColeccionConfig,
  RelacionConfig,
} from "@/features/database-creator/components/ColeccionesConfig";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FiMoreVertical, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { TIPOS_CARDINALIDAD } from "@/features/builder/utils/tiposValoresDatabase";

function CustomNodeDatabase({ data }: NodeProps<ColeccionConfig>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const edges = useEdges<RelacionConfig>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(data.id);
    }
    handleClose();
  };

  const handleAddRelacion = () => {
    if (data.onAddRelacion) {
      data.onAddRelacion({
        primaryTable: data.id,
        primaryField: "",
        referencedTable: "",
        referencedField: "",
      });
    }
    handleClose();
  };

  const cardinalityByEdgeSource = (sourceHandleId: string) => {
    const edge = edges.find(
      (edge) =>
        edge?.source === data?.id && edge?.sourceHandle === sourceHandleId
    );
    let text = "";
    switch (edge?.data?.cardinality) {
      case TIPOS_CARDINALIDAD.ONE_TO_ONE:
        text = "1";
        break;
      case TIPOS_CARDINALIDAD.ONE_TO_MANY:
        text = "1";
        break;
      case TIPOS_CARDINALIDAD.MANY_TO_ONE:
        text = "N";
        break;
      case TIPOS_CARDINALIDAD.MANY_TO_MANY:
        text = "N";
        break;
      default:
        text = "";
    }
    if (!text) return null;
    return <div className={styles.edge_cardinality_source}>{text}</div>;
  };

  const cardinalityByEdgeTarget = (targetHandleId: string) => {
    const edge = edges.find(
      (edge) =>
        edge?.target === data?.id && edge?.targetHandle === targetHandleId
    );
    let text = "";
    switch (edge?.data?.cardinality) {
      case TIPOS_CARDINALIDAD.ONE_TO_ONE:
        text = "1";
        break;
      case TIPOS_CARDINALIDAD.ONE_TO_MANY:
        text = "N";
        break;
      case TIPOS_CARDINALIDAD.MANY_TO_ONE:
        text = "1";
        break;
      case TIPOS_CARDINALIDAD.MANY_TO_MANY:
        text = "N";
        break;
      default:
        text = "";
    }
    if (!text) return null;
    return <div className={styles.edge_cardinality_target}>{text}</div>;
  };

  return (
    <div className={styles.container_node_database}>
      <div
        style={{
          background: "#b6c6e3",
          color: "#222",
          fontWeight: 600,
          fontSize: 14,
          padding: "6px 12px",
          borderBottom: "1px solid #b6c6e3",
        }}
      >
        <div className="flex items-center justify-between">
          {data.name}
          <IconButton size="small" onClick={handleClick} style={{ padding: 4 }}>
            <FiMoreVertical size={16} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 48 * 4.5,
                  width: "150px",
                  fontSize: "10px",
                },
              },
            }}
          >
            <MenuItem onClick={handleDelete}>
              <FiTrash2 style={{ marginRight: 8 }} />
              Eliminar
            </MenuItem>
            <MenuItem onClick={handleAddRelacion}>
              <FiPlusCircle style={{ marginRight: 8 }} />
              Relación
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>
        {data.fields.map((field) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 13,
              marginBottom: 2,
              color: "#222",
              padding: "6px 12px",
              position: "relative",
            }}
          >
            {cardinalityByEdgeTarget(`target_${field.id}`)}

            <Handle
              type="target"
              position={Position.Left}
              className={styles.handle_target}
              id={`target_${field.id}`}
            ></Handle>
            <span
              style={{
                width: 110,
                fontWeight: field.name === "id" ? 600 : 400,
              }}
            >
              {field.name}
              {field.name === "id" && (
                <span
                  style={{ color: "#7ca1d6", marginLeft: 4 }}
                  title="Primary Key"
                >
                  🔑
                </span>
              )}
            </span>
            <span style={{ color: "#7ca1d6", fontSize: 12 }}>{field.type}</span>
            <Handle
              type="source"
              position={Position.Right}
              className={styles.handle_source}
              id={`source_${field.id}`}
            ></Handle>

            {cardinalityByEdgeSource(`source_${field.id}`)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomNodeDatabase;
