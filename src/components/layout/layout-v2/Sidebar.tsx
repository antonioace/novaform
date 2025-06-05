import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import MenuInfo from "./MenuInfo";
import { motion } from "framer-motion";
import { NavigationSection } from "@/config/navigation";
import ListaMenuItems from "./ListaMenuItems";

const drawerWidth = 240;
export interface SidebarProps {
  children: React.ReactNode;
  items: NavigationSection[];
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
  logo: React.ReactNode;
}
function Sidebar({
  children,
  items,
  openSidebar,
  setOpenSidebar,
  logo,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpenSidebar(!openSidebar);
  };

  const drawerVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100, // Reducir la rigidez para una animación más suave
        damping: 20, // Añadir amortiguación
        duration: 0.5, // Ajustar la duración si es necesario
      },
    },
    closed: {
      x: "-100%",
      opacity: 0, // Mantén la opacidad en 0 para una desaparición completa
      transition: {
        type: "spring",
        stiffness: 50, // Disminuir aún más la rigidez
        damping: 30, // Aumentar la amortiguación
        duration: 0.8, // Aumentar la duración para una transición más gradual
      },
    },
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: "0px",
        }}
      >
        {logo}
      </Toolbar>
      <div className="px-4">
        {" "}
        <ListaMenuItems items={items} />
      </div>
    </div>
  );

  return (
    <>
      <MenuInfo
        abrirMenuCelular={handleDrawerToggle}
        openSidebar={openSidebar}
      />
      <Box
        sx={{ display: "flex", position: "relative", flex: 1, height: "100vh" }}
      >
        <CssBaseline />
        {/* */}
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            disableScrollLock={true}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            disableScrollLock={true}
            variant="permanent"
            sx={{
              display: {
                xs: "none",
                sm: openSidebar ? "block" : "none",
                md: openSidebar ? "block" : "none",
                lg: openSidebar ? "block" : "none",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open={openSidebar}
          >
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate={openSidebar ? "open" : "closed"}
            >
              {drawer}
            </motion.div>
          </Drawer>
        </Box>
        {children}
      </Box>
    </>
  );
}

export default Sidebar;
