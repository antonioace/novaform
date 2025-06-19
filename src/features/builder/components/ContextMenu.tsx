import React, { useEffect, useRef, useState } from "react";
import {
  FiChevronUp,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
  FiTrash2,
  FiCopy,
  FiFile,
  FiClipboard,
  FiLayers,
  FiBox,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiSave,
  FiList,
} from "react-icons/fi";
import { CopiedContent, useContextMenu } from "../hooks/useContextMenu";
import { DISPOSITIVOS } from "../utils/interfaces";
import {
  CreateTemplateContentModal,
  TemplateContentListModal,
} from "@/features/template-content";
import { useBuilder } from "../context/BuilderContext";
import { TemplateContent } from "@/features/template-content/types/template-content.types";

function ContextMenu() {
  const {
    contextMenu,
    hideContextMenu,
    deleteBlock,
    duplicateBlock,
    wrapInContainer,
    selectParent,
    copyStylesToDesktop,
    copyStylesToTablet,
    copyStylesToMobile,
    dispositivoActual,
    moveBlockUp,
    moveBlockDown,
    moveBlockForward,
    moveBlockBackward,
    copyStylesToAllTablets,
    copyStylesToAllMobiles,
    copyStylesToAllDevices,
    copyBlock,
    pasteBlock,
    hasCopiedBlock,
    copiedContent,
    setCopiedContent,
  } = useContextMenu();

  const { page, getConfigAndStylesByBlockId } = useBuilder();
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] =
    useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (contextMenu.isVisible && menuContainerRef.current) {
      const menuRect = menuContainerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let x = contextMenu.x;
      let y = contextMenu.y;

      // Ajustar posición horizontal si está muy cerca del borde derecho
      if (x + menuRect.width > windowWidth) {
        x = windowWidth - menuRect.width - 10;
      }

      // Ajustar posición vertical si está muy cerca del borde inferior
      if (y + menuRect.height > windowHeight) {
        y = windowHeight - menuRect.height - 10;
      }

      // Asegurar que no se salga por la izquierda o arriba
      x = Math.max(10, x);
      y = Math.max(10, y);

      setPosition({ x, y });
    }
  }, [contextMenu.isVisible, contextMenu.x, contextMenu.y]);

  // Manejo del click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        hideContextMenu();
      }
    };

    if (contextMenu.isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.isVisible, hideContextMenu]);

  const handleAddTemplate = (template: TemplateContent) => {
    const contentTemplate = template?.content as unknown as CopiedContent;
    if (contentTemplate) {
      pasteBlock(contentTemplate);
    }
    setIsListModalOpen(false);
  };

  const menuItems = (
    <div className="bg-white rounded-md shadow-lg p-2 text-[11px] max-h-[250px] overflow-y-auto">
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          wrapInContainer();
        }}
      >
        <FiBox className="mr-2" />
        Envolver en container
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          selectParent();
        }}
      >
        <FiLayers className="mr-2" />
        Seleccionar elemento padre
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 my-1"></div>

      {/* Opciones de copiar estilos */}
      <div className="text-[10px] text-gray-500 px-4 py-1 font-medium">
        Copiar estilos desde {dispositivoActual} a:
      </div>

      {dispositivoActual !== DISPOSITIVOS.DESKTOP && (
        <div
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
          onClick={(e) => {
            e.stopPropagation();
            copyStylesToDesktop();
          }}
        >
          <FiMonitor className="mr-2" />
          Computador
        </div>
      )}

      {dispositivoActual !== DISPOSITIVOS.TABLET && (
        <div
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
          onClick={(e) => {
            e.stopPropagation();
            copyStylesToTablet();
          }}
        >
          <FiTablet className="mr-2" />
          Tablet
        </div>
      )}

      {dispositivoActual !== DISPOSITIVOS.MOBILE && (
        <div
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
          onClick={(e) => {
            e.stopPropagation();
            copyStylesToMobile();
          }}
        >
          <FiSmartphone className="mr-2" />
          Celular
        </div>
      )}

      {/* Separador */}
      <div className="border-t border-gray-200 my-1"></div>

      {/* Nuevas opciones para copiar estilos a todos los elementos */}
      <div className="text-[10px] text-gray-500 px-4 py-1 font-medium">
        Copiar estilos a todos los elementos:
      </div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
        onClick={(e) => {
          e.stopPropagation();
          copyStylesToAllTablets();
        }}
      >
        <FiTablet className="mr-2" />
        Aplicar a todas las tablets
      </div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
        onClick={(e) => {
          e.stopPropagation();
          copyStylesToAllMobiles();
        }}
      >
        <FiSmartphone className="mr-2" />
        Aplicar a todos los celulares
      </div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
        onClick={(e) => {
          e.stopPropagation();
          copyStylesToAllDevices();
        }}
      >
        <FiMonitor className="mr-2" />
        Aplicar a todos los dispositivos
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 my-1"></div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          if (contextMenu.targetBlock) {
            moveBlockUp(contextMenu.targetBlock.id);
          }
          hideContextMenu();
        }}
      >
        <FiChevronUp className="mr-2" />
        Mover arriba
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          if (contextMenu.targetBlock) {
            moveBlockDown(contextMenu.targetBlock.id);
          }
          hideContextMenu();
        }}
      >
        <FiChevronDown className="mr-2" />
        Mover abajo
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          if (contextMenu.targetBlock) {
            moveBlockBackward(contextMenu.targetBlock.id);
          }
          hideContextMenu();
        }}
      >
        <FiArrowLeft className="mr-2" />
        Mover atrás
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          if (contextMenu.targetBlock) {
            moveBlockForward(contextMenu.targetBlock.id);
          }
          hideContextMenu();
        }}
      >
        <FiArrowRight className="mr-2" />
        Mover adelante
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-red-100 text-red-600 rounded"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            deleteBlock(e);
          }
        }}
      >
        <FiTrash2 className="mr-2" />
        Eliminar
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          duplicateBlock();
        }}
      >
        <FiCopy className="mr-2" />
        Duplicar
      </div>
      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          copyBlock();
        }}
      >
        <FiFile className="mr-2" />
        Copiar
      </div>
      <div
        className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded ${
          !hasCopiedBlock ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (hasCopiedBlock) {
            if (copiedContent) {
              pasteBlock(copiedContent);
            }
          }
        }}
      >
        <FiClipboard className="mr-2" />
        Pegar
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 my-1"></div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          setIsCreateTemplateModalOpen(true);
          const content = getConfigAndStylesByBlockId(
            contextMenu.targetBlock?.id || ""
          );
          if (content) {
            setCopiedContent({
              blocksList: content.blocksList,
              stylesList: content.stylesList,
              configList: content.configList,
            });
          }
          hideContextMenu();
        }}
      >
        <FiSave className="mr-2" />
        Guardar como plantilla
      </div>

      <div
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          setIsListModalOpen(true);
          hideContextMenu();
        }}
      >
        <FiList className="mr-2" />
        Agregar plantilla
      </div>
    </div>
  );
  return (
    <>
      <div
        ref={menuContainerRef}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          zIndex: 1000,
        }}
        className={`transform transition-all duration-200 ease-out ${
          contextMenu.isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {menuItems}
      </div>

      <CreateTemplateContentModal
        open={isCreateTemplateModalOpen}
        onClose={() => setIsCreateTemplateModalOpen(false)}
        pageId={page?.id || ""}
        content={copiedContent?.blocksList?.length ? copiedContent : null}
      />

      <TemplateContentListModal
        open={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        pageId={page?.id}
        onAddTemplate={handleAddTemplate}
      />
    </>
  );
}

export default ContextMenu;
