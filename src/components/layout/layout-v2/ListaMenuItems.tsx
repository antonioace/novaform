import { Box, List } from "@mui/material";
import React from "react";
import ListItemLinkCollapse from "./ListItemLinkCollapse";
import { NavigationSection } from "@/config/navigation";
import ListItemLink from "./ListItemLink";

function ListaMenuItems({ items }: { items: NavigationSection[] }) {
  return (
    <Box>
      <List>
        {items.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {section.items.map((item, itemIndex) =>
              item?.children ? (
                <ListItemLinkCollapse
                  key={`${sectionIndex}-${itemIndex}`}
                  icono={item.icon}
                  texto={item.name}
                  listaItems={item.children}
                ></ListItemLinkCollapse>
              ) : (
                <ListItemLink
                  key={`${sectionIndex}-${itemIndex}`}
                  to={item.href}
                  primary={item.name}
                  icon={item.icon}
                />
              )
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default ListaMenuItems;
