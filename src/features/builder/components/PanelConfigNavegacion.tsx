import React from "react";
import { MdOutlineFolder, MdDescription, MdMoreVert } from "react-icons/md";
import { Tree, Dropdown } from "antd";
import type { TreeDataNode, MenuProps } from "antd";
import { useBuilder } from "../context/BuilderContext";
import { Block } from "../utils/interfaces";

const PanelConfigNavegacion: React.FC = () => {
  const {
    blocksList,
    bloqueActual,
    setBloqueActual,
    removeBlock,
    duplicateBlock,
  } = useBuilder();

  const handleMenuClick: (blockId: string) => MenuProps["onClick"] =
    (blockId) =>
    ({ key }) => {
      if (key === "delete") {
        removeBlock(blockId);
      } else if (key === "duplicate") {
        duplicateBlock(blockId);
      }
    };

  const renderTitle = (block: Block) => {
    const items: MenuProps["items"] = [
      {
        label: "Duplicar",
        key: "duplicate",
      },
      {
        label: "Eliminar",
        key: "delete",
        danger: true,
      },
    ];

    const icon =
      block.type === "CONTENEDOR" ? (
        <MdOutlineFolder size={18} />
      ) : (
        <MdDescription size={18} />
      );

    return (
      <div className="flex items-center justify-between w-full group">
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <span>{block.name || block.type}</span>
        </div>
        <Dropdown
          menu={{ items, onClick: handleMenuClick(block.id) }}
          trigger={["click"]}
        >
          <button
            className="p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <MdMoreVert />
          </button>
        </Dropdown>
      </div>
    );
  };

  const transformBlocksToTreeData = (blocks: Block[]): TreeDataNode[] => {
    return blocks.map((block) => ({
      key: block.id,
      title: renderTitle(block),
      children: block.children ? transformBlocksToTreeData(block.children) : [],
    }));
  };

  const onSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const findBlock = (blocks: Block[], id: React.Key): Block | null => {
        for (const block of blocks) {
          if (block.id === id) return block;
          if (block.children) {
            const found = findBlock(block.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      const selectedBlock = findBlock(blocksList, selectedKeys[0]);
      setBloqueActual(selectedBlock);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        height: "100%",
        width: "var(--editor-width-tabpanel)",
        outline: "none",
        borderRight: "1px solid #eeeeee",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <h1 className="text-sm font-semibold mb-3">Estructura de Bloques</h1>
      {blocksList.length > 0 ? (
        <Tree
          className="compact-tree"
          showLine={{ showLeafIcon: false }}
          defaultExpandAll
          onSelect={onSelect}
          selectedKeys={bloqueActual ? [bloqueActual.id] : []}
          treeData={transformBlocksToTreeData(blocksList)}
        />
      ) : (
        <div className="text-center text-gray-400 mt-4">
          Aún no hay bloques.
        </div>
      )}
    </div>
  );
};

export default PanelConfigNavegacion;
