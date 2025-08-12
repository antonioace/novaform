import { Drawer } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FormValidation } from "../../types";
import FormValidacion from "../forms/FormValidacion";

interface DrawerValidacionsProps {
  open: boolean;
  onClose: () => void;
  data: FormValidation[];
}
function DrawerValidacions({ open, onClose, data }: DrawerValidacionsProps) {
  const methods = useForm();
  React.useEffect(() => {
    if (data) {
      methods.setValue("validations", data);
    }
  }, []);
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "400px",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header con botón de cerrar */}
      <FormProvider {...methods}>
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            zIndex: 10,
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#374151" }}>
            Validaciones
          </h2>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",

              fontSize: "14px",
              color: "#374151",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
          >
            <MdClose style={{ fontSize: "16px" }} />
          </button>
        </div>
        {/* Contenido de la vista previa */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <FormValidacion />
        </div>
      </FormProvider>
    </Drawer>
  );
}

export default DrawerValidacions;
