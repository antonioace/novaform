import React, { useState } from "react";
import { BaseElementProps } from "./types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPasswordElement: React.FC<BaseElementProps> = ({
  block,
  styles,
  eventHandlers,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={block.name || "Ingrese contraseña"}
        style={styles}
        {...eventHandlers}
        className="input-element-builder"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShowPassword((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 bg-transparent border-none p-1 cursor-pointer"
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
    </div>
  );
};

export default InputPasswordElement;
