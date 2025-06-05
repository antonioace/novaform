import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
export interface ListItemLinkProps {
  icon: React.ComponentType;
  primary: string;
  to: string;
}
function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const pathname = usePathname();
  const isActive = pathname === to;
  console.log("Route pathname", pathname);
  console.log("To", to);
  const Icon = icon;
  return (
    <li>
      <Link href={to} passHref style={{ textDecoration: "none" }}>
        <ListItem
          component="button"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            gap: "10px",
            backgroundColor: isActive ? "#eff0fd" : "transparent",
            color: isActive ? "#4e52eb" : "#7b808d",
            "& .MuiListItemIcon-root": {
              color: "#7b808d",
            },
          }}
        >
          {icon ? (
            <ListItemIcon
              sx={{
                width: "24px",
                minWidth: "24px",
              }}
            >
              <Icon />
            </ListItemIcon>
          ) : null}
          <ListItemText
            primary={primary}
            disableTypography
            sx={{
              fontSize: "14px",
              fontWeight: "medium",
            }}
          />
        </ListItem>
      </Link>
    </li>
  );
}
export default ListItemLink;
