import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <AiOutlineLoading3Quarters className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay; 