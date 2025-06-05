import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import ListItemLink from "./ListItemLink";
import { NavigationItem } from "@/config/navigation";
interface ListItemLinkCollapseProps {
  texto: string;
  icono: React.ComponentType;
  listaItems: NavigationItem[];
}

function ListItemLinkCollapse({
  texto,
  icono,
  listaItems,
}: ListItemLinkCollapseProps) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open); // Invierte el valor de 'open'
  };
  const Icon = icono;
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          color: "#7b808d",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "10px",
        }}
      >
        {/* Contenido del ListItemButton */}
        <ListItemIcon
          sx={{
            width: "24px",
            minWidth: "24px",
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={texto}
          sx={{
            fontSize: "14px",
            fontWeight: "medium",
            color: "#7b808d",
          }}
          disableTypography
        />
        {
          // Si 'open' es true, muestra el icono de 'AiOutlineUp', si no, muestra el icono de 'AiOutlineDown'
          open ? (
            <AiOutlineUp
              style={{
                fontSize: "12px",
                color: "#7b808d",
              }}
            />
          ) : (
            <AiOutlineDown
              style={{
                fontSize: "12px",
                color: "#7b808d",
              }}
            />
          )
        }
      </ListItemButton>
      {/* Contenido del Collapse */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            // Recorre la lista de items y por cada uno crea un ListItemButton
            listaItems.map((item, index) => (
              <ListItemLink
                to={item.href}
                primary={item.name}
                icon={item.icon}
                key={index}
              />
            ))
          }
        </List>
      </Collapse>
    </>
  );
}

export default ListItemLinkCollapse;
