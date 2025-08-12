import { useMemo } from "react";
import { useCuestionario, QuestionThemeConfig, ElementStyleConfig } from "../context/CuestionarioContext";

export const useThemeConfig = () => {
  const { globalThemeConfig, updateGlobalThemeConfig } = useCuestionario();

  // Configuración por defecto memoizada
  const defaultThemeConfig = useMemo((): QuestionThemeConfig => {
    const createDefaultElementConfig = (): ElementStyleConfig => ({
      typography: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "400",
        color: "#374151",
        textAlign: "left",
        textDecoration: "none",
        lineHeight: "1.4",
        letterSpacing: "0px",
        textTransform: "none",
        fontStyle: "normal"
      },
      background: {
        backgroundColor: "transparent",
        backgroundImage: "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        gradient: ""
      },
      border: {
        borderWidth: "0px",
        borderStyle: "none",
        borderColor: "transparent",
        borderRadius: "0px",
        borderTopWidth: "0px",
        borderRightWidth: "0px",
        borderBottomWidth: "0px",
        borderLeftWidth: "0px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
      },
      layout: {
        display: "block",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "0px",
        margin: "0px",
        padding: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        marginTop: "0px",
        marginBottom: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingTop: "0px",
        paddingBottom: "0px"
      },
      size: {
        width: "auto",
        height: "auto",
        minWidth: "0px",
        maxWidth: "none",
        minHeight: "0px",
        maxHeight: "none",
        overflow: "visible"
      },
      position: {
        position: "static",
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto",
        zIndex: "1"
      },
      effects: {
        opacity: "1",
        boxShadow: "none",
        transform: "none",
        filter: "none",
        transition: "none",
        cursor: "auto",
        zIndex: "1"
      },
      customProperties: []
    });

    return {
      label: {
        ...createDefaultElementConfig(),
        typography: {
          ...createDefaultElementConfig().typography,
          fontSize: "14px",
          fontWeight: "500",
          color: "#374151"
        },
        layout: {
          ...createDefaultElementConfig().layout,
          padding: "4px 0px",
          marginBottom: "8px"
        }
      },
      paragraph: {
        ...createDefaultElementConfig(),
        typography: {
          ...createDefaultElementConfig().typography,
          fontSize: "14px",
          fontWeight: "400",
          color: "#6B7280"
        },
        layout: {
          ...createDefaultElementConfig().layout,
          padding: "4px 0px",
          marginBottom: "12px"
        }
      },
      options: {
        ...createDefaultElementConfig(),
        typography: {
          ...createDefaultElementConfig().typography,
          fontSize: "14px",
          fontWeight: "400",
          color: "#374151"
        },
        background: {
          ...createDefaultElementConfig().background,
          backgroundColor: "#FFFFFF"
        },
        border: {
          ...createDefaultElementConfig().border,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#D1D5DB",
          borderRadius: "6px"
        },
        layout: {
          ...createDefaultElementConfig().layout,
          padding: "8px 12px",
          margin: "4px 0px"
        }
      },
      button: {
        ...createDefaultElementConfig(),
        typography: {
          ...createDefaultElementConfig().typography,
          fontSize: "14px",
          fontWeight: "500",
          color: "#FFFFFF"
        },
        background: {
          ...createDefaultElementConfig().background,
          backgroundColor: "#3B82F6"
        },
        border: {
          ...createDefaultElementConfig().border,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#3B82F6",
          borderRadius: "6px"
        },
        layout: {
          ...createDefaultElementConfig().layout,
          padding: "10px 16px",
          margin: "8px 0px"
        },
        effects: {
          ...createDefaultElementConfig().effects,
          cursor: "pointer"
        }
      },
      container: {
        ...createDefaultElementConfig(),
        typography: {
          ...createDefaultElementConfig().typography,
          fontSize: "14px",
          fontWeight: "400",
          color: "#374151"
        },
        background: {
          ...createDefaultElementConfig().background,
          backgroundColor: "#F9FAFB"
        },
        border: {
          ...createDefaultElementConfig().border,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#E5E7EB",
          borderRadius: "8px"
        },
        layout: {
          ...createDefaultElementConfig().layout,
          padding: "16px"
        }
      }
    };
  }, []);

  // Configuración actual reactiva - usa globalThemeConfig si existe, sino usa default
  const themeConfig = useMemo((): QuestionThemeConfig => {
    return globalThemeConfig || defaultThemeConfig;
  }, [globalThemeConfig, defaultThemeConfig]);

  // Handlers para cada tipo de configuración
  const handleTypographyChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        typography: {
          ...themeConfig[element].typography,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleBackgroundChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        background: {
          ...themeConfig[element].background,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleBorderChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        border: {
          ...themeConfig[element].border,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleMultipleBorderChanges = (element: keyof QuestionThemeConfig, updates: Record<string, string>) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        border: {
          ...themeConfig[element].border,
          ...updates
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleLayoutChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        layout: {
          ...themeConfig[element].layout,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleLayoutChangeMultiple = (element: keyof QuestionThemeConfig, updates: Record<string, string>) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        layout: {
          ...themeConfig[element].layout,
          ...updates
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleSizeChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        size: {
          ...themeConfig[element].size,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleSizeChangeMultiple = (element: keyof QuestionThemeConfig, updates: Record<string, string>) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        size: {
          ...themeConfig[element].size,
          ...updates
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handlePositionChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        position: {
          ...themeConfig[element].position,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleEffectsChange = (element: keyof QuestionThemeConfig, property: string, value: string) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        effects: {
          ...themeConfig[element].effects,
          [property]: value
        }
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };

  const handleCustomPropertyChange = (element: keyof QuestionThemeConfig, properties: Array<{property: string, value: string}>) => {
    const newThemeConfig = {
      ...themeConfig,
      [element]: {
        ...themeConfig[element],
        customProperties: properties
      }
    };
    updateGlobalThemeConfig(newThemeConfig);
  };



  const applyTheme = () => {
    console.log("Aplicando tema completo:", themeConfig);
    updateGlobalThemeConfig(themeConfig);
  };

  const resetTheme = () => {
    updateGlobalThemeConfig(defaultThemeConfig);
  };

  return {
    themeConfig,
    handleTypographyChange,
    handleBackgroundChange,
    handleBorderChange,
    handleMultipleBorderChanges,
    handleLayoutChange,
    handleLayoutChangeMultiple,
    handleSizeChange,
    handleSizeChangeMultiple,
    handlePositionChange,
    handleEffectsChange,
    handleCustomPropertyChange,
    applyTheme,
    resetTheme
  };
}; 