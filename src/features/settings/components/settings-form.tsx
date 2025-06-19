"use client";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { FormTextInput, FormPasswordInput } from "@/components/form";
import { useNotification } from "@/contexts/NotificationContext";
import { useState } from "react";

interface SettingsForm {
  name: string;
  age: number;
  country: string;
  languages: string[];
  birthDate: Date;
  city: string;
}

export default function SettingsForm() {
  const { showSuccess } = useNotification();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      name: "",
      age: 0,
      country: "",
      languages: [],
      birthDate: new Date(),
      city: "",
    },
  });
  

  const onSubmit = (formData: SettingsForm) => {
    showSuccess("Configuración actualizada correctamente");
    setData([...data, formData]);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-12 md:col-span-4 flex flex-col gap-4 bg-red"
      >
        <h2 className="text-2xl font-bold mb-4">Configuración</h2>

        <FormTextInput
          control={control}
          fieldName="name"
          label="Nombre"
          rules={{ required: "El nombre es requerido" }}
          helpText="Ingresa tu nombre completo"
        />
        <FormTextInput
          control={control}
          fieldName="username"
          label="Usuario"
          rules={{ required: "El usuario es requerido" }}
          helpText="El usuario debe ser único"
        />

        <FormTextInput
          control={control}
          fieldName="email"
          label="Email"
          rules={{
            required: {
              value: true,
              message: "El email es requerido",
            },
            validate: {
              email: (value) => {
                // Hazlo con regex y ponle un mensaje de error
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? undefined
                  : "El email no es válido";
              },
            },
          }}
        />
        <FormPasswordInput
          control={control}
          fieldName="password"
          label="Contraseña"
          rules={{
            required: {
              value: true,
              message: "El email es requerido",
            },
          }}
        />

        <Button
          type="submit"
          label="Guardar cambios"
          className="w-full md:w-auto rounded-lg px-4 py-2"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        />
      </form>
      <div className="col-span-12 md:col-span-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-md"></div>
    </div>
  );
}
