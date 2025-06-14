import React, { useState } from "react";
import { BaseElementProps } from "./types";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputPasswordElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <input
        type={showPassword ? "text" : "password"}
        {...eventHandlers}
        style={{
          ...styles,
        }}
        placeholder={block.name || "Ingrese contraseña"}
        className="builder-input"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showPassword ? (
          <MdVisibilityOff size={20} />
        ) : (
          <MdVisibility size={20} />
        )}
      </button>
    </div>
  );
};

export default InputPasswordElement;
