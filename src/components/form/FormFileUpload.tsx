import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, Typography, FormHelperText } from "@mui/material";
import { FiUpload } from "react-icons/fi";

interface FormFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  maxSize?: number; // Tamaño máximo en bytes
  helperText?: string;
  style?: React.CSSProperties;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
  name,
  label,
  accept = "*/*",
  multiple = false,
  required = false,
  maxSize = 5 * 1024 * 1024, // 5MB por defecto
  helperText,
  style,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setError("");

    if (files && files.length > 0) {
      // Validar tamaño de archivos
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          setError(
            `El archivo ${files[i].name} excede el tamaño máximo permitido (${
              maxSize / (1024 * 1024)
            }MB)`
          );
          return;
        }
      }

      setFileName(
        multiple ? `${files.length} archivos seleccionados` : files[0].name
      );
    }
  };

  const handleButtonClick = () => {
    setError("");
    fileInputRef.current?.click();
  };

  const hasError = !!errors[name] || !!error;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Este campo es requerido" : false,
        validate: (value) => {
          if (value && value.length > 0) {
            return true;
          }
          return required ? "Por favor seleccione un archivo" : true;
        },
      }}
      render={({ field: { onChange, ...field } }) => (
        <Box>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            style={{ display: "none", ...style }}
            onChange={(e) => {
              handleFileChange(e);
              onChange(e.target.files);
            }}
            {...field}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<FiUpload />}
            onClick={handleButtonClick}
            sx={{
              mb: 1,
              borderColor: hasError ? "error.main" : undefined,
              "&:hover": {
                borderColor: hasError ? "error.main" : undefined,
              },
            }}
          >
            {label || "Seleccionar archivo"}
          </Button>
          {fileName && (
            <Typography variant="body2" color="text.secondary">
              {fileName}
            </Typography>
          )}
          {(errors[name] || error || helperText) && (
            <FormHelperText error={hasError}>
              {(errors[name]?.message as string) || error || helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
