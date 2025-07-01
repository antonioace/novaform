import React from "react";
import { FormQuestion, FormElement } from "../context/CuestionarioContext";

// Tipos para los estilos
export interface ElementStyles {
  [deviceType: string]: {
    [elementType: string]: React.CSSProperties;
  };
}

export interface ContentPreviewProps {
  question: FormQuestion;
  deviceType: "desktop" | "tablet" | "mobile";
  styles?: ElementStyles;
}

// Estilos por defecto
const defaultStyles: ElementStyles = {
  desktop: {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "16px",
    },
    formHeader: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      marginBottom: "16px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #021642",
    },
    formTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "8px",
      lineHeight: "1.25",
    },
    formDescription: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: "1.4",
    },
    questionContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    questionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
      lineHeight: "1.4",
    },
    questionDescription: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
      lineHeight: "1.4",
    },
    elementContainer: {
      marginBottom: "16px",
    },
    elementLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      color: "#1f2937",
    },
    textarea: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      color: "#1f2937",
      minHeight: "80px",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      color: "#1f2937",
      backgroundColor: "white",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      marginRight: "8px",
    },
    radio: {
      width: "16px",
      height: "16px",
      marginRight: "8px",
    },
    required: {
      color: "#ef4444",
      marginLeft: "2px",
    },
  },
  tablet: {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "12px",
    },
    formHeader: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #021642",
    },
    formTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "6px",
      lineHeight: "1.25",
    },
    formDescription: {
      fontSize: "13px",
      color: "#6b7280",
      lineHeight: "1.4",
    },
    questionContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    questionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "14px",
      lineHeight: "1.4",
    },
    questionDescription: {
      fontSize: "13px",
      color: "#6b7280",
      marginBottom: "14px",
      lineHeight: "1.4",
    },
    elementContainer: {
      marginBottom: "14px",
    },
    elementLabel: {
      fontSize: "13px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "5px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#1f2937",
    },
    textarea: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#1f2937",
      minHeight: "70px",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#1f2937",
      backgroundColor: "white",
    },
    checkbox: {
      width: "14px",
      height: "14px",
      marginRight: "6px",
    },
    radio: {
      width: "14px",
      height: "14px",
      marginRight: "6px",
    },
    required: {
      color: "#ef4444",
      marginLeft: "2px",
    },
  },
  mobile: {
    container: {
      maxWidth: "100%",
      margin: "0 auto",
      padding: "8px",
    },
    formHeader: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "16px",
      marginBottom: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderLeft: "3px solid #021642",
    },
    formTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "4px",
      lineHeight: "1.25",
    },
    formDescription: {
      fontSize: "12px",
      color: "#6b7280",
      lineHeight: "1.4",
    },
    questionContainer: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "16px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    questionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "12px",
      lineHeight: "1.4",
    },
    questionDescription: {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "12px",
      lineHeight: "1.4",
    },
    elementContainer: {
      marginBottom: "12px",
    },
    elementLabel: {
      fontSize: "12px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "4px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#1f2937",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#1f2937",
      minHeight: "60px",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#1f2937",
      backgroundColor: "white",
    },
    checkbox: {
      width: "14px",
      height: "14px",
      marginRight: "6px",
    },
    radio: {
      width: "14px",
      height: "14px",
      marginRight: "6px",
    },
    required: {
      color: "#ef4444",
      marginLeft: "2px",
    },
  },
};

const ContentPreview: React.FC<ContentPreviewProps> = ({
  question,
  deviceType,
  styles = defaultStyles,
}) => {
  // Obtener estilos para el dispositivo actual
  const currentStyles = { ...defaultStyles[deviceType], ...styles[deviceType] };
  // Función para renderizar diferentes tipos de elementos
  const renderElement = (element: FormElement) => {
    const elementStyle = currentStyles.elementContainer;
    const labelStyle = currentStyles.elementLabel;
    const requiredStyle = currentStyles.required;

    switch (element.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={element.id} style={elementStyle}>
            <label style={labelStyle}>
              {element.title}
              {element.required && <span style={requiredStyle}>*</span>}
            </label>
            <input
              type={
                element.type === "email"
                  ? "email"
                  : element.type === "number"
                  ? "number"
                  : "text"
              }
              placeholder={
                element.placeholder || `Ingresa ${element.title.toLowerCase()}`
              }
              style={currentStyles.input}
              disabled
            />
            {element.description && (
              <div
                style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
              >
                {element.description}
              </div>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={element.id} style={elementStyle}>
            <label style={labelStyle}>
              {element.title}
              {element.required && <span style={requiredStyle}>*</span>}
            </label>
            <textarea
              placeholder={
                element.placeholder || `Ingresa ${element.title.toLowerCase()}`
              }
              style={currentStyles.textarea}
              disabled
            />
            {element.description && (
              <div
                style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
              >
                {element.description}
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <div key={element.id} style={elementStyle}>
            <label style={labelStyle}>
              {element.title}
              {element.required && <span style={requiredStyle}>*</span>}
            </label>
            <select style={currentStyles.select} disabled>
              <option>Selecciona una opción</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {element.description && (
              <div
                style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
              >
                {element.description}
              </div>
            )}
          </div>
        );

      case "multiple_choice":
        return (
          <div key={element.id} style={elementStyle}>
            <label style={labelStyle}>
              {element.title}
              {element.required && <span style={requiredStyle}>*</span>}
            </label>
            <div style={{ marginTop: "8px" }}>
              {element.options?.map((option, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name={`radio-${element.id}`}
                    style={currentStyles.radio}
                    disabled
                  />
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    {option}
                  </span>
                </div>
              ))}
            </div>
            {element.description && (
              <div
                style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
              >
                {element.description}
              </div>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={element.id} style={elementStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={currentStyles.checkbox} disabled />
              <label style={{ ...labelStyle, margin: 0 }}>
                {element.title}
                {element.required && <span style={requiredStyle}>*</span>}
              </label>
            </div>
            {element.description && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  marginTop: "4px",
                  marginLeft: "24px",
                }}
              >
                {element.description}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div key={element.id} style={elementStyle}>
            <label style={labelStyle}>
              {element.title}
              {element.required && <span style={requiredStyle}>*</span>}
            </label>
            <div
              style={{
                padding: "8px 12px",
                border: "1px dashed #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              Elemento tipo: {element.type}
            </div>
            {element.description && (
              <div
                style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}
              >
                {element.description}
              </div>
            )}
          </div>
        );
    }
  };

  return <div style={currentStyles.container}>{renderElement(question)}</div>;
};

export default ContentPreview;
