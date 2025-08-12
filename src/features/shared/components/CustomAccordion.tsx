import React, { CSSProperties, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface CustomAccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  styles?: {
    container?: CSSProperties;
    header?: CSSProperties;
    content?: CSSProperties;
    icon?: CSSProperties;
  };
  className?: {
    container?: string;
    header?: string;
    content?: string;
    icon?: string;
  };
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  styles = {},
  className = {},
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={styles.container}
      className={`border border-[#919eab14] rounded-lg  bg-white ${
        className.container || ""
      }`}
    >
      <div
        onClick={toggleAccordion}
        style={styles.header}
        className={`flex items-center justify-between  cursor-pointer transition-colors ${
          className.header || ""
        }`}
      >
        <div className="font-medium">{title}</div>
        <div
          style={styles.icon}
          className={`text-gray-500 transition-transform ${
            className.icon || ""
          }`}
        >
          {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            ...styles.content,
            maxHeight: isOpen ? "auto" : "0",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
          }}
          className={`transition-all duration-300 ease-in-out  ${
            className.content || ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
