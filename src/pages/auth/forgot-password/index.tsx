import Link from "next/link";
import { AuthLayoutSupabase } from "@/components/layout/auth-layout.-supabase";
import { useForm } from "react-hook-form";
import { CustomFormTextInput } from "@/components/custom-form";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";
import { Button } from "@mui/material";
import { useForgotPassword } from "@/features/auth/hooks";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const { handleForgotPassword, forgotPasswordLoading } = useForgotPassword();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const success = await handleForgotPassword(data.email);
      if (success) {
        reset(); // Limpiar el formulario en caso de éxito
      }
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9fa]">
      <div className="w-full h-full ">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg">
          {/* Formulario */}
          <div className="w-full lg:w-1/2 bg-white p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div
                className="flex flex-row justify-start items-center w-[100%]
                max-w-[190px] h-[100px] bg-white
            
                "
              >
                <NovaFormLogo />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-4 text-[#0a1929]">
              Recuperar Contraseña
            </h1>

            <p className="text-center text-gray-600 mb-8">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormTextInput
                control={control}
                fieldName="email"
                type="email"
                placeholder="Correo electrónico"
                label="Correo Electrónico"
                required
                rules={{
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                }}
              />

              <Button
                type="submit"
                loading={forgotPasswordLoading}
                variant="contained"
                sx={{
                  padding: "10px 20px",
                }}
                className="w-full bg-[#0a1929] text-white py-3 rounded-md font-semibold hover:bg-[#1a365d] transition-colors"
              >
                {forgotPasswordLoading
                  ? "Enviando..."
                  : "Enviar Enlace de Recuperación"}
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

            <div className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-[#1a365d] hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>

          {/* Ilustración */}
          <div className="hidden lg:block lg:w-1/2 bg-[#0a1929] p-12 relative">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.svg"
                alt="Ilustración de recuperación de contraseña"
                className="max-w-full max-h-full opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayoutSupabase>{page}</AuthLayoutSupabase>;
};
