import React from "react";
import { BaseElementProps } from "./types";
import RenderBlock from "../RenderBlock";

const FormularioElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <form
      {...eventHandlers}
      onSubmit={handleSubmit}
      style={{
        ...styles,
      }}
    >
      {block.children && block.children.length > 0 ? (
        <>
          {block.children.map((child) => (
            <RenderBlock key={child.id} block={child} />
          ))}
        </>
      ) : (
        <></>
      )}
    </form>
  );
};

export default FormularioElement;
