import { Controller, ControllerProps } from "react-hook-form";
import { Autocomplete, TextField, SxProps, Theme } from "@mui/material";

// Define el tipo como una intersección, no como una interfaz con &
type FormAutoCompleteProps = {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options: Record<string, string | number>[];
  optionLabel: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  freeSolo?: boolean;
  multiple?: boolean;
  sx?: SxProps<Theme>;
} & Pick<ControllerProps, "rules" | "control">;

export const FormAutoComplete = ({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  placeholder,
  options,
  optionLabel,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  freeSolo = false,
  multiple = false,
  sx,
  ...inputProps
}: FormAutoCompleteProps) => {
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
            
            {/* Autocomplete sin label */}
            <Autocomplete
              id={field.name}
              multiple={multiple}
              options={options}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : String(option[optionLabel])
              }
              value={field?.value}
              onChange={(_, newValue) => field.onChange(newValue)}
              disabled={disabled}
              freeSolo={freeSolo}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : helpText
                  }
                  className={className}
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
                />
              )}
              {...inputProps}
            />
          </div>
        )}
      />
    </div>
  );
};
