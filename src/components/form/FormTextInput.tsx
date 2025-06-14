import { Controller, ControllerProps, FieldValues, Path } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface FormTextInputProps<T extends FieldValues = FieldValues>
  extends Pick<ControllerProps<T>, "rules" | "control">,
    Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
  fieldName: Path<T>;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
}

export const FormTextInput = <T extends FieldValues = FieldValues>({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  placeholder,
  type = "text",
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  ...inputProps
}: FormTextInputProps<T>) => {
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
              {...field}
              value={field?.value || null}
              type={type}
              label={label}
              placeholder={placeholder}
              required={required}
              error={!!fieldState.error}
              helperText={
                fieldState.error ? fieldState.error.message : helpText
              }
              className={className}
              disabled={disabled}
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
