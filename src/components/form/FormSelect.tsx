import { Controller, ControllerProps } from "react-hook-form";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  SxProps,
  Theme,
} from "@mui/material";

interface FormSelectProps extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options: Record<string, string | number>[];
  optionLabel: string;
  optionValue: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  sx?: SxProps<Theme>;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
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
  sx,
  labelStyle,
  labelClassName,
  ...inputProps
}: FormSelectProps) => {
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
                  required
                    ? "after:content-['*'] after:text-red-500 after:ml-1"
                    : ""
                } ${disabled ? "text-gray-400" : ""} ${labelClassName}`}
                style={labelStyle}
              >
                {label}
              </label>
            )}

            {/* FormControl sin InputLabel */}
            <FormControl
              fullWidth={fullWidth}
              error={!!fieldState.error}
              size={size}
              variant={variant}
              disabled={disabled}
              className={className}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: disabled ? "#f5f5f5" : "white",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#021642",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#021642",
                    borderWidth: "2px",
                  },
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  fontSize: "0.75rem",
                },
                ...sx,
              }}
            >
              <Select
                id={field.name}
                {...field}
                value={field?.value || ""}
                displayEmpty={!!placeholder}
                {...inputProps}
              >
                {placeholder && (
                  <MenuItem value="" disabled>
                    <span className="text-gray-400">{placeholder}</span>
                  </MenuItem>
                )}
                {options?.map((option) => (
                  <MenuItem
                    key={String(option[optionValue])}
                    value={option[optionValue]}
                  >
                    {String(option[optionLabel])}
                  </MenuItem>
                ))}
              </Select>
              {(fieldState.error || helpText) && (
                <FormHelperText>
                  {fieldState.error ? fieldState.error.message : helpText}
                </FormHelperText>
              )}
            </FormControl>
          </div>
        )}
      />
    </div>
  );
};
