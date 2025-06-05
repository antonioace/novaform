import React from "react";
import { Drawer } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
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
} from "react-icons/md";
import { TiFlowMerge } from "react-icons/ti";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";
import PanelConfigElements from "./PanelConfigElements";
import { useBuilder } from "../context/BuilderContext";
import ColeccionesConfig from "../../database-creator/components/ColeccionesConfig";
import PanelConfigNavegacion from "./PanelConfigNavegacion";

enum DISPOSITIVOS {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

enum TIPOS_MENUS {
  AGREGAR_ELEMENTOS = "AGREGAR_ELEMENTOS",
  NAVEGACION = "NAVEGACION",
  FLUJO = "FLUJO",
  LIMPIAR = "LIMPIAR",
  COLECCIONES = "COLECCIONES",
}

interface CustomToolbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: any[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = () => {
  const { setDispositivoActual } = useBuilder();
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
  const [openConfirm, setOpenConfirm] = React.useState(false);

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
      key: TIPOS_MENUS.LIMPIAR,
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
        if (tipoConfig === TIPOS_MENUS.LIMPIAR) {
          setTipoConfig(null);
          return;
        }
        setTipoConfig(TIPOS_MENUS.LIMPIAR);
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
      ></Drawer>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>
          ¿Estás seguro de que deseas limpiar el contenido?
        </DialogTitle>
        <DialogActions>
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setOpenConfirm(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
            onClick={() => {
              // Aquí iría la lógica de limpieza
              setOpenConfirm(false);
            }}
          >
            Confirmar
          </button>
        </DialogActions>
      </Dialog>

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
            <div className="text-xs rounded-2xl mr-4  border border-[#EEEEEE] py-[3px] px-2 font-medium flex items-center  justify-center gap-3 cursor-pointer">
              <MdSave
                style={{
                  fontSize: "10px",
                  color: "#D1D1D1",
                }}
              />{" "}
              Guardar
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
