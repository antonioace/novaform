import { Controller, ControllerProps } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CustomFormPasswordInputProps
  extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const CustomFormPasswordInput = ({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  placeholder,
  ...inputProps
}: CustomFormPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={field.name}
                className="mb-2 text-sm font-medium text-gray-700"
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <div className="relative">
              <input
                id={field.name}
                type={showPassword ? "text" : "password"}
                {...field}
                value={field?.value || ""}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${fieldState.error ? "border-red-500" : "border-gray-300"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                  ${className || ""}
                `}
                {...inputProps}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {(fieldState.error || helpText) && (
              <p
                className={`mt-1 text-sm ${
                  fieldState.error ? "text-red-500" : "text-gray-500"
                }`}
              >
                {fieldState.error ? fieldState.error.message : helpText}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
