import React from "react";
import { useCuestionario } from "../context/CuestionarioContext";
import ContactInfoConfig from "./config/ContactInfoConfig";
import { CONTENT_TYPES } from "./modals";

const ContentSettings = () => {
  const { selectedQuestion, updateQuestionConfig } = useCuestionario();
  const renderConfigQuestion = () => {
    switch (selectedQuestion?.type) {
      case CONTENT_TYPES.CONTACT_INFO:
        return (
          <ContactInfoConfig
            selectedQuestion={selectedQuestion}
            onSave={(config) => {
              updateQuestionConfig(
                selectedQuestion?.id,
                config as unknown as Record<string, unknown>
              );
            }}
          />
        );
    }
  };
  return (
    <div
      className="w-64 bg-white border-l border-gray-200  flex flex-col flex-1
    max-w-64 overflow-hidden relative
    "
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">
        Configuración de pregunta
      </h3>
      {renderConfigQuestion()}
    </div>
  );
};

export default ContentSettings;
