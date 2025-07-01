import { Controller, ControllerProps } from "react-hook-form";
import { TextField, SxProps, Theme } from "@mui/material";

interface FormNumberInputProps
  extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  sx?: SxProps<Theme>;
}

export const FormNumberInput = ({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  placeholder,
  min,
  max,
  step,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  sx,
  ...inputProps
}: FormNumberInputProps) => {
  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col space-y-1">
            {/* Label arriba estilo antd */}
            {label && (
              <label 
                htmlFor={field.name}
                className={`text-sm font-medium text-gray-700 mb-1 ${
                  required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""
                } ${disabled ? "text-gray-400" : ""}`}
              >
                {label}
              </label>
            )}
            
            {/* TextField sin label */}
            <TextField
              id={field.name}
              value={field?.value || ""}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : "";
                field.onChange(value);
              }}
              type="number"
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={
                fieldState.error ? fieldState.error.message : helpText
              }
              className={className}
              disabled={disabled}
              inputProps={{ min, max, step }}
              fullWidth={fullWidth}
              size={size}
              variant={variant}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: disabled ? '#f5f5f5' : 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#021642',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#021642',
                    borderWidth: '2px',
                  },
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 0,
                  fontSize: '0.75rem',
                },
                ...sx,
              }}
              {...inputProps}
            />
          </div>
        )}
      />
    </div>
  );
};
