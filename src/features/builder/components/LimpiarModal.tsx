import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MdWarning, MdRefresh, MdDeleteSweep, MdSettings } from "react-icons/md";
import { useBuilder } from "../context/BuilderContext";

interface LimpiarModalProps {
  open: boolean;
  onClose: () => void;
}

interface OpcionesLimpieza {
  bloques: boolean;
  estilos: boolean;
  configuraciones: boolean;
  seleccion: boolean;
}

const LimpiarModal: React.FC<LimpiarModalProps> = ({ open, onClose }) => {
  const { 
    setBlocksList, 
    setStylesList, 
    setConfigList, 
    setBloqueActual,
    blocksList,
    stylesList,
    configList
  } = useBuilder();

  const [opciones, setOpciones] = useState<OpcionesLimpieza>({
    bloques: true,
    estilos: true,
    configuraciones: true,
    seleccion: true,
  });

  const [limpiarTodo, setLimpiarTodo] = useState(false);

  const [confirmacion, setConfirmacion] = useState("");
  const [procesoLimpieza, setProcesoLimpieza] = useState(false);

  const handleOpcionChange = (opcion: keyof OpcionesLimpieza) => {
    if (limpiarTodo) return; // No permitir cambios si "limpiar todo" está activo
    
    setOpciones(prev => ({
      ...prev,
      [opcion]: !prev[opcion]
    }));
  };

  const ejecutarLimpieza = async () => {
    setProcesoLimpieza(true);

    try {
      // Simular proceso de limpieza con delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (limpiarTodo) {
        // Limpiar todo completamente
        setBlocksList([]);
        setStylesList([]);
        setConfigList([]);
        setBloqueActual(null);
      } else {
        // Limpiar selectivamente según opciones
        if (opciones.bloques) {
          setBlocksList([]);
        }
        
        if (opciones.estilos) {
          setStylesList([]);
        }
        
        if (opciones.configuraciones) {
          setConfigList([]);
        }
        
        if (opciones.seleccion) {
          setBloqueActual(null);
        }
      }

      // Resetear estado local
      setConfirmacion("");
      setLimpiarTodo(false);
      setOpciones({
        bloques: true,
        estilos: true,
        configuraciones: true,
        seleccion: true,
      });
      setProcesoLimpieza(false);
      onClose();

    } catch (error) {
      console.error("Error durante la limpieza:", error);
      setProcesoLimpieza(false);
    }
  };

  const puedeEjecutar = confirmacion.toLowerCase() === "limpiar" && 
                       (limpiarTodo || opciones.bloques || opciones.estilos || opciones.configuraciones || opciones.seleccion);

  const obtenerEstadisticas = () => {
    return {
      totalBloques: blocksList.length,
      totalEstilos: stylesList.length,
      totalConfiguraciones: configList.length,
    };
  };

  const estadisticas = obtenerEstadisticas();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle className="flex items-center gap-3 pb-2">
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
          <MdSettings className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Configuración de Limpieza
          </h2>
          <p className="text-sm text-gray-500">
            Selecciona qué elementos deseas resetear
          </p>
        </div>
      </DialogTitle>

      <DialogContent className="pt-4">
        {/* Advertencia */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
          <MdWarning className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">
              ¡Acción irreversible!
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              Esta acción no se puede deshacer. Asegúrate de haber guardado tu trabajo.
            </p>
          </div>
        </div>

        {/* Estadísticas actuales */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Estado actual del dashboard:</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{estadisticas.totalBloques}</div>
              <div className="text-xs text-gray-600">Bloques</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{estadisticas.totalEstilos}</div>
              <div className="text-xs text-gray-600">Estilos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{estadisticas.totalConfiguraciones}</div>
              <div className="text-xs text-gray-600">Configuraciones</div>
            </div>
          </div>
        </div>

        {/* Opción de Limpiar Todo */}
        <div className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                  <MdDeleteSweep className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-900">Limpiar Todo Completamente</h3>
                  <p className="text-xs text-red-700">Resetea todo el dashboard a su estado inicial</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setLimpiarTodo(!limpiarTodo);
                  if (!limpiarTodo) {
                    // Si activa "limpiar todo", desactivar opciones individuales
                    setOpciones({
                      bloques: false,
                      estilos: false,
                      configuraciones: false,
                      seleccion: false,
                    });
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  limpiarTodo
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                }`}
              >
                {limpiarTodo ? "Activado" : "Activar"}
              </button>
            </div>
          </div>
        </div>

        {/* Opciones de limpieza selectiva */}
        {!limpiarTodo && (
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-gray-900">O selecciona qué limpiar individualmente:</h3>
          
          <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={opciones.bloques}
              onChange={() => handleOpcionChange('bloques')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <MdDeleteSweep className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">
                Eliminar todos los bloques
              </span>
            </div>
            <span className="ml-auto text-xs text-gray-500">
              ({estadisticas.totalBloques} elementos)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={opciones.estilos}
              onChange={() => handleOpcionChange('estilos')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></div>
              <span className="text-sm font-medium text-gray-900">
                Resetear estilos personalizados
              </span>
            </div>
            <span className="ml-auto text-xs text-gray-500">
              ({estadisticas.totalEstilos} estilos)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={opciones.configuraciones}
              onChange={() => handleOpcionChange('configuraciones')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <MdSettings className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">
                Limpiar configuraciones
              </span>
            </div>
            <span className="ml-auto text-xs text-gray-500">
              ({estadisticas.totalConfiguraciones} configs)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={opciones.seleccion}
              onChange={() => handleOpcionChange('seleccion')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
              <span className="text-sm font-medium text-gray-900">
                Limpiar selección actual
              </span>
            </div>
                     </label>
           </div>
         )}

        {/* Campo de confirmación */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">
            Para confirmar, escribe <strong>&quot;LIMPIAR&quot;</strong> en el campo de abajo:
          </p>
          <input
            type="text"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            placeholder="Escribe LIMPIAR para confirmar"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={procesoLimpieza}
          />
        </div>
      </DialogContent>

      <DialogActions className="p-6 pt-0">
        <button
          onClick={onClose}
          disabled={procesoLimpieza}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={ejecutarLimpieza}
          disabled={!puedeEjecutar || procesoLimpieza}
          className={`px-6 py-2 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2 ${
            limpiarTodo ? "bg-red-600" : "bg-red-500"
          }`}
        >
          {procesoLimpieza ? (
            <>
              <MdRefresh className="w-4 h-4 animate-spin" />
              {limpiarTodo ? "Limpiando Todo..." : "Limpiando..."}
            </>
          ) : (
            <>
              <MdDeleteSweep className="w-4 h-4" />
              {limpiarTodo ? "Limpiar Todo Completamente" : "Ejecutar Limpieza Selectiva"}
            </>
          )}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default LimpiarModal; 