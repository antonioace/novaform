import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";

function MenuInfo({ abrirMenuCelular, openSidebar }) {
  const router = useRouter();
  const { logout } = useAuth();
  const deslogear = () => {
    logout();
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${openSidebar ? 240 : 0}px)` },
        backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% de transparencia
        boxShadow: "none",
        borderBottom: "1px solid #f4f6f8",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          padding: "0px",
          width: "100%",
        }}
      >
        <Toolbar disableGutters>
          <div
            onClick={abrirMenuCelular}
            style={{
              marginRight: 2,
              cursor: "pointer",
              display: "flex",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RiMenuFoldLine
              style={{
                width: "18px",
                height: "18px",
                color: "#aeb6be",
              }}
            />
          </div>

          <Box sx={{ flexGrow: 0, position: "absolute", right: "0" }}>
            <div className="flex items-center">
              <Tooltip title="Notificaciones">
                <div
                  style={{
                    padding: 0,
                    marginRight: "20px",
                    cursor: "pointer",
                    display: "flex",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IoNotificationsOutline
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "#aeb6be",
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title="Informacion del perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    style={{ width: "40px", height: "40px" }}
                    src={
                      "https://ui-avatars.com/api/?name=Usuario&background=random"
                    }
                  />
                </IconButton>
              </Tooltip>
            </div>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push("/dashboard/informacion-usuario");
                    }}
                  >
                    <ListItemText primary="Ver perfil" />
                  </ListItemButton>
                </ListItem>
              </MenuItem>

              <MenuItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      deslogear();
                    }}
                  >
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuInfo;
