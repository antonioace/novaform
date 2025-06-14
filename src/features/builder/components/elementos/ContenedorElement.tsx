import React from "react";
import { BaseElementProps } from "./types";
import RenderBlock from "../RenderBlock";

const ContenedorElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  return (
    <div
      {...eventHandlers}
      style={{
        ...styles,
      }}
    >
      {block.children && block.children.length > 0 ? (
        block.children.map((child) => (
          <RenderBlock key={child.id} block={child} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContenedorElement;
