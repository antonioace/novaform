import { Controller, ControllerProps } from "react-hook-form";

interface CustomFormNumberInputProps extends Pick<ControllerProps, "rules" | "control"> {
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
}

export const CustomFormNumberInput = ({
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
  step = 1,
  ...inputProps
}: CustomFormNumberInputProps) => {
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
            <input
              id={field.name}
              type="number"
              {...field}
              value={field?.value || ""}
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              className={`
                px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${fieldState.error ? 'border-red-500' : 'border-gray-300'}
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                ${className || ''}
              `}
              {...inputProps}
            />
            {(fieldState.error || helpText) && (
              <p className={`mt-1 text-sm ${fieldState.error ? 'text-red-500' : 'text-gray-500'}`}>
                {fieldState.error ? fieldState.error.message : helpText}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}; 