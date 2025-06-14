import React from "react";

import { TemplateContentListModal } from "./TemplateContentListModal";

interface TemplateContentActionsProps {
  pageId: string;
  isListModalOpen: boolean;
  setIsListModalOpen: (isListModalOpen: boolean) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddTemplate: (content: any) => void;
}

export const TemplateContentActions: React.FC<TemplateContentActionsProps> = ({
  pageId,
  isListModalOpen,
  setIsListModalOpen,
  onAddTemplate,
}) => {
  return (
    <>
      <TemplateContentListModal
        open={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        pageId={pageId}
        onAddTemplate={onAddTemplate}
      />
    </>
  );
};
