import { Controller, ControllerProps } from "react-hook-form";
import { ReactNode } from "react";

interface CustomFormCheckboxProps
  extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: ReactNode;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomFormCheckbox = ({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  ...inputProps
}: CustomFormCheckboxProps) => {
  return (
    <div className="mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                id={field.name}
                type="checkbox"
                {...field}
                checked={field?.value || false}
                disabled={disabled}
                className={`
                  w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500
                  ${fieldState.error ? "border-red-500" : "border-gray-300"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                  ${className || ""}
                `}
                {...inputProps}
              />
              {label && (
                <label
                  htmlFor={field.name}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
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
