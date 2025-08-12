import React from "react";
import { Drawer } from "@mui/material";



interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  stylesContainer?: React.CSSProperties;
  stylesBody?: React.CSSProperties;
  stylesHeader?: React.CSSProperties;
  stylesTitle?: React.CSSProperties;
  title?: string;
  header?: React.ReactNode;
  showHeader?: boolean;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  width = "320px",
  children,
  styles,
  stylesHeader,
  stylesTitle,
  title,
  header,
  showHeader = true,
  stylesBody,
}) => {
 
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
    
      slotProps={{
        paper: {
          sx: {
            width: width || "320px",
            p: 0,
            ...styles,
          },
        },
      }}
    >
      <div className="flex flex-col gap-2 bg-[#fff] overflow-hidden flex-1"
      style={stylesBody}
      >
         { showHeader &&  !header && <div className="flex bg-white px-5 py-2" style={stylesHeader}>
            <h3 className="text-lg font-semibold" style={stylesTitle}>{title}</h3>
            </div>}
            {showHeader && header}
        {children}
        
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
