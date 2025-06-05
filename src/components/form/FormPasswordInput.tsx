import { useState } from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";

type FormPasswordInputProps = {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  showPasswordToggle?: boolean;
} & Pick<ControllerProps, "rules" | "control">;

export const FormPasswordInput = ({
  control,
  fieldName,
  label,
  rules,
  required = false,
  helpText,
  className,
  disabled = false,
  placeholder,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  showPasswordToggle = true,
  ...inputProps
}: FormPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type={showPassword ? "text" : "password"}
            label={label}
            placeholder={placeholder}
            required={required}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : helpText}
            className={className}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            InputProps={{
              endAdornment: showPasswordToggle ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
