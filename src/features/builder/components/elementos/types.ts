import { Block, BlockConfig } from "../../utils/interfaces";
import React from "react";

export interface BaseElementProps {
  block: Block;
  styles?: React.CSSProperties;
  eventHandlers?: {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
    onDragStart?: (e: React.DragEvent<HTMLElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLElement>) => void;
    onDragLeave?: (e: React.DragEvent<HTMLElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    "data-block-id"?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: BlockConfig;
}
