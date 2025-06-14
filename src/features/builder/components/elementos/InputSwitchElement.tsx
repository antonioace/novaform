import React, { useState } from "react";
import { BaseElementProps } from "./types";

const InputSwitchElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center gap-2" style={styles} {...eventHandlers}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isChecked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isChecked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default InputSwitchElement;
