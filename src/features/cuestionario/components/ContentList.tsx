import React, { useState } from "react";
import { FiPlus, FiCopy, FiTrash2, FiMove } from "react-icons/fi";
import { useCuestionario } from "../context/CuestionarioContext";
import { ContentTypeIcon, CONTENT_TYPES, type ContentType } from "./modals";

const ContentList = () => {
  const {
    form,
    selectedQuestionId,
    setSelectedQuestionId,
    setAddContentModalOpen,
    duplicateQuestion,
    deleteQuestion,
    reorderQuestions,
  } = useCuestionario();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderQuestions(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Función helper para mapear el tipo de pregunta al tipo de contenido
  const getQuestionContentType = (questionType: string): ContentType => {
    // Mapeo de tipos de pregunta a tipos de contenido
    const typeMap: Record<string, ContentType> = {
      'contact_info': CONTENT_TYPES.CONTACT_INFO,
      'email': CONTENT_TYPES.EMAIL,
      'phone': CONTENT_TYPES.PHONE,
      'address': CONTENT_TYPES.ADDRESS,
      'website': CONTENT_TYPES.WEBSITE,
      'multiple_choice': CONTENT_TYPES.MULTIPLE_CHOICE,
      'dropdown': CONTENT_TYPES.DROPDOWN,
      'checkbox': CONTENT_TYPES.CHECKBOX,
      'image_choice': CONTENT_TYPES.IMAGE_CHOICE,
      'yes_no': CONTENT_TYPES.YES_NO,
      'long_text': CONTENT_TYPES.LONG_TEXT,
      'short_text': CONTENT_TYPES.SHORT_TEXT,
      'video_audio': CONTENT_TYPES.VIDEO_AUDIO,
      'number': CONTENT_TYPES.NUMBER,
      'date': CONTENT_TYPES.DATE,
      'file_upload': CONTENT_TYPES.FILE_UPLOAD,
      'rating': CONTENT_TYPES.RATING,
    };
    
    // Retorna el tipo mapeado o un tipo por defecto
    return typeMap[questionType] || CONTENT_TYPES.SHORT_TEXT;
  };

  // Ordenar preguntas por posición antes de renderizar
  const sortedQuestions = [...form.questions].sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className="w-60 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-3 border-b border-gray-200">
        <button
          onClick={() => setAddContentModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-lg font-medium transition-colors hover:opacity-90"
          style={{
            backgroundColor: "#021642",
            color: "white",
          }}
        >
          <FiPlus className="w-4 h-4" />
          <span>Añadir contenido</span>
        </button>
      </div>

      <div className="p-3 space-y-2">
        {sortedQuestions.map((question, index) => (
          <div
            key={question.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedQuestionId(question.id)}
            className={`p-2 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
              selectedQuestionId === question.id
                ? "border-gray-600 bg-gray-50"
                : "border-gray-200"
            } ${draggedIndex === index ? "opacity-50" : ""}`}
            style={{
              borderColor:
                selectedQuestionId === question.id ? "#021642" : undefined,
              backgroundColor:
                selectedQuestionId === question.id ? "#f8fafc" : undefined,
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex items-center space-x-1">
                <FiMove className="w-3 h-3 text-gray-400 cursor-grab" />
                <div
                  className="p-1 rounded"
                  style={{ backgroundColor: "#021642" }}
                >
                  <ContentTypeIcon 
                    type={getQuestionContentType(question.type)} 
                    className="w-3 h-3 text-white" 
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {question.position + 1}
              </span>
            </div>
            <p className="text-xs text-gray-600 truncate">{question.title}</p>

            {selectedQuestionId === question.id && (
              <div className="flex items-center space-x-1 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateQuestion(question.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
                {form.questions.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuestion(question.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
