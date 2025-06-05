import React from "react";
import { motion } from "framer-motion";

const CustomTabText = ({ text, active, onClick }) => {
  const baseClasses = "text-[#000]    cursor-pointer  hover:font-bold";
  const activeClass = active ? "font-bold " : "font-[600]";

  return (
    <motion.div
      onClick={onClick}
      className={`${baseClasses} ${activeClass}  w-fit   px-3 pb-3 relative `}
    >
      {" "}
      {active ? (
        <motion.div className="underline" layoutId="underline" />
      ) : null}
      <button>{text}</button>
    </motion.div>
  );
};
export default CustomTabText;
