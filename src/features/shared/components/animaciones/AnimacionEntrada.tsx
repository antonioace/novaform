import { motion } from "framer-motion";
import React from "react";

function AnimacionEntrada({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { ease: "easeIn", duration: 0.2 },
      }}
      exit={{
        y: -10,
        opacity: 0,
        transition: {
          duration: 0.2,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimacionEntrada;
