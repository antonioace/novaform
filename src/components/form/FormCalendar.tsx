import {  Controller, ControllerProps } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { SxProps, Theme } from "@mui/material";
import dayjs from "dayjs";

interface FormCalendarProps extends Pick<ControllerProps, "rules" | "control"> {
  fieldName: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showTime?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  sx?: SxProps<Theme>;
}

export const FormCalendar = ({
  control,
  fieldName,
  label,
  rules,
  required,
  helpText,
  className,
  disabled,
  placeholder,
  showTime = false,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  sx,
  ...inputProps
}: FormCalendarProps) => {
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
            
            {/* DatePicker sin label */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {showTime ? (
                <DateTimePicker
                  value={field?.value ? dayjs(field.value) : null}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      id: field.name,
                      placeholder,
                      error: !!fieldState.error,
                      helperText: fieldState.error
                        ? fieldState.error.message
                        : helpText,
                      className,
                      disabled,
                      fullWidth,
                      size,
                      variant,
                      sx: {
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
                      },
                    },
                  }}
                  {...inputProps}
                />
              ) : (
                <DatePicker
                  value={field?.value ? dayjs(field.value) : null}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      id: field.name,
                      placeholder,
                      error: !!fieldState.error,
                      helperText: fieldState.error
                        ? fieldState.error.message
                        : helpText,
                      className,
                      disabled,
                      fullWidth,
                      size,
                      variant,
                      sx: {
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
                      },
                    },
                  }}
                  {...inputProps}
                />
              )}
            </LocalizationProvider>
          </div>
        )}
      />
    </div>
  );
};
