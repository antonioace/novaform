import React, { useState, useEffect } from "react";
import { useBuilder } from "../../context/BuilderContext";
import LayoutSection from "./LayoutSection";
import SizeSection from "./SizeSection";
import PositionSection from "./PositionSection";
import CustomPropertiesSection from "./CustomPropertiesSection";
import TypographySection from "./TypographySection";
import BackgroundSection from "./BackgroundSection";
import BorderSection from "./BorderSection";
import EffectsSection from "./EffectsSection";
import ConfigContainer from "../config/ConfigContainer";

interface StylePanelProps {
  blockId: string;
}

const StylePanel: React.FC<StylePanelProps> = ({ blockId }) => {
  const { updateBlockStyles, stylesList, dispositivoActual, bloqueActual } =
    useBuilder();
  const [activeTab, setActiveTab] = useState<
    "style" | "settings" | "interactions"
  >("style");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Obtener estilos actuales del bloque
  const blockStyles = stylesList.find((style) => style.blockId === blockId);
  const currentStyles = blockStyles?.styles[dispositivoActual] || {};

  // Estados locales para cada sección
  const [layoutConfig, setLayoutConfig] = useState({
    display: currentStyles.display || "block",
    flexDirection: currentStyles.flexDirection || "row",
    alignItems: currentStyles.alignItems || "flex-start",
    justifyContent: currentStyles.justifyContent || "flex-start",
    gap: currentStyles.gap || "0px",
    margin: String(currentStyles.margin || "0px"),
    padding: String(currentStyles.padding || "0px"),
    marginTop: String(currentStyles.marginTop || "0px"),
    marginRight: String(currentStyles.marginRight || "0px"),
    marginBottom: String(currentStyles.marginBottom || "0px"),
    marginLeft: String(currentStyles.marginLeft || "0px"),
    paddingTop: String(currentStyles.paddingTop || "0px"),
    paddingRight: String(currentStyles.paddingRight || "0px"),
    paddingBottom: String(currentStyles.paddingBottom || "0px"),
  });

  const [sizeConfig, setSizeConfig] = useState({
    width: String(currentStyles.width || "100%"),
    height: String(currentStyles.height || "auto"),
    minWidth: String(currentStyles.minWidth || "0px"),
    maxWidth: String(currentStyles.maxWidth || "none"),
    minHeight: String(currentStyles.minHeight || "0px"),
    maxHeight: String(currentStyles.maxHeight || "none"),
    overflow: String(currentStyles.overflow || "visible"),
  });

  const [positionConfig, setPositionConfig] = useState({
    position: String(currentStyles.position || "static"),
    top: String(currentStyles.top || "auto"),
    right: String(currentStyles.right || "auto"),
    bottom: String(currentStyles.bottom || "auto"),
    left: String(currentStyles.left || "auto"),
    zIndex: String(currentStyles.zIndex || "1"),
  });

  // Nuevos estados para las secciones agregadas
  const [typographyConfig, setTypographyConfig] = useState({
    fontFamily: String(currentStyles.fontFamily || "Arial, sans-serif"),
    fontSize: String(currentStyles.fontSize || "16px"),
    fontWeight: String(currentStyles.fontWeight || "400"),
    color: String(currentStyles.color || "#000000"),
    textAlign: String(currentStyles.textAlign || "left"),
    textDecoration: String(currentStyles.textDecoration || "none"),
    lineHeight: String(currentStyles.lineHeight || "1.4"),
    letterSpacing: String(currentStyles.letterSpacing || "0px"),
    textTransform: String(currentStyles.textTransform || "none"),
    fontStyle: String(currentStyles.fontStyle || "normal"),
  });

  const [backgroundConfig, setBackgroundConfig] = useState({
    backgroundColor: String(currentStyles.backgroundColor || "#ffffff"),
    backgroundImage: String(currentStyles.backgroundImage || "none"),
    backgroundSize: String(currentStyles.backgroundSize || "cover"),
    backgroundRepeat: String(currentStyles.backgroundRepeat || "no-repeat"),
    backgroundPosition: String(currentStyles.backgroundPosition || "center"),
    backgroundAttachment: String(
      currentStyles.backgroundAttachment || "scroll"
    ),
    gradient: String(currentStyles.gradient || ""),
  });

  const [borderConfig, setBorderConfig] = useState({
    borderWidth: String(currentStyles.borderWidth || "0px"),
    borderStyle: String(currentStyles.borderStyle || "none"),
    borderColor: String(currentStyles.borderColor || "#000000"),
    borderRadius: String(currentStyles.borderRadius || "0px"),
    borderTopWidth: String(currentStyles.borderTopWidth || "0px"),
    borderRightWidth: String(currentStyles.borderRightWidth || "0px"),
    borderBottomWidth: String(currentStyles.borderBottomWidth || "0px"),
    borderLeftWidth: String(currentStyles.borderLeftWidth || "0px"),
    borderTopLeftRadius: String(currentStyles.borderTopLeftRadius || "0px"),
    borderTopRightRadius: String(currentStyles.borderTopRightRadius || "0px"),
    borderBottomLeftRadius: String(
      currentStyles.borderBottomLeftRadius || "0px"
    ),
    borderBottomRightRadius: String(
      currentStyles.borderBottomRightRadius || "0px"
    ),
  });

  const [effectsConfig, setEffectsConfig] = useState({
    opacity: String(currentStyles.opacity || "1"),
    boxShadow: String(currentStyles.boxShadow || "none"),
    transform: String(currentStyles.transform || "none"),
    filter: String(currentStyles.filter || "none"),
    transition: String(currentStyles.transition || "none"),
    cursor: String(currentStyles.cursor || "auto"),
    zIndex: String(currentStyles.zIndex || "0"),
  });

  // Filtrar propiedades personalizadas de las propiedades estándar
  const standardProperties = [
    "display",
    "flexDirection",
    "alignItems",
    "justifyContent",
    "gap",
    "margin",
    "padding",
    "width",
    "height",
    "minWidth",
    "maxWidth",
    "minHeight",
    "maxHeight",
    "overflow",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "zIndex",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "color",
    "textAlign",
    "textDecoration",
    "lineHeight",
    "letterSpacing",
    "textTransform",
    "fontStyle",
    "backgroundColor",
    "backgroundImage",
    "backgroundSize",
    "backgroundRepeat",
    "backgroundPosition",
    "backgroundAttachment",
    "gradient",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "opacity",
    "transform",
    "filter",
    "transition",
    "cursor",
  ];

  // Obtener propiedades personalizadas de los estilos actuales
  const getCustomPropertiesFromStyles = () => {
    const customProps: Array<{ property: string; value: string }> = [];
    Object.entries(currentStyles).forEach(([key, value]) => {
      if (!standardProperties.includes(key) && value) {
        customProps.push({ property: key, value: String(value) });
      }
    });
    return customProps;
  };

  const [customProperties, setCustomProperties] = useState<
    Array<{ property: string; value: string }>
  >(getCustomPropertiesFromStyles());

  // Efecto para sincronizar estados cuando cambia el bloque seleccionado
  useEffect(() => {
    // Actualizar todos los estados con los nuevos estilos
    setLayoutConfig({
      display: currentStyles.display || "block",
      flexDirection: currentStyles.flexDirection || "row",
      alignItems: currentStyles.alignItems || "flex-start",
      justifyContent: currentStyles.justifyContent || "flex-start",
      gap: currentStyles.gap || "0px",
      margin: String(currentStyles?.margin || "0px"),
      padding: String(currentStyles?.padding || "0px"),
      marginTop: String(currentStyles?.marginTop || "0px"),
      marginRight: String(currentStyles?.marginRight || "0px"),
      marginBottom: String(currentStyles?.marginBottom || "0px"),
      marginLeft: String(currentStyles?.marginLeft || "0px"),
      paddingTop: String(currentStyles?.paddingTop || "0px"),
      paddingRight: String(currentStyles?.paddingRight || "0px"),
      paddingBottom: String(currentStyles?.paddingBottom || "0px"),
    });

    setSizeConfig({
      width: String(currentStyles.width || "100%"),
      height: String(currentStyles.height || "auto"),
      minWidth: String(currentStyles.minWidth || "0px"),
      maxWidth: String(currentStyles.maxWidth || "none"),
      minHeight: String(currentStyles.minHeight || "0px"),
      maxHeight: String(currentStyles.maxHeight || "none"),
      overflow: String(currentStyles.overflow || "visible"),
    });

    setPositionConfig({
      position: String(currentStyles.position || "static"),
      top: String(currentStyles.top || "auto"),
      right: String(currentStyles.right || "auto"),
      bottom: String(currentStyles.bottom || "auto"),
      left: String(currentStyles.left || "auto"),
      zIndex: String(currentStyles.zIndex || "1"),
    });

    setTypographyConfig({
      fontFamily: String(currentStyles.fontFamily || "Arial, sans-serif"),
      fontSize: String(currentStyles.fontSize || "16px"),
      fontWeight: String(currentStyles.fontWeight || "400"),
      color: String(currentStyles.color || "#000000"),
      textAlign: String(currentStyles.textAlign || "left"),
      textDecoration: String(currentStyles.textDecoration || "none"),
      lineHeight: String(currentStyles.lineHeight || "1.4"),
      letterSpacing: String(currentStyles.letterSpacing || "0px"),
      textTransform: String(currentStyles.textTransform || "none"),
      fontStyle: String(currentStyles.fontStyle || "normal"),
    });

    setBackgroundConfig({
      backgroundColor: String(currentStyles.backgroundColor || "#ffffff"),
      backgroundImage: String(currentStyles.backgroundImage || "none"),
      backgroundSize: String(currentStyles.backgroundSize || "cover"),
      backgroundRepeat: String(currentStyles.backgroundRepeat || "no-repeat"),
      backgroundPosition: String(currentStyles.backgroundPosition || "center"),
      backgroundAttachment: String(
        currentStyles.backgroundAttachment || "scroll"
      ),
      gradient: String(currentStyles.gradient || ""),
    });

    setBorderConfig({
      borderWidth: String(currentStyles.borderWidth || "0px"),
      borderStyle: String(currentStyles.borderStyle || "none"),
      borderColor: String(currentStyles.borderColor || "#000000"),
      borderRadius: String(currentStyles.borderRadius || "0px"),
      borderTopWidth: String(currentStyles.borderTopWidth || "0px"),
      borderRightWidth: String(currentStyles.borderRightWidth || "0px"),
      borderBottomWidth: String(currentStyles.borderBottomWidth || "0px"),
      borderLeftWidth: String(currentStyles.borderLeftWidth || "0px"),
      borderTopLeftRadius: String(currentStyles.borderTopLeftRadius || "0px"),
      borderTopRightRadius: String(currentStyles.borderTopRightRadius || "0px"),
      borderBottomLeftRadius: String(
        currentStyles.borderBottomLeftRadius || "0px"
      ),
      borderBottomRightRadius: String(
        currentStyles.borderBottomRightRadius || "0px"
      ),
    });

    setEffectsConfig({
      opacity: String(currentStyles.opacity || "1"),
      boxShadow: String(currentStyles.boxShadow || "none"),
      transform: String(currentStyles.transform || "none"),
      filter: String(currentStyles.filter || "none"),
      transition: String(currentStyles.transition || "none"),
      cursor: String(currentStyles.cursor || "auto"),
      zIndex: String(currentStyles.zIndex || "0"),
    });

    // Actualizar propiedades personalizadas
    setCustomProperties(getCustomPropertiesFromStyles());
  }, [blockId]); // Dependencias: blockId y currentStyles

  const tabs = [
    { id: "style", label: "Estilos" },
    { id: "settings", label: "Configuración" },
  ];

  // Definir las secciones con sus nombres para la búsqueda
  const styleSections = [
    {
      component: "LayoutSection",
      label: "Diseño",
      keywords: ["layout", "diseño", "flex", "display"],
    },
    {
      component: "SizeSection",
      label: "Tamaño",
      keywords: ["size", "tamaño", "width", "height", "ancho", "alto"],
    },
    {
      component: "PositionSection",
      label: "Posición",
      keywords: ["position", "posición", "top", "left", "absolute"],
    },
    {
      component: "TypographySection",
      label: "Tipografía",
      keywords: ["typography", "tipografía", "font", "texto", "fuente"],
    },
    {
      component: "BackgroundSection",
      label: "Fondo",
      keywords: ["background", "fondo", "color", "imagen"],
    },
    {
      component: "BorderSection",
      label: "Bordes",
      keywords: ["border", "bordes", "borde", "radius"],
    },
    {
      component: "EffectsSection",
      label: "Efectos",
      keywords: ["effects", "efectos", "shadow", "sombra", "opacity"],
    },
    {
      component: "CustomPropertiesSection",
      label: "Propiedades personalizadas",
      keywords: ["custom", "personalizada", "css", "properties"],
    },
  ];

  // Filtrar secciones basado en el término de búsqueda
  const filteredSections = styleSections.filter((section) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      section.label.toLowerCase().includes(searchLower) ||
      section.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchLower)
      )
    );
  });

  // Función para actualizar estilos en el contexto
  const handleStyleUpdate = (property: string, value: string) => {
    const newStyles = {
      ...currentStyles,
      [property]: value,
    };

    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });
  };

  // Handlers para cada sección
  const handleLayoutChange = (property: string, value: string) => {
    setLayoutConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleLayoutChangeMultiple = (updates: Record<string, string>) => {
    setLayoutConfig((prev) => ({ ...prev, ...updates }));

    // Aplicar todas las actualizaciones al contexto de una vez
    const currentStyles = blockStyles?.styles[dispositivoActual] || {};
    const newStyles = {
      ...currentStyles,
      ...updates,
    };

    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });
  };

  const handleSizeChange = (property: string, value: string) => {
    setSizeConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleSizeChangeMultiple = (updates: Record<string, string>) => {
    setSizeConfig((prev) => ({ ...prev, ...updates }));

    // Aplicar todas las actualizaciones al contexto de una vez
    const currentStyles = blockStyles?.styles[dispositivoActual] || {};
    const newStyles = {
      ...currentStyles,
      ...updates,
    };

    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });
  };

  const handlePositionChange = (property: string, value: string) => {
    setPositionConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  // Nuevos handlers para las secciones agregadas
  const handleTypographyChange = (property: string, value: string) => {
    setTypographyConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleBackgroundChange = (property: string, value: string) => {
    setBackgroundConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleBorderChange = (property: string, value: string) => {
    setBorderConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  // Nueva función para manejar múltiples actualizaciones de border
  const handleMultipleBorderChanges = (updates: Record<string, string>) => {
    setBorderConfig((prev) => ({ ...prev, ...updates }));

    // Aplicar todas las actualizaciones al contexto de una vez
    const currentStyles = blockStyles?.styles[dispositivoActual] || {};
    const newStyles = {
      ...currentStyles,
      ...updates,
    };

    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });
  };

  const handleEffectsChange = (property: string, value: string) => {
    setEffectsConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleCustomPropertyChange = (
    properties: Array<{ property: string; value: string }>
  ) => {
    // Obtener propiedades que se eliminaron
    const currentPropertyNames = customProperties.map((p) => p.property);
    const newPropertyNames = properties.map((p) => p.property);
    const removedProperties = currentPropertyNames.filter(
      (prop) => !newPropertyNames.includes(prop)
    );

    // Crear nuevo objeto de estilos sin las propiedades eliminadas
    const newStyles = { ...currentStyles };
    removedProperties.forEach((prop) => {
      delete newStyles[prop];
    });

    // Aplicar las propiedades actuales
    properties.forEach((prop) => {
      if (prop.property && prop.value) {
        newStyles[prop.property] = prop.value;
      }
    });

    // Actualizar el contexto con todos los estilos
    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });

    setCustomProperties(properties);
  };

  // Función para eliminar múltiples propiedades de los estilos
  const handleRemoveStyleProperties = (propertiesToRemove: string[]) => {
    // Crear nuevo objeto de estilos sin las propiedades especificadas
    const newStyles = { ...currentStyles };

    propertiesToRemove.forEach((property) => {
      delete newStyles[property];
    });

    // Actualizar el contexto con los estilos modificados
    updateBlockStyles(blockId, {
      [dispositivoActual]: newStyles,
    });

    // Si alguna de las propiedades eliminadas era personalizada, actualizar el estado
    const updatedCustomProperties = customProperties.filter(
      (prop) => !propertiesToRemove.includes(prop.property)
    );

    if (updatedCustomProperties.length !== customProperties.length) {
      setCustomProperties(updatedCustomProperties);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Pestañas */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "style" | "settings" | "interactions")
              }
              className={`flex-1 px-4 py-3 text-sm border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? "border-black font-bold text-black bg-white"
                    : "border-transparent text-gray-500 hover:bg-gray-100"
                }`}
              style={activeTab === tab.id ? { fontWeight: "bold" } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buscador de herramientas - Solo en pestaña de estilos */}
      {activeTab === "style" && (
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar herramientas de estilo..."
              className="w-full pl-7 pr-3 py-2 text-xs rounded-md bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs text-gray-500">
              Mostrando {filteredSections.length} de {styleSections.length}{" "}
              herramientas
            </div>
          )}
        </div>
      )}

      {/* Contenido de las pestañas */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "style" && (
          <div>
            {filteredSections.map((section) => {
              switch (section.component) {
                case "LayoutSection":
                  return (
                    <LayoutSection
                      key="layout"
                      layoutConfig={layoutConfig}
                      onLayoutChange={handleLayoutChange}
                      onLayoutChangeMultiple={handleLayoutChangeMultiple}
                      onRemoveProperties={handleRemoveStyleProperties}
                    />
                  );
                case "SizeSection":
                  return (
                    <SizeSection
                      key="size"
                      sizeConfig={sizeConfig}
                      onSizeChange={handleSizeChange}
                      onSizeChangeMultiple={handleSizeChangeMultiple}
                    />
                  );
                case "PositionSection":
                  return (
                    <PositionSection
                      key="position"
                      positionConfig={positionConfig}
                      onPositionChange={handlePositionChange}
                    />
                  );
                case "TypographySection":
                  return (
                    <TypographySection
                      key="typography"
                      typographyConfig={typographyConfig}
                      onTypographyChange={handleTypographyChange}
                    />
                  );
                case "BackgroundSection":
                  return (
                    <BackgroundSection
                      key="background"
                      backgroundConfig={backgroundConfig}
                      onBackgroundChange={handleBackgroundChange}
                    />
                  );
                case "BorderSection":
                  return (
                    <BorderSection
                      key="border"
                      borderConfig={borderConfig}
                      onBorderChange={handleBorderChange}
                      onMultipleBorderChanges={handleMultipleBorderChanges}
                    />
                  );
                case "EffectsSection":
                  return (
                    <EffectsSection
                      key="effects"
                      effectsConfig={effectsConfig}
                      onEffectsChange={handleEffectsChange}
                    />
                  );
                case "CustomPropertiesSection":
                  return (
                    <CustomPropertiesSection
                      key="custom"
                      customProperties={customProperties}
                      onCustomPropertyChange={handleCustomPropertyChange}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}

        {activeTab === "settings" && (
          <ConfigContainer block={bloqueActual || null} />
        )}
      </div>
    </div>
  );
};

export default StylePanel;
