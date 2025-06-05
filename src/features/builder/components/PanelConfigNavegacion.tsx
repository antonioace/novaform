import React, { useState } from 'react';
import { MdOutlineFolder, MdOutlineFolderOpen, MdDescription } from 'react-icons/md';
import { Select, Switch, Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'Página Principal',
    key: '0-0',
    icon: <MdOutlineFolder size={18} />,
    children: [
      {
        title: 'Header',
        key: '0-0-0',
        icon: <MdOutlineFolder size={18} />,
        children: [
          { title: 'Logo', key: '0-0-0-0', icon: <MdDescription size={18} /> },
          {
            title: 'Menú de Navegación',
            key: '0-0-0-1',
            icon: <MdDescription size={18} />,
          },
          { title: 'Banner Principal', key: '0-0-0-2', icon: <MdDescription size={18} /> },
        ],
      },
      {
        title: 'Contenido',
        key: '0-0-1',
        icon: <MdOutlineFolder size={18} />,
        children: [{ title: 'Sección Productos', key: '0-0-1-0', icon: <MdDescription size={18} /> }],
      },
      {
        title: 'Footer',
        key: '0-0-2',
        icon: <MdOutlineFolder size={18} />,
        children: [
          { title: 'Contacto', key: '0-0-2-0', icon: <MdDescription size={18} /> },
          {
            title: 'Redes Sociales',
            key: '0-0-2-1',
            icon: <MdDescription size={18} />,
            switcherIcon: <MdOutlineFolderOpen size={18} />,
          },
        ],
      },
    ],
  },
  {
    title: 'Página Acerca de',
    key: '0-1',
    icon: <MdOutlineFolder size={18} />,
    children: [
      {
        title: 'Historia',
        key: '0-1-0',
        icon: <MdOutlineFolder size={18} />,
        children: [
          { title: 'Misión', key: '0-1-0-0', icon: <MdDescription size={18} /> },
          { title: 'Visión', key: '0-1-0-1', icon: <MdDescription size={18} /> },
        ],
      },
    ],
  },
];

const PanelConfigNavegacion: React.FC = () => {
  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [showLeafIcon, setShowLeafIcon] = useState<React.ReactNode>(true);

  const onSelect = (selectedKeys: React.Key[], info: TreeDataNode) => {
    console.log('selected', selectedKeys, info);
  };

  const handleLeafIconChange = (value: 'true' | 'false' | 'custom') => {
    if (value === 'custom') {
      return setShowLeafIcon(<MdDescription size={18} />);
    }

    if (value === 'true') {
      return setShowLeafIcon(true);
    }

    return setShowLeafIcon(false);
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
      }}
    >
      <h1 className="text-sm font-semibold mb-3">Estructura de Bloques</h1>
  
      <Tree
        showLine={showLine ? { showLeafIcon } : false}
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default PanelConfigNavegacion;