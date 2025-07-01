import React from "react";
import { useForm, useFieldArray, Control, FieldValues } from "react-hook-form";
import { FormSelect, FormTextInput } from "../../../../components/form";
import { ContactInfoCfg } from "../modals/configTypes";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FormQuestion } from "../../context/CuestionarioContext";
import CustomAccordion from "../../../shared/components/CustomAccordion";

interface ContactInfoConfigProps {
  selectedQuestion: FormQuestion;
  onSave: (data: ContactInfoCfg) => void;
}

const ContactInfoConfig: React.FC<ContactInfoConfigProps> = ({
  selectedQuestion,
  onSave,
}) => {
  const [initialData, setInitialData] = React.useState<ContactInfoCfg | null>(
    null
  );

  const styleDefaultInput = {
    "& .MuiOutlinedInput-input": {
      padding: "4px 8px",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "12px",
    },
  };
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: initialData?.id || "",
      type: "contact_info" as const,
      label: initialData?.label || "Información de contacto",
      fields: initialData?.fields || [
        {
          key: "name",
          label: "Nombre completo",
          type: "text",
          placeholder: "Ingresa tu nombre completo",
          required: true,
          isDefault: true,
        },
        {
          key: "email",
          label: "Correo electrónico",
          type: "email",
          placeholder: "ejemplo@correo.com",
          required: true,
          isDefault: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const addField = () => {
    append({
      key: `field_${fields.length + 1}`,
      label: "Nuevo campo",
      type: "text",
      placeholder: "",
      helpText: "",
      required: false,
      isDefault: false,
    });
  };

  const onSubmit = (data: any) => {
    const configData: ContactInfoCfg = {
      ...data,
      fields: data.fields.map((field: any) => ({
        ...field,
        validations: field.required
          ? [
              {
                type: "required" as const,
                message: `${field.label} es requerido`,
              },
            ]
          : [],
      })),
    };
    onSave(configData);
  };

  const tiposCamposArray = [
    {
      label: "Texto",
      value: "text",
    },
    {
      label: "Correo electrónico",
      value: "email",
    },
    {
      label: "Teléfono",
      value: "phone",
    },
    {
      label: "URL",
      value: "url",
    },
    {
      label: "Dirección",
      value: "address",
    },
    {
      label: "Fecha",
      value: "date",
    },
    {
      label: "Número",
      value: "number",
    },
  ];
  React.useEffect(() => {
    setInitialData(selectedQuestion?.config as unknown as ContactInfoCfg);
  }, [selectedQuestion?.id]);
  return (
    <div className=" p-2 flex flex-col grow overflow-y-auto mb-[80px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
        {/* Configuración básica */}

        <div className="flex flex-col flex-1 ">
          {" "}
          <div className="space-y-3">
            <FormTextInput
              control={control as unknown as Control<FieldValues>}
              fieldName="label"
              label="Título de la pregunta"
              placeholder="Ej: Información de contacto"
              required
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "4px 8px",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                },
              }}
              labelStyle={{
                fontSize: "11px",
              }}
            />
            <FormTextInput
              control={control as unknown as Control<FieldValues>}
              fieldName="description"
              label="Descripción de la pregunta"
              placeholder="Ej: Información de contacto"
              required
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "4px 8px",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                },
              }}
              labelStyle={{
                fontSize: "11px",
              }}
            />
          </div>
          {/* Configuración de campos */}
          <CustomAccordion
            title={
              <div className="flex items-center justify-between w-full gap-2 ">
                <span className="text-sm font-medium text-gray-900">
                  Campos ({fields.length})
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addField();
                  }}
                  className="w-6 h-6
                 
                  min-w-6 min-h-6
                  max-w-6 max-h-6
                  flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  <FiPlus className="w-3 h-3" />
                </button>
              </div>
            }
            defaultOpen={true}
            styles={{
              content: {
                padding: "10px",
              },
              container: {
                marginTop: "12px",
              },
            }}
          >
            <div className="flex flex-col gap-2">
              {fields?.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="flex flex-col gap-1
                  border border-[#EEEEEE] relative
                 	
                    p-5
                  "
                  >
                    <div className="absolute bottom-0 right-0 mb-2 mr-2">
                      <FiTrash2
                        className="w-4 h-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                        }}
                      />
                    </div>
                    <FormTextInput
                      control={control as unknown as Control<FieldValues>}
                      fieldName={`fields.${index}.key`}
                      placeholder="key"
                      sx={styleDefaultInput}
                    />
                    <FormTextInput
                      control={control as unknown as Control<FieldValues>}
                      fieldName={`fields.${index}.label`}
                      placeholder="Label"
                      sx={styleDefaultInput}
                    />
                    <FormSelect
                      control={control as unknown as Control<FieldValues>}
                      fieldName={`fields.${index}.type`}
                      placeholder="Tipo"
                      sx={styleDefaultInput}
                      labelStyle={{
                        fontSize: "11px",
                      }}
                      optionLabel="label"
                      optionValue="value"
                      options={tiposCamposArray}
                    />
                    <FormTextInput
                      control={control as unknown as Control<FieldValues>}
                      fieldName={`fields.${index}.helpText`}
                      placeholder="Tooltip"
                      sx={styleDefaultInput}
                    />
                  </div>
                );
              })}
            </div>
          </CustomAccordion>
        </div>

        {/* Botones de acción */}
        <div
          className="flex justify-end space-x-2 pt-4 
        absolute bottom-0 left-0 right-0

        "
        >
          <button
            type="submit"
            className="px-3 py-3 text-xs font-medium text-white transition-colors"
            style={{ backgroundColor: "#021642", width: "100%" }}
          >
            Guardar configuración
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoConfig;
