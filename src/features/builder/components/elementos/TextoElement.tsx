import React from "react";
import { BaseElementProps } from "./types";
import { Tooltip } from "@mui/material";

const TextoElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
  config,
}) => {
  return (
    <Tooltip title={config?.config?.texto_tooltip || ""}>
      <p
        {...eventHandlers}
        style={{
          ...styles,
        }}
      >
        {config?.config?.texto_content || "Texto"}
      </p>
    </Tooltip>
  );
};

export default TextoElement;
