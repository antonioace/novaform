import React from "react";
import { motion } from "framer-motion";
import NovaFormLogo from "./theme/NovaFormLogo";

const GlobalLoading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#f8f9fa] bg-opacity-75 z-50">
      <div className="p-5 flex flex-col items-center">
        {/* Logo */}
        <NovaFormLogo
          estilos={{
            width: "150px",
          }}
          hideTitulo={true}
        />

        {/* Barra de carga */}
        <div className="relative w-full h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="absolute h-full bg-[#8319f7] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
