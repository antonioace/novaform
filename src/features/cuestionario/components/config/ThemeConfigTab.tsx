import React, { useState } from "react";
import { useThemeConfig } from "../../hooks/useThemeConfig";

// Importar iconos de React Icons
import { 
  MdLabel,
  MdTextFields, 
  MdInput,
  MdSmartButton,
  MdViewModule
} from "react-icons/md";

// Importar todos los componentes de tools
import TypographySection from "../../../builder/components/tools/TypographySection";
import BackgroundSection from "../../../builder/components/tools/BackgroundSection";
import BorderSection from "../../../builder/components/tools/BorderSection";
import LayoutSection from "../../../builder/components/tools/LayoutSection";
import SizeSection from "../../../builder/components/tools/SizeSection";
import PositionSection from "../../../builder/components/tools/PositionSection";
import EffectsSection from "../../../builder/components/tools/EffectsSection";
import CustomPropertiesSection from "../../../builder/components/tools/CustomPropertiesSection";

type ThemeElement = "label" | "paragraph" | "options" | "button" | "container";

const ThemeConfigTab = () => {
  const [activeElement, setActiveElement] = useState<ThemeElement>("label");
  const {
    themeConfig,
    handleTypographyChange,
    handleBackgroundChange,
    handleBorderChange,
    handleMultipleBorderChanges,
    handleLayoutChange,
    handleLayoutChangeMultiple,
    handleSizeChange,
    handlePositionChange,
    handleEffectsChange,
    handleCustomPropertyChange,
    resetTheme,
  } = useThemeConfig();

  const renderElementStyleTools = (element: ThemeElement) => {
    const config = themeConfig[element];

    return (
      <div className="space-y-0">
        {/* Typography Section */}
        <TypographySection
          typographyConfig={config.typography}
          onTypographyChange={(property, value) =>
            handleTypographyChange(element, property, value)
          }
        />

        {/* Background Section */}
        <BackgroundSection
          backgroundConfig={config.background}
          onBackgroundChange={(property, value) =>
            handleBackgroundChange(element, property, value)
          }
        />

        {/* Border Section */}
        <BorderSection
          borderConfig={config.border}
          onBorderChange={(property, value) =>
            handleBorderChange(element, property, value)
          }
          onMultipleBorderChanges={(updates) =>
            handleMultipleBorderChanges(element, updates)
          }
        />

        {/* Layout Section */}
        <LayoutSection
          layoutConfig={config.layout}
          onLayoutChange={(property, value) =>
            handleLayoutChange(element, property, value)
          }
          onLayoutChangeMultiple={(updates) =>
            handleLayoutChangeMultiple(element, updates)
          }
    
        />

        {/* Size Section */}
        <SizeSection
          sizeConfig={config.size}
          onSizeChange={(property, value) =>
            handleSizeChange(element, property, value)
          }
         
        />

        {/* Position Section */}
        <PositionSection
          positionConfig={config.position}
          onPositionChange={(property, value) =>
            handlePositionChange(element, property, value)
          }
        />

        {/* Effects Section */}
        <EffectsSection
          effectsConfig={config.effects}
          onEffectsChange={(property, value) =>
            handleEffectsChange(element, property, value)
          }
        />

        {/* Custom Properties Section */}
        <CustomPropertiesSection
          customProperties={config.customProperties}
          onCustomPropertyChange={(properties) =>
            handleCustomPropertyChange(element, properties)
          }
        />
      </div>
    );
  };

  // Definir las opciones de elementos con sus iconos y nombres
  const elementOptions = [
    { key: "label" as ThemeElement, icon: MdLabel, name: "Labels" },
    { key: "paragraph" as ThemeElement, icon: MdTextFields, name: "Párrafos" },
    { key: "options" as ThemeElement, icon: MdInput, name: "Inputs" },
    { key: "button" as ThemeElement, icon: MdSmartButton, name: "Botones" },
    { key: "container" as ThemeElement, icon: MdViewModule, name: "Contenedor" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header con título y botón reset */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900">Tema</h4>
        <button
          onClick={resetTheme}
          className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Restablecer
        </button>
      </div>

      {/* Tabs de elementos */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto custom-scrollbar">
          {elementOptions.map((element) => (
            <button
              key={element.key}
              onClick={() => setActiveElement(element.key)}
              className={`flex-shrink-0 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeElement === element.key
                  ? "border-blue-500 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <element.icon className="w-4 h-4 mr-1" />
              {element.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de configuración del elemento seleccionado */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {renderElementStyleTools(activeElement)}
      </div>
    </div>
  );
};

export default ThemeConfigTab;
