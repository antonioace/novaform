import React from "react";
import { ContactInfoCfg } from "../modals/configTypes";
import { DeviceType } from "../../context/CuestionarioContext";

interface ContactInfoPreviewProps {
  config: ContactInfoCfg;
  deviceType: DeviceType;
}

const ContactInfoPreview: React.FC<ContactInfoPreviewProps> = ({
  config,
  deviceType,
}) => {
  const getInputStyles = () => {
    const baseStyles = {
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      outline: "none",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      fontFamily: "inherit",
      backgroundColor: "#ffffff",
    };

    switch (deviceType) {
      case "mobile":
        return {
          ...baseStyles,
          padding: "12px",
          fontSize: "16px",
        };
      case "tablet":
        return {
          ...baseStyles,
          padding: "12px 16px",
          fontSize: "16px",
        };
      case "desktop":
      default:
        return {
          ...baseStyles,
          padding: "8px 16px",
          fontSize: "14px",
        };
    }
  };

  const getLabelStyles = () => {
    const baseStyles = {
      display: "block",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "8px",
      fontFamily: "inherit",
    };

    switch (deviceType) {
      case "mobile":
        return {
          ...baseStyles,
          fontSize: "16px",
        };
      case "tablet":
        return {
          ...baseStyles,
          fontSize: "16px",
        };
      case "desktop":
      default:
        return {
          ...baseStyles,
          fontSize: "14px",
        };
    }
  };

  const getHelpTextStyles = () => {
    const baseStyles = {
      color: "#6b7280",
      marginTop: "4px",
      fontFamily: "inherit",
    };

    switch (deviceType) {
      case "mobile":
        return {
          ...baseStyles,
          fontSize: "14px",
        };
      case "tablet":
        return {
          ...baseStyles,
          fontSize: "14px",
        };
      case "desktop":
      default:
        return {
          ...baseStyles,
          fontSize: "12px",
        };
    }
  };

  const renderField = (field: ContactInfoCfg["fields"][0]) => {
    const isRequired = field.validations?.some((v) => v.type === "required");

    const commonProps = {
      id: field.key,
      name: field.key,
      placeholder: field.placeholder || "",
      style: getInputStyles(),
      disabled: true, // Preview mode
    };

    let inputElement;

    switch (field.type) {
      case "email":
        inputElement = (
          <input
            {...commonProps}
            type="email"
            placeholder={field.placeholder || "ejemplo@correo.com"}
          />
        );
        break;

      case "phone":
        inputElement = (
          <input
            {...commonProps}
            type="tel"
            placeholder={field.placeholder || "+1 (555) 123-4567"}
          />
        );
        break;

      case "url":
        inputElement = (
          <input
            {...commonProps}
            type="url"
            placeholder={field.placeholder || "https://www.ejemplo.com"}
          />
        );
        break;

      case "date":
        inputElement = <input {...commonProps} type="date" />;
        break;

      case "number":
        inputElement = (
          <input
            {...commonProps}
            type="number"
            placeholder={field.placeholder || "123"}
          />
        );
        break;

      case "address":
        inputElement = (
          <textarea
            {...commonProps}
            rows={3}
            placeholder={field.placeholder || "Calle, Ciudad, País"}
            style={{
              ...commonProps.style,
              resize: "none",
            }}
          />
        );
        break;

      case "text":
      default:
        inputElement = (
          <input
            {...commonProps}
            type="text"
            placeholder={field.placeholder || "Ingresa aquí"}
          />
        );
        break;
    }

    return (
      <div key={field.key} style={{ marginBottom: "24px" }}>
        <label htmlFor={field.key} style={getLabelStyles()}>
          {field.label}
          {isRequired && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
          )}
        </label>
        {inputElement}
        {field.helpText && <p style={getHelpTextStyles()}>{field.helpText}</p>}
      </div>
    );
  };

  const getContainerPadding = () => {
    switch (deviceType) {
      case "mobile":
        return "16px";
      case "tablet":
        return "24px";
      case "desktop":
      default:
        return "32px";
    }
  };

  const getButtonStyles = () => {
    const baseStyles = {
      width: "100%",
      backgroundColor: "#021642",
      color: "white",
      fontWeight: "500",
      borderRadius: "8px",
      border: "none",
      cursor: "not-allowed",
      opacity: "0.75",
      fontFamily: "inherit",
    };

    switch (deviceType) {
      case "mobile":
        return {
          ...baseStyles,
          padding: "12px",
          fontSize: "16px",
        };
      case "tablet":
        return {
          ...baseStyles,
          padding: "12px",
          fontSize: "16px",
        };
      case "desktop":
      default:
        return {
          ...baseStyles,
          padding: "8px",
          fontSize: "14px",
        };
    }
  };

  const getSectionTitleStyles = () => {
    const baseStyles = {
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
      fontFamily: "inherit",
    };

    switch (deviceType) {
      case "mobile":
        return {
          ...baseStyles,
          fontSize: "18px",
        };
      case "tablet":
        return {
          ...baseStyles,
          fontSize: "20px",
        };
      case "desktop":
      default:
        return {
          ...baseStyles,
          fontSize: "24px",
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
        padding: getContainerPadding(),
      }}
    >
      {/* Título de la sección */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={getSectionTitleStyles()}>{config.label}</h2>
      </div>

      {/* Campos del formulario */}
      <div style={{ marginBottom: "32px" }}>
        {config.fields.map((field) => renderField(field))}
      </div>

      {/* Botón de envío */}
      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <button type="button" disabled style={getButtonStyles()}>
          Enviar información
        </button>
      </div>

      {/* Indicador de vista previa */}
      <div
        style={{
          marginTop: "16px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "500",
            backgroundColor: "#f3f4f6",
            color: "#1f2937",
            fontFamily: "inherit",
          }}
        >
          Vista previa
        </span>
      </div>
    </div>
  );
};

export default ContactInfoPreview;
