import { Controller, ControllerProps } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

// Define el tipo como una intersección, no como una interfaz con &
type FormAutoCompleteProps = {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options: any[];
  optionLabel: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  freeSolo?: boolean;
  multiple?: boolean;
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
  ...inputProps
}: FormAutoCompleteProps) => {
  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Autocomplete
            id={field.name}
            multiple={multiple}
            options={options}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option[optionLabel]
            }
            value={field?.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            disabled={disabled}
            freeSolo={freeSolo}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                required={required}
                error={!!fieldState.error}
                helperText={
                  fieldState.error ? fieldState.error.message : helpText
                }
                className={className}
                fullWidth={fullWidth}
                size={size}
                variant={variant}
              />
            )}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
