import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FormElement {
  id: string;
  type: string;
  title: string;
  description?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormQuestion {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
  required?: boolean;
  position: number;
  type: string;
  config?: Record<string, unknown>; // Configuración específica según el tipo
}

export interface CuestionarioForm {
  id: string;
  title: string;
  description: string;
  questions: FormQuestion[];
  settings: {
    allowAnonymous: boolean;
    multipleSubmissions: boolean;
    showProgressBar: boolean;
  };
}

export type DeviceType = "desktop" | "tablet" | "mobile";

interface CuestionarioContextType {
  // Estado del formulario
  form: CuestionarioForm;
  setForm: React.Dispatch<React.SetStateAction<CuestionarioForm>>;

  // Pregunta seleccionada
  selectedQuestionId: string | null;
  setSelectedQuestionId: (id: string | null) => void;

  // Device type para vista previa
  deviceType: DeviceType;
  setDeviceType: (device: DeviceType) => void;

  // Modales
  addContentModalOpen: boolean;
  setAddContentModalOpen: (open: boolean) => void;
  editFormInfoModalOpen: boolean;
  setEditFormInfoModalOpen: (open: boolean) => void;

  // Acciones del formulario
  updateFormTitle: (title: string) => void;
  updateFormDescription: (description: string) => void;

  // Acciones de preguntas
  addQuestion: (questionType?: string, questionTitle?: string) => void;
  deleteQuestion: (questionId: string) => void;
  updateQuestion: (questionId: string, updates: Partial<FormQuestion>) => void;
  updateQuestionConfig: (
    questionId: string,
    config: Record<string, unknown>
  ) => void;
  duplicateQuestion: (questionId: string) => void;

  // Acciones de elementos
  addElementToQuestion: (
    questionId: string,
    element: Omit<FormElement, "id">
  ) => void;
  updateElement: (
    questionId: string,
    elementId: string,
    updates: Partial<FormElement>
  ) => void;
  deleteElement: (questionId: string, elementId: string) => void;

  // Utilidades
  getSelectedQuestion: () => FormQuestion | null;
  moveQuestion: (questionId: string, direction: "up" | "down") => void;
  reorderQuestions: (startIndex: number, endIndex: number) => void;
  selectedQuestion: FormQuestion | null;
}

const CuestionarioContext = createContext<CuestionarioContextType | undefined>(
  undefined
);

export const useCuestionario = () => {
  const context = useContext(CuestionarioContext);
  if (!context) {
    throw new Error(
      "useCuestionario debe ser usado dentro de un CuestionarioProvider"
    );
  }
  return context;
};

interface CuestionarioProviderProps {
  children: ReactNode;
}

export const CuestionarioProvider: React.FC<CuestionarioProviderProps> = ({
  children,
}) => {
  const [form, setForm] = useState<CuestionarioForm>({
    id: "1",
    title: "Mi nuevo formulario",
    description: "",
    questions: [
      {
        id: "1",
        title: "Pregunta sin título",
        description: "Descripción (opcional)",
        elements: [],
        required: false,
        position: 0,
        type: "short_text",
      },
    ],
    settings: {
      allowAnonymous: true,
      multipleSubmissions: false,
      showProgressBar: true,
    },
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    "1"
  );
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [addContentModalOpen, setAddContentModalOpen] = useState(false);
  const [editFormInfoModalOpen, setEditFormInfoModalOpen] = useState(false);

  // Acciones del formulario
  const updateFormTitle = (title: string) => {
    setForm((prev) => ({ ...prev, title }));
  };

  const updateFormDescription = (description: string) => {
    setForm((prev) => ({ ...prev, description }));
  };

  // Acciones de preguntas
  const addQuestion = (questionType?: string, questionTitle?: string) => {
    const newQuestion: FormQuestion = {
      id: Date.now().toString(),
      title: questionTitle || "Pregunta sin título",
      description: "",
      elements: [],
      required: false,
      position: form.questions.length,
      type: questionType || "short_text",
    };
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setSelectedQuestionId(newQuestion.id);
  };

  const deleteQuestion = (questionId: string) => {
    setForm((prev) => {
      const filteredQuestions = prev.questions.filter(
        (q) => q.id !== questionId
      );
      // Actualizar las posiciones después de eliminar
      const questionsWithUpdatedPositions = filteredQuestions.map(
        (q, index) => ({
          ...q,
          position: index,
        })
      );

      return {
        ...prev,
        questions: questionsWithUpdatedPositions,
      };
    });

    // Si se elimina la pregunta seleccionada, seleccionar la primera disponible
    if (selectedQuestionId === questionId) {
      const remainingQuestions = form.questions.filter(
        (q) => q.id !== questionId
      );
      setSelectedQuestionId(
        remainingQuestions.length > 0 ? remainingQuestions[0].id : null
      );
    }
  };

  const updateQuestion = (
    questionId: string,
    updates: Partial<FormQuestion>
  ) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    }));
  };

  const updateQuestionConfig = (
    questionId: string,
    config: Record<string, unknown>
  ) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, config } : q
      ),
    }));
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = form.questions.find((q) => q.id === questionId);
    if (questionToDuplicate) {
      const questionIndex = form.questions.findIndex(
        (q) => q.id === questionId
      );
      const newQuestion: FormQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString(),
        title: `${questionToDuplicate.title} (copia)`,
        elements: questionToDuplicate.elements.map((el) => ({
          ...el,
          id: `${Date.now()}-${Math.random()}`,
        })),
        position: questionIndex + 1,
        type: questionToDuplicate.type,
      };

      setForm((prev) => {
        const newQuestions = [...prev.questions];
        // Insertar la nueva pregunta después de la original
        newQuestions.splice(questionIndex + 1, 0, newQuestion);
        // Actualizar las posiciones de todas las preguntas
        return {
          ...prev,
          questions: newQuestions.map((q, index) => ({
            ...q,
            position: index,
          })),
        };
      });
      setSelectedQuestionId(newQuestion.id);
    }
  };

  // Acciones de elementos
  const addElementToQuestion = (
    questionId: string,
    element: Omit<FormElement, "id">
  ) => {
    const newElement: FormElement = {
      ...element,
      id: Date.now().toString(),
    };

    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? { ...q, elements: [...q.elements, newElement] }
          : q
      ),
    }));
  };

  const updateElement = (
    questionId: string,
    elementId: string,
    updates: Partial<FormElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              elements: q.elements.map((el) =>
                el.id === elementId ? { ...el, ...updates } : el
              ),
            }
          : q
      ),
    }));
  };

  const deleteElement = (questionId: string, elementId: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              elements: q.elements.filter((el) => el.id !== elementId),
            }
          : q
      ),
    }));
  };

  // Utilidades
  const getSelectedQuestion = (): FormQuestion | null => {
    if (!selectedQuestionId) return null;
    return form.questions.find((q) => q.id === selectedQuestionId) || null;
  };

  const moveQuestion = (questionId: string, direction: "up" | "down") => {
    const currentIndex = form.questions.findIndex((q) => q.id === questionId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= form.questions.length) return;

    const newQuestions = [...form.questions];
    [newQuestions[currentIndex], newQuestions[newIndex]] = [
      newQuestions[newIndex],
      newQuestions[currentIndex],
    ];

    setForm((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const reorderQuestions = (startIndex: number, endIndex: number) => {
    const newQuestions = [...form.questions];
    const [movedQuestion] = newQuestions.splice(startIndex, 1);
    newQuestions.splice(endIndex, 0, movedQuestion);

    // Actualizar las posiciones de todas las preguntas
    const questionsWithUpdatedPositions = newQuestions.map((q, index) => ({
      ...q,
      position: index,
    }));

    setForm((prev) => ({
      ...prev,
      questions: questionsWithUpdatedPositions,
    }));
  };

  const selectedQuestion = getSelectedQuestion();
  const value: CuestionarioContextType = {
    // Estado
    form,
    setForm,
    selectedQuestionId,
    setSelectedQuestionId,
    deviceType,
    setDeviceType,
    addContentModalOpen,
    setAddContentModalOpen,
    editFormInfoModalOpen,
    setEditFormInfoModalOpen,

    // Acciones del formulario
    updateFormTitle,
    updateFormDescription,

    // Acciones de preguntas
    addQuestion,
    deleteQuestion,
    updateQuestion,
    updateQuestionConfig,
    duplicateQuestion,

    // Acciones de elementos
    addElementToQuestion,
    updateElement,
    deleteElement,

    // Utilidades
    getSelectedQuestion,
    moveQuestion,
    reorderQuestions,
    selectedQuestion,
  };

  return (
    <CuestionarioContext.Provider value={value}>
      {children}
    </CuestionarioContext.Provider>
  );
};

export default CuestionarioContext;
