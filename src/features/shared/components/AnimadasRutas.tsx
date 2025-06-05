import React from "react";
import { motion } from "framer-motion";

export const AnimadasRutas = ({ children }) => (
  <motion.div
    className="flex flex-col grow"
    initial={{
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
