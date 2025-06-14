import React from "react";
import RenderBlock from "./RenderBlock";
import { Block } from "../utils/interfaces";

export interface BlockProps {
  block: Block;
}

function BlockElement({ block }: BlockProps) {
  return (
    <>
      <RenderBlock block={block} />

      
    </>
  );
}

export default BlockElement;
