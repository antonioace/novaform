import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  useGetTemplateContents,
  useRemoveTemplateContent,
  useGetTemplateContentByPageId,
} from "../hooks/useTemplateContent";
import { TemplateContent } from "../types/template-content.types";
import { useNotification } from "@/contexts/NotificationContext";
import { BuilderProvider } from "@/features/builder/context/BuilderContext";
import RenderBlock from "@/features/builder/components/RenderBlock";
import { CopiedContent } from "@/features/builder/hooks/useContextMenu";
import { FaTrash } from "react-icons/fa";

interface TemplateContentListModalProps {
  open: boolean;
  onClose: () => void;
  pageId?: string;
  onAddTemplate: (content: TemplateContent) => void;
}

export const TemplateContentListModal: React.FC<
  TemplateContentListModalProps
> = ({ open, onClose, pageId, onAddTemplate }) => {
  const [templates, setTemplates] = useState<TemplateContent[]>([]);
  const { findAll, loading: loadingList } = useGetTemplateContents();
  const { findByPageId, loading: loadingByPageId } =
    useGetTemplateContentByPageId();
  const { remove, loading: loadingRemove } = useRemoveTemplateContent();
  const { showSuccess, showError } = useNotification();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchTemplates = async () => {
    let response;
    if (pageId) {
      response = await findByPageId(pageId);
    } else {
      response = await findAll();
    }
    if (response?.success && response.data) {
      setTemplates(response.data);
    }
  };

  useEffect(() => {
    if (open) {
      fetchTemplates();
    }
  }, [open, pageId]);

  const handleRemove = async (id: string) => {
    const response = await remove(id);
    if (response?.success) {
      showSuccess("Plantilla eliminada exitosamente");
      fetchTemplates();
    } else {
      showError(response?.error || "Error al eliminar la plantilla");
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const renderContent = (content: TemplateContent) => {
    const contentTemplate = content.content as unknown as CopiedContent;
    return (
      <div className="w-full h-[120px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
        <BuilderProvider
          config={contentTemplate?.configList || []}
          styles={contentTemplate?.stylesList || []}
          blocks={contentTemplate?.blocksList || []}
        >
          {contentTemplate?.blocksList?.map((block) => (
            <RenderBlock key={block.id} block={block} />
          ))}
        </BuilderProvider>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Plantillas de Contenido
        </h2>

        {loadingList || loadingByPageId ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 max-h-[calc(90vh-200px)] overflow-y-auto pr-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="relative group bg-white border border-[#eeeeee] rounded-lg transition cursor-pointer flex flex-col items-center hover:border-[#a1a1a1] 
      hover:shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]  w-[180px] min-h-[220px] mx-auto"
                onClick={() => onAddTemplate(template)}
                style={{ fontSize: "0.85rem" }}
              >
                {/* Botón eliminar solo en hover */}
                <button
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(template.id);
                    setConfirmOpen(true);
                  }}
                >
                  <FaTrash className="text-black text-lg" />
                </button>
                {renderContent(template)}
                <div className="flex flex-col items-center px-2 py-2 w-full">
                  <span className="text-xs font-semibold text-blue-700 text-center truncate w-full">
                    {template.name}
                  </span>
                  <span className="text-[11px] text-gray-500 mb-1 text-center truncate w-full">
                    {template.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end border-t pt-4">
          <Button variant="contained" onClick={onClose} className="ml-2">
            Cerrar
          </Button>
        </div>

        {/* Modal de confirmación para eliminar */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>¿Eliminar plantilla?</DialogTitle>
          <DialogContent>
            ¿Estás seguro de que deseas eliminar esta plantilla? Esta acción no
            se puede deshacer.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="inherit">
              Cancelar
            </Button>
            <Button
              onClick={() => deleteId && handleRemove(deleteId)}
              color="error"
              variant="contained"
              disabled={loadingRemove}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Modal>
  );
};
