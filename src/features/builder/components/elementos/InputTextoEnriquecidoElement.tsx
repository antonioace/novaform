import React from "react";
import { BaseElementProps } from "./types";

const InputTextoEnriquecidoElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <div
      style={styles}
      {...eventHandlers}
      dangerouslySetInnerHTML={{
        __html: config?.config?.content_rich_text as string,
      }}
    />
  );
};

export default InputTextoEnriquecidoElement;
