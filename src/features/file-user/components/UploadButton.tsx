import React from "react";
import { FaUpload } from "react-icons/fa";

interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      <FaUpload className="w-4 h-4" />
      Subir
    </button>
  );
};

export default UploadButton; 