import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { AuthLayoutSupabase } from "@/components/layout/auth-layout.-supabase";
import { FaGithub, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  CustomFormTextInput,
  CustomFormPasswordInput,
  CustomFormCheckbox,
} from "@/components/custom-form";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";
import { Button } from "@mui/material";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const { login, loginLoading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden  justify-center items-center">
          {/* Formulario */}
          <div className="w-full  md:w-1/2   bg-white p-8 md:p-12">
            <div className="flex items-center mb-5 justify-center">
              <div
                className="flex flex-row justify-start items-center w-[100%]
                max-w-[190px] h-[100px] bg-white
            
                "
              >
                <NovaFormLogo />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-5 text-[#0a1929]">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormTextInput
                control={control}
                fieldName="email"
                type="email"
                placeholder="Correo electrónico"
                required
                rules={{
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                }}
              />

              <CustomFormPasswordInput
                control={control}
                fieldName="password"
                placeholder="Contraseña"
                required
                rules={{
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                }}
              />

              <div className="flex items-center justify-between">
                <CustomFormCheckbox
                  control={control}
                  fieldName="remember"
                  label="Recordar contraseña"
                />
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#1a365d] hover:underline font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                loading={loginLoading}
                variant="contained"
                sx={{
                  padding: "10px 20px",
                }}
                className="w-full bg-[#0a1929] text-white py-3 rounded-md font-semibold hover:bg-[#1a365d] transition-colors"
              >
                {loginLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-[#1a365d] hover:underline font-medium"
              >
                Regístrate
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-center text-sm text-gray-500 mb-4">
                O inicia sesión con:
              </p>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#e2e8f0] transition-colors">
                  <FaGithub className="text-[#2d3748]" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#e2e8f0] transition-colors">
                  <FaTwitter className="text-[#1a365d]" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#e2e8f0] transition-colors">
                  <FaFacebook className="text-[#1a365d]" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#e2e8f0] transition-colors">
                  <FaGoogle className="text-[#2d3748]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayoutSupabase>{page}</AuthLayoutSupabase>;
};
