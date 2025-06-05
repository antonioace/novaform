import React from "react";
import { Block } from "../context/BuilderContext";

export interface RenderBlockProps {
  block: Block;
}
function RenderBlock({ block }: RenderBlockProps) {
  return "hola";
}

export default RenderBlock;
