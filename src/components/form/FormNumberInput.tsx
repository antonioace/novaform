import { Controller, ControllerProps } from "react-hook-form";
import { TextField } from "@mui/material";

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
  ...inputProps
}: FormNumberInputProps) => {
  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <TextField
              id={field.name}
              value={field?.value || null}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : "";
                field.onChange(value);
              }}
              type="number"
              label={label}
              placeholder={placeholder}
              required={required}
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
              {...inputProps}
            />
          </div>
        )}
      />
    </div>
  );
};
