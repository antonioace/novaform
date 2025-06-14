import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdExpandMore, MdCheck } from "react-icons/md";

interface UnitSelectorProps {
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
  availableUnits?: string[];
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  selectedUnit,
  onUnitChange,
  availableUnits = ["px", "%", "em", "rem", "vh", "vw", "auto"],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnitSelect = (unit: string) => {
    onUnitChange(unit);
    handleClose();
  };

  const getUnitLabel = (unit: string) => {
    const labels: Record<string, string> = {
      px: "Píxeles",
      "%": "Porcentaje",
      em: "Em",
      rem: "Rem",
      vh: "Viewport Height",
      vw: "Viewport Width",
      auto: "Automático",
      pt: "Puntos",
      cm: "Centímetros",
      mm: "Milímetros",
      in: "Pulgadas",
    };
    return labels[unit] || unit;
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            padding: "2px 6px",
            minWidth: "32px",
            fontSize: "11px",
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
            },
          }}
          aria-controls={open ? "unit-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 400,
              marginRight: "2px",
              fontFamily: "monospace",
            }}
          >
            {selectedUnit}
          </Typography>
          <MdExpandMore style={{ fontSize: "12px" }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="unit-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 140,
              maxHeight: 200,
              "& .MuiMenuItem-root": {
                fontSize: "12px",
                minHeight: "32px",
                paddingY: "4px",
                paddingX: "12px",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {availableUnits.map((unit) => (
          <MenuItem
            key={unit}
            onClick={() => handleUnitSelect(unit)}
            selected={selectedUnit === unit}
            sx={{
              backgroundColor:
                selectedUnit === unit ? "#eff6ff !important" : "transparent",
              color: selectedUnit === unit ? "#1d4ed8" : "#374151",
              fontWeight: selectedUnit === unit ? 500 : 400,
              "&:hover": {
                backgroundColor:
                  selectedUnit === unit ? "#dbeafe !important" : "#f9fafb",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    fontWeight: "inherit",
                    marginRight: "8px",
                  }}
                >
                  {unit}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#6b7280",
                    fontWeight: 400,
                  }}
                >
                  {getUnitLabel(unit)}
                </Typography>
              </Box>
              {selectedUnit === unit && (
                <ListItemIcon sx={{ minWidth: "auto", marginLeft: "8px" }}>
                  <MdCheck style={{ fontSize: "14px", color: "#1d4ed8" }} />
                </ListItemIcon>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default UnitSelector; 