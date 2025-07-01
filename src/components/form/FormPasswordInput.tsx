import { useState } from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { TextField, InputAdornment, IconButton, SxProps, Theme } from "@mui/material";
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
  sx?: SxProps<Theme>;
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
  sx,
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
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
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
