import React from "react";
import { BaseElementProps } from "./types";

const ImagenElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <div className="w-full" style={styles} {...eventHandlers}>
      <img
        src={config?.config?.imagen_src as string}
        alt={config?.config?.imagen_alt as string}
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
  );
};

export default ImagenElement;
