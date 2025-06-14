import Link from "next/link";
import { useForm } from "react-hook-form";
import { CustomFormPasswordInput } from "@/components/custom-form";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";
import { Button } from "@mui/material";
import { useUpdatePassword } from "@/features/auth/hooks";
import { SupabaseGuard } from "@/components/guards/SupabaseGuardContainer";

interface UpdatePasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function UpdatePasswordPage() {
  const { handleUpdatePassword, updatePasswordLoading } = useUpdatePassword();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit, watch, reset } = useForm<any>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      const success = await handleUpdatePassword(data.password);
      if (success) {
        reset(); // Limpiar el formulario en caso de éxito
      }
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9fa]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg">
          {/* Formulario */}
          <div className="w-full lg:w-1/2 bg-white p-8 md:p-12">
            <div className="flex items-center mb-8">
              <NovaFormLogo
                estilos={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </div>

            <h1 className="text-2xl font-bold text-center mb-4 text-[#0a1929]">
              Nueva Contraseña
            </h1>

            <p className="text-center text-gray-600 mb-8">
              Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil
              de recordar.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormPasswordInput
                control={control}
                fieldName="password"
                placeholder="Nueva contraseña"
                label="Nueva Contraseña"
                required
                rules={{
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
                    message:
                      "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número",
                  },
                }}
              />

              <CustomFormPasswordInput
                control={control}
                fieldName="confirmPassword"
                placeholder="Confirmar nueva contraseña"
                label="Confirmar Nueva Contraseña"
                required
                rules={{
                  required: "Confirma tu contraseña",
                  validate: (value: string) =>
                    value === passwordValue || "Las contraseñas no coinciden",
                }}
              />

              <Button
                type="submit"
                loading={updatePasswordLoading}
                variant="contained"
                sx={{
                  padding: "10px 20px",
                }}
                className="w-full bg-[#0a1929] text-white py-3 rounded-md font-semibold hover:bg-[#1a365d] transition-colors"
              >
                {updatePasswordLoading
                  ? "Actualizando..."
                  : "Actualizar Contraseña"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              ¿Recordaste tu contraseña?{" "}
              <Link
                href="/auth/login"
                className="text-[#1a365d] hover:underline font-medium"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>

          {/* Ilustración */}
          <div className="hidden lg:block lg:w-1/2 bg-[#0a1929] p-12 relative">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_1280.svg"
                alt="Ilustración de nueva contraseña"
                className="max-w-full max-h-full opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdatePasswordPage.getLayout = function getLayout(page: React.ReactNode) {
  return <SupabaseGuard>{page}</SupabaseGuard>;
};
