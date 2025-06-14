import React from "react";
import { Drawer } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  MdComputer,
  MdPhoneIphone,
  MdTablet,
  MdAdd,
  MdHome,
  MdSave,
  MdCleaningServices,
  MdNavigation,
  MdStorage,
  MdVisibility,
  MdClose,
} from "react-icons/md";
import { TiFlowMerge } from "react-icons/ti";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";
import PanelConfigElements from "./PanelConfigElements";
import { useBuilder } from "../context/BuilderContext";
import ColeccionesConfig from "../../database-creator/components/ColeccionesConfig";
import PanelConfigNavegacion from "./PanelConfigNavegacion";
import LimpiarModal from "./LimpiarModal";
import VistaPrevita from "./VistaPrevita";

enum DISPOSITIVOS {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

enum TIPOS_MENUS {
  AGREGAR_ELEMENTOS = "AGREGAR_ELEMENTOS",
  NAVEGACION = "NAVEGACION",
  FLUJO = "FLUJO",
  COLECCIONES = "COLECCIONES",
  LIMPIAR = "LIMPIAR",
}

interface CustomToolbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: any[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = () => {
  const { setDispositivoActual, savePage, savingPage } = useBuilder();
  const [modoEdicion, setModoEdicion] = React.useState<DISPOSITIVOS>(
    DISPOSITIVOS.DESKTOP
  );
  const [tipoConfig, setTipoConfig] = React.useState<TIPOS_MENUS | null>(null);
  const handleSetModoEdicion = (modo: DISPOSITIVOS) => {
    setModoEdicion(modo);
    setDispositivoActual(modo);
  };
  const [drawerVistaPrevia, setDrawerVistaPrevia] =
    React.useState<boolean>(false);
  const [openLimpiarModal, setOpenLimpiarModal] = React.useState(false);

  const optionsHorizontalToolbar = [
    {
      key: TIPOS_MENUS.AGREGAR_ELEMENTOS,
      icon: (
        <MdAdd
          style={{
            fontSize: "20px",
            color: "#D1D1D1",
          }}
        />
      ),
      label: "Agregar elementos",
      onClick: () => {
        if (tipoConfig === TIPOS_MENUS.AGREGAR_ELEMENTOS) {
          setTipoConfig(null);
          return;
        }
        setTipoConfig(TIPOS_MENUS.AGREGAR_ELEMENTOS);
      },
    },
    {
      key: "LIMPIAR",
      icon: (
        <MdCleaningServices
          style={{
            fontSize: "20px",
            color: "#D1D1D1",
          }}
        />
      ),
      label: "Limpiar",
      onClick: () => {
        setOpenLimpiarModal(true);
      },
    },
    {
      key: TIPOS_MENUS.NAVEGACION,
      icon: (
        <MdNavigation
          style={{
            fontSize: "20px",
            color: "#D1D1D1",
          }}
        />
      ),
      onClick: () => {
        if (tipoConfig === TIPOS_MENUS.NAVEGACION) {
          setTipoConfig(null);
          return;
        }
        setTipoConfig(TIPOS_MENUS.NAVEGACION);
      },
    },
    {
      key: TIPOS_MENUS.FLUJO,
      icon: (
        <TiFlowMerge
          style={{
            fontSize: "20px",
            color: "#D1D1D1",
          }}
        />
      ),
      label: "Flujo",
      onClick: () => {
        if (tipoConfig === TIPOS_MENUS.FLUJO) {
          setTipoConfig(null);
          return;
        }
        setTipoConfig(TIPOS_MENUS.FLUJO);
      },
    },
    {
      label: "Colecciones",
      key: TIPOS_MENUS.COLECCIONES,
      onClick: () => {
        if (tipoConfig === TIPOS_MENUS.COLECCIONES) {
          setTipoConfig(null);
          return;
        }
        setTipoConfig(TIPOS_MENUS.COLECCIONES);
      },
      icon: (
        <MdStorage
          style={{
            fontSize: "20px",
            color: "#D1D1D1",
          }}
        />
      ),
    },
  ];
  return (
    <>
      <Drawer
        open={drawerVistaPrevia}
        anchor="right"
        onClose={() => setDrawerVistaPrevia(false)}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MdVisibility
              style={{
                fontSize: "20px",
                color: "#6b7280",
              }}
            />
            <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#374151" }}>
              Vista Previa
            </h2>
          </div>
          <button
            onClick={() => setDrawerVistaPrevia(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
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
            Regresar
          </button>
        </div>

        {/* Contenido de la vista previa */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <VistaPrevita />
        </div>
      </Drawer>

      <LimpiarModal
        open={openLimpiarModal}
        onClose={() => setOpenLimpiarModal(false)}
      />

      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "35px",
          width: "100%",
          borderBottom: "1px solid #EEEEEE",
          zIndex: "200",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="w-full flex items-center ">
          <div
            style={{
              borderRight: "1px solid #EEEEEE",
              maxWidth: "var(--editor-width-custom-toolbar)",
              minWidth: "var(--editor-width-custom-toolbar)",
              maxHeight: "35px",
              minHeight: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <NovaFormLogo
              estilos={{
                minWidth: "60px",
                width: "60px",
              }}
            />
          </div>
          <Link
            href="/dashboard/settings"
            className="text-xs rounded-2xl border border-[#EEEEEE] py-[3px] px-2 font-medium flex items-center  justify-center gap-3 cursor-pointer"
          >
            <MdHome
              style={{
                fontSize: "10px",
                color: "#D1D1D1",
              }}
            />{" "}
            Dashboard
          </Link>

          <div className="flex items-center grow gap-3 justify-center">
            <span
              onClick={() => {
                handleSetModoEdicion(DISPOSITIVOS.DESKTOP);
              }}
              style={{
                backgroundColor:
                  modoEdicion === DISPOSITIVOS.DESKTOP
                    ? "#f2f2f2"
                    : "transparent",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {" "}
              <MdComputer
                style={{
                  fontSize: "20px",
                  color: "#D1D1D1",
                  cursor: "pointer",
                }}
              />{" "}
            </span>
            <span
              onClick={() => {
                handleSetModoEdicion(DISPOSITIVOS.TABLET);
              }}
              style={{
                backgroundColor:
                  modoEdicion === DISPOSITIVOS.TABLET
                    ? "#f2f2f2"
                    : "transparent",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {" "}
              <MdTablet
                style={{
                  fontSize: "20px",
                  color: "#D1D1D1",
                  cursor: "pointer",
                }}
              />
            </span>
            <span
              onClick={() => {
                handleSetModoEdicion(DISPOSITIVOS.MOBILE);
              }}
              style={{
                backgroundColor:
                  modoEdicion === DISPOSITIVOS.MOBILE
                    ? "#f2f2f2"
                    : "transparent",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {" "}
              <MdPhoneIphone
                style={{
                  fontSize: "20px",
                  color: "#D1D1D1",
                  cursor: "pointer",
                }}
              />{" "}
            </span>
          </div>
          <div className="ml-auto flex items-center">
            <div 
              onClick={() => {
                setDrawerVistaPrevia(true);
                setTipoConfig(null); // Cerrar cualquier panel abierto
              }}
              className="text-xs rounded-2xl mr-2 border border-[#EEEEEE] py-[3px] px-2 font-medium flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <MdVisibility
                style={{
                  fontSize: "10px",
                  color: "#D1D1D1",
                }}
              />
              Vista Previa
            </div>
            <div 
              onClick={async () => {
                const success = await savePage();
                if (success) {
                  console.log("Página guardada exitosamente");
                }
              }}
              className="text-xs rounded-2xl mr-4  border border-[#EEEEEE] py-[3px] px-2 font-medium flex items-center  justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{
                opacity: savingPage ? 0.6 : 1,
                pointerEvents: savingPage ? 'none' : 'auto'
              }}
            >
              <MdSave
                style={{
                  fontSize: "10px",
                  color: "#D1D1D1",
                }}
              />{" "}
              {savingPage ? "Guardando..." : "Guardar"}
            </div>
          </div>
        </div>
      </div>
      <div
        className="toolbar"
        style={{
          position: "fixed",
          top: "35px",
          width: "40px",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #EEEEEE",
          backgroundColor: "#FFFFFF",
          zIndex: "200",
        }}
      >
        <div className="flex flex-col items-center">
          {optionsHorizontalToolbar.map((option) => (
            <button
              key={option.key}
              onClick={option.onClick}
              className="p-2 hover:bg-gray-100 rounded-md"
              style={{
                backgroundColor:
                  tipoConfig === option.key ? "#f2f2f2" : "transparent",
              }}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {[
          TIPOS_MENUS.AGREGAR_ELEMENTOS,
          TIPOS_MENUS.NAVEGACION,
          TIPOS_MENUS.FLUJO,
          TIPOS_MENUS.COLECCIONES,
        ].includes(tipoConfig as TIPOS_MENUS) && (
          <motion.div
            initial={{ x: -290 }}
            animate={{ x: 0 }}
            exit={{ x: -290 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: "35px",
              left: "40px",
              width: "var(--editor-width-tabpanel)",
              maxWidth: "var(--editor-width-tabpanel)",
              height: "calc(100vh - 35px)",
              overflowY: "hidden",
              backgroundColor: "#FFFFFF",
              zIndex: "100",
            }}
          >
            {tipoConfig === TIPOS_MENUS.AGREGAR_ELEMENTOS && (
              <PanelConfigElements />
            )}
            {tipoConfig === TIPOS_MENUS.NAVEGACION && <PanelConfigNavegacion />}
            {tipoConfig === TIPOS_MENUS.FLUJO && <div>Panel de flujo</div>}
            {tipoConfig === TIPOS_MENUS.COLECCIONES && <ColeccionesConfig />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomToolbar;
