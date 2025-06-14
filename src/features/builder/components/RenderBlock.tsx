import React from "react";
import { Block, BlockConfig } from "../utils/interfaces";
import { ELEMENTOS_COMPONENTES } from "./elementos";
import { useBlockEventHandlers } from "../hooks/useBlockEventHandlers";
import { useBlockStyles } from "../hooks/useBlockStyles";
import { useBlockConfig } from "../hooks/useBlockConfig";

export interface RenderBlockProps {
  block: Block;
}

const RenderBlock: React.FC<RenderBlockProps> = ({ block }) => {
  const { blockEventHandlers } = useBlockEventHandlers(block);
  const { elementStyles } = useBlockStyles(block);
  const { config } = useBlockConfig(block);
  
  const elementProps = { 
    block, 
    styles: elementStyles, 
    eventHandlers: blockEventHandlers,
    config: {
      blockId: block.id,
      config: config
    } as BlockConfig
  };
  
  // No renderizar el bloque si no es visible
  if (!config.isVisible) {
    return null;
  }

  const ElementComponent = ELEMENTOS_COMPONENTES[block.type as keyof typeof ELEMENTOS_COMPONENTES];
  if (!ElementComponent) {
    return (
      <div {...blockEventHandlers} style={elementStyles} className="builder-unknown">
        {block.name || "Elemento desconocido"}
      </div>
    );
  }

  return <ElementComponent {...elementProps} />;
};

export default RenderBlock;
