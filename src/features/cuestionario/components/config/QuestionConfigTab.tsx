import React from "react";
import { useCuestionario } from "../../context/CuestionarioContext";
import { ContactInfoConfig } from "./";
import { CONTENT_TYPES } from "../modals";

const QuestionConfigTab = () => {
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
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Selecciona una pregunta para configurar</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">
        Configuración de pregunta
      </h3>
      {renderConfigQuestion()}
    </div>
  );
};

export default QuestionConfigTab; 