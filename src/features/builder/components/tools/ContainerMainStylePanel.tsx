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

const ContainerMainStylePanel: React.FC = () => {
  const { 
    containerMainStyles, 
    setContainerMainStyles, 
    dispositivoActual 
  } = useBuilder();

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Obtener estilos actuales del contenedor principal
  const currentStyles = containerMainStyles[dispositivoActual] || {};

  // Estados locales para cada sección (igual que StylePanel)
  const [layoutConfig, setLayoutConfig] = useState({
    display: String(currentStyles.display || "flex"),
    flexDirection: String(currentStyles.flexDirection || "column"),
    alignItems: String(currentStyles.alignItems || "stretch"),
    justifyContent: String(currentStyles.justifyContent || "flex-start"),
    gap: String(currentStyles.gap || "16px"),
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
    backgroundColor: String(currentStyles.backgroundColor || "transparent"),
    backgroundImage: String(currentStyles.backgroundImage || "none"),
    backgroundSize: String(currentStyles.backgroundSize || "cover"),
    backgroundRepeat: String(currentStyles.backgroundRepeat || "no-repeat"),
    backgroundPosition: String(currentStyles.backgroundPosition || "center"),
    backgroundAttachment: String(currentStyles.backgroundAttachment || "scroll"),
    gradient: String((currentStyles as Record<string, unknown>).gradient || ""),
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
    borderBottomLeftRadius: String(currentStyles.borderBottomLeftRadius || "0px"),
    borderBottomRightRadius: String(currentStyles.borderBottomRightRadius || "0px"),
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

  // Filtrar propiedades personalizadas
  const standardProperties = [
    "display", "flexDirection", "alignItems", "justifyContent", "gap", "margin", "padding",
    "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight", "overflow",
    "position", "top", "right", "bottom", "left", "zIndex",
    "fontFamily", "fontSize", "fontWeight", "color", "textAlign", "textDecoration", 
    "lineHeight", "letterSpacing", "textTransform", "fontStyle",
    "backgroundColor", "backgroundImage", "backgroundSize", "backgroundRepeat", 
    "backgroundPosition", "backgroundAttachment", "gradient",
    "borderWidth", "borderStyle", "borderColor", "borderRadius",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
    "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
    "opacity", "transform", "filter", "transition", "cursor"
  ];

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

  // Efecto para sincronizar cuando cambia el dispositivo
  useEffect(() => {
    const newCurrentStyles = containerMainStyles[dispositivoActual] || {};
    
    setLayoutConfig({
      display: String(newCurrentStyles.display || "flex"),
      flexDirection: String(newCurrentStyles.flexDirection || "column"),
      alignItems: String(newCurrentStyles.alignItems || "stretch"),
      justifyContent: String(newCurrentStyles.justifyContent || "flex-start"),
      gap: String(newCurrentStyles.gap || "16px"),
      margin: String(newCurrentStyles.margin || "0px"),
      padding: String(newCurrentStyles.padding || "0px"),
      marginTop: String(newCurrentStyles.marginTop || "0px"),
      marginRight: String(newCurrentStyles.marginRight || "0px"),
      marginBottom: String(newCurrentStyles.marginBottom || "0px"),
      marginLeft: String(newCurrentStyles.marginLeft || "0px"),
      paddingTop: String(newCurrentStyles.paddingTop || "0px"),
      paddingRight: String(newCurrentStyles.paddingRight || "0px"),
      paddingBottom: String(newCurrentStyles.paddingBottom || "0px"),
    });

    setSizeConfig({
      width: String(newCurrentStyles.width || "100%"),
      height: String(newCurrentStyles.height || "auto"),
      minWidth: String(newCurrentStyles.minWidth || "0px"),
      maxWidth: String(newCurrentStyles.maxWidth || "none"),
      minHeight: String(newCurrentStyles.minHeight || "0px"),
      maxHeight: String(newCurrentStyles.maxHeight || "none"),
      overflow: String(newCurrentStyles.overflow || "visible"),
    });

    setPositionConfig({
      position: String(newCurrentStyles.position || "static"),
      top: String(newCurrentStyles.top || "auto"),
      right: String(newCurrentStyles.right || "auto"),
      bottom: String(newCurrentStyles.bottom || "auto"),
      left: String(newCurrentStyles.left || "auto"),
      zIndex: String(newCurrentStyles.zIndex || "1"),
    });

    setTypographyConfig({
      fontFamily: String(newCurrentStyles.fontFamily || "Arial, sans-serif"),
      fontSize: String(newCurrentStyles.fontSize || "16px"),
      fontWeight: String(newCurrentStyles.fontWeight || "400"),
      color: String(newCurrentStyles.color || "#000000"),
      textAlign: String(newCurrentStyles.textAlign || "left"),
      textDecoration: String(newCurrentStyles.textDecoration || "none"),
      lineHeight: String(newCurrentStyles.lineHeight || "1.4"),
      letterSpacing: String(newCurrentStyles.letterSpacing || "0px"),
      textTransform: String(newCurrentStyles.textTransform || "none"),
      fontStyle: String(newCurrentStyles.fontStyle || "normal"),
    });

    setBackgroundConfig({
      backgroundColor: String(newCurrentStyles.backgroundColor || "transparent"),
      backgroundImage: String(newCurrentStyles.backgroundImage || "none"),
      backgroundSize: String(newCurrentStyles.backgroundSize || "cover"),
      backgroundRepeat: String(newCurrentStyles.backgroundRepeat || "no-repeat"),
      backgroundPosition: String(newCurrentStyles.backgroundPosition || "center"),
      backgroundAttachment: String(newCurrentStyles.backgroundAttachment || "scroll"),
      gradient: String((newCurrentStyles as Record<string, unknown>).gradient || ""),
    });

    setBorderConfig({
      borderWidth: String(newCurrentStyles.borderWidth || "0px"),
      borderStyle: String(newCurrentStyles.borderStyle || "none"),
      borderColor: String(newCurrentStyles.borderColor || "#000000"),
      borderRadius: String(newCurrentStyles.borderRadius || "0px"),
      borderTopWidth: String(newCurrentStyles.borderTopWidth || "0px"),
      borderRightWidth: String(newCurrentStyles.borderRightWidth || "0px"),
      borderBottomWidth: String(newCurrentStyles.borderBottomWidth || "0px"),
      borderLeftWidth: String(newCurrentStyles.borderLeftWidth || "0px"),
      borderTopLeftRadius: String(newCurrentStyles.borderTopLeftRadius || "0px"),
      borderTopRightRadius: String(newCurrentStyles.borderTopRightRadius || "0px"),
      borderBottomLeftRadius: String(newCurrentStyles.borderBottomLeftRadius || "0px"),
      borderBottomRightRadius: String(newCurrentStyles.borderBottomRightRadius || "0px"),
    });

    setEffectsConfig({
      opacity: String(newCurrentStyles.opacity || "1"),
      boxShadow: String(newCurrentStyles.boxShadow || "none"),
      transform: String(newCurrentStyles.transform || "none"),
      filter: String(newCurrentStyles.filter || "none"),
      transition: String(newCurrentStyles.transition || "none"),
      cursor: String(newCurrentStyles.cursor || "auto"),
      zIndex: String(newCurrentStyles.zIndex || "0"),
    });

    setCustomProperties(getCustomPropertiesFromStyles());
  }, [dispositivoActual, containerMainStyles]);

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

  // Función para actualizar los estilos del contenedor principal
  const handleStyleUpdate = (property: string, value: string) => {
    const updatedStyles = {
      ...containerMainStyles,
      [dispositivoActual]: {
        ...containerMainStyles[dispositivoActual],
        [property]: value,
      },
    };
    setContainerMainStyles(updatedStyles);
  };

  // Handlers para cada sección
  const handleLayoutChange = (property: string, value: string) => {
    setLayoutConfig(prev => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handleSizeChange = (property: string, value: string) => {
    setSizeConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

  const handlePositionChange = (property: string, value: string) => {
    setPositionConfig((prev) => ({ ...prev, [property]: value }));
    handleStyleUpdate(property, value);
  };

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

  const handleMultipleBorderChanges = (updates: Record<string, string>) => {
    setBorderConfig((prev) => ({ ...prev, ...updates }));

    // Aplicar todas las actualizaciones al contexto de una vez
    const updatedStyles = {
      ...containerMainStyles,
      [dispositivoActual]: {
        ...containerMainStyles[dispositivoActual],
        ...updates,
      },
    };
    setContainerMainStyles(updatedStyles);
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
    const updatedStyles = {
      ...containerMainStyles,
      [dispositivoActual]: newStyles,
    };
    setContainerMainStyles(updatedStyles);

    setCustomProperties(properties);
  };

  // Funciones para copiar estilos entre dispositivos
  const copyDesktopToTablet = () => {
    const desktopStyles = containerMainStyles.DESKTOP || {};
    const updatedStyles = {
      ...containerMainStyles,
      TABLET: { ...desktopStyles },
    };
    setContainerMainStyles(updatedStyles);
  };

  const copyDesktopToMobile = () => {
    const desktopStyles = containerMainStyles.DESKTOP || {};
    const updatedStyles = {
      ...containerMainStyles,
      MOBILE: { ...desktopStyles },
    };
    setContainerMainStyles(updatedStyles);
  };

  const copyTabletToMobile = () => {
    const tabletStyles = containerMainStyles.TABLET || {};
    const updatedStyles = {
      ...containerMainStyles,
      MOBILE: { ...tabletStyles },
    };
    setContainerMainStyles(updatedStyles);
  };

  // Funciones para comparar estilos entre dispositivos
  const areStylesEqual = (styles1: React.CSSProperties, styles2: React.CSSProperties) => {
    return JSON.stringify(styles1) === JSON.stringify(styles2);
  };

  const isDesktopEqualToTablet = () => {
    const desktopStyles = containerMainStyles.DESKTOP || {};
    const tabletStyles = containerMainStyles.TABLET || {};
    return areStylesEqual(desktopStyles, tabletStyles);
  };

  const isDesktopEqualToMobile = () => {
    const desktopStyles = containerMainStyles.DESKTOP || {};
    const mobileStyles = containerMainStyles.MOBILE || {};
    return areStylesEqual(desktopStyles, mobileStyles);
  };

  const isTabletEqualToMobile = () => {
    const tabletStyles = containerMainStyles.TABLET || {};
    const mobileStyles = containerMainStyles.MOBILE || {};
    return areStylesEqual(tabletStyles, mobileStyles);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <h3 className="font-semibold text-gray-800">Contenedor Principal</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Estilos para el contenedor que contiene todos los bloques
        </p>
        
        {/* Indicador de dispositivo */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-blue-700">
            Editando para:
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {dispositivoActual}
          </span>
        </div>

        {/* Botones para copiar estilos entre dispositivos */}
        <div className="mt-3 space-y-2">
          <p className="text-xs font-medium text-gray-600">Copiar estilos:</p>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={copyDesktopToTablet}
              disabled={isDesktopEqualToTablet()}
              className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                isDesktopEqualToTablet()
                  ? "bg-green-50 border-green-200 text-green-700 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              title={isDesktopEqualToTablet() ? "Los estilos ya son iguales" : "Copiar estilos de Desktop a Tablet"}
            >
              {isDesktopEqualToTablet() ? (
                <>
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Desktop = Tablet
                </>
              ) : (
                "Desktop → Tablet"
              )}
            </button>
            
            <button
              onClick={copyDesktopToMobile}
              disabled={isDesktopEqualToMobile()}
              className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                isDesktopEqualToMobile()
                  ? "bg-green-50 border-green-200 text-green-700 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              title={isDesktopEqualToMobile() ? "Los estilos ya son iguales" : "Copiar estilos de Desktop a Mobile"}
            >
              {isDesktopEqualToMobile() ? (
                <>
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Desktop = Mobile
                </>
              ) : (
                "Desktop → Mobile"
              )}
            </button>
            
            <button
              onClick={copyTabletToMobile}
              disabled={isTabletEqualToMobile()}
              className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                isTabletEqualToMobile()
                  ? "bg-green-50 border-green-200 text-green-700 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              title={isTabletEqualToMobile() ? "Los estilos ya son iguales" : "Copiar estilos de Tablet a Mobile"}
            >
              {isTabletEqualToMobile() ? (
                <>
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tablet = Mobile
                </>
              ) : (
                "Tablet → Mobile"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Buscador de herramientas */}
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

      {/* Contenido de las secciones */}
      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredSections.map((section) => {
            switch (section.component) {
              case "LayoutSection":
                return (
                  <LayoutSection
                    key="layout"
                    layoutConfig={layoutConfig}
                    onLayoutChange={handleLayoutChange}
                  />
                );
              case "SizeSection":
                return (
                  <SizeSection
                    key="size"
                    sizeConfig={sizeConfig}
                    onSizeChange={handleSizeChange}
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
      </div>
    </div>
  );
};

export default ContainerMainStylePanel; 