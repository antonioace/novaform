import React from "react";
import { useCuestionario } from "../context/CuestionarioContext";
import ContentPreview from "./ContentPreview";
import ContactInfoPreview from "./preview/ContactInfoPreview";
import { ContactInfoCfg } from "./modals/configTypes";

const ContentEditor = () => {
  const { getSelectedQuestion, deviceType } = useCuestionario();

  const selectedQuestion = getSelectedQuestion();

  // Configurar el ancho según el tipo de dispositivo
  const getContainerWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "max-w-sm"; // ~384px
      case "tablet":
        return "max-w-2xl"; // ~672px
      case "desktop":
      default:
        return "max-w-4xl"; // ~896px
    }
  };

  const renderPreview = () => {
    if (!selectedQuestion) return null;

    // Renderizar según el tipo de pregunta
    switch (selectedQuestion.type) {
      case "contact_info":
        const config = selectedQuestion.config as unknown as ContactInfoCfg;
        if (config && config.fields) {
          return <ContactInfoPreview config={config} deviceType={deviceType} />;
        }
        // Si no hay configuración, mostrar mensaje
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">
                Configuración pendiente
              </p>
              <p className="text-sm">
                Configura los campos para ver la vista previa
              </p>
            </div>
          </div>
        );

      default:
        return (
          <ContentPreview question={selectedQuestion} deviceType={deviceType} />
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto flex justify-center p-6">
      <div
        className={`w-full ${getContainerWidth()} bg-gray-50 min-h-full rounded-lg`}
      >
        {renderPreview()}
      </div>
    </div>
  );
};

export default ContentEditor;
