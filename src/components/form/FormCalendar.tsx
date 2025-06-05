import {  Controller, ControllerProps } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
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
  ...inputProps
}: FormCalendarProps) => {
  return (
    <div className="field mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {showTime ? (
              <DateTimePicker
                label={label}
                value={field?.value ? dayjs(field.value) : null}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    id: field.name,
                    placeholder,
                    required,
                    error: !!fieldState.error,
                    helperText: fieldState.error
                      ? fieldState.error.message
                      : helpText,
                    className,
                    disabled,
                    fullWidth,
                    size,
                    variant,
                  },
                }}
                {...inputProps}
              />
            ) : (
              <DatePicker
                label={label}
                value={field?.value ? dayjs(field.value) : null}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    id: field.name,
                    placeholder,
                    required,
                    error: !!fieldState.error,
                    helperText: fieldState.error
                      ? fieldState.error.message
                      : helpText,
                    className,
                    disabled,
                    fullWidth,
                    size,
                    variant,
                  },
                }}
                {...inputProps}
              />
            )}
          </LocalizationProvider>
        )}
      />
    </div>
  );
};
