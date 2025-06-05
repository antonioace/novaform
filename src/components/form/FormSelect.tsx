import { Controller, ControllerProps } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

interface FormSelectProps extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
}

export const FormSelect = ({
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
  optionValue,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  ...inputProps
}: FormSelectProps) => {
  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <FormControl
            fullWidth={fullWidth}
            error={!!fieldState.error}
            size={size}
            variant={variant}
            disabled={disabled}
            className={className}
          >
            <InputLabel id={`${field.name}-label`} required={required}>
              {label}
            </InputLabel>
            <Select
              labelId={`${field.name}-label`}
              id={field.name}
              {...field}
              value={field?.value || null}
              label={label}
              displayEmpty={!!placeholder}
              {...inputProps}
            >
              {placeholder && (
                <MenuItem value="" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options?.map((option) => (
                <MenuItem key={option[optionValue]} value={option[optionValue]}>
                  {option[optionLabel]}
                </MenuItem>
              ))}
            </Select>
            {(fieldState.error || helpText) && (
              <FormHelperText>
                {fieldState.error ? fieldState.error.message : helpText}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </div>
  );
};
