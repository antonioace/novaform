import { Controller, ControllerProps } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material";

interface FormMultiSelectProps
  extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  optionLabel: string;
  optionValue: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
}

export const FormMultiSelect = ({
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
}: FormMultiSelectProps) => {
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
              value={field?.value || []}
              multiple
              label={label}
              displayEmpty={!!placeholder}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as any[])?.map((value) => {
                    const option = options.find(
                      (opt) => opt[optionValue] === value
                    );
                    return (
                      <Chip
                        key={value}
                        label={option ? option[optionLabel] : value}
                      />
                    );
                  })}
                </Box>
              )}
              {...inputProps}
            >
              {placeholder && (
                <MenuItem value="" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options.map((option) => (
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
