import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaGithub, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  CustomFormTextInput,
  CustomFormPasswordInput,
  CustomFormCheckbox,
} from "@/components/custom-form";
import { Button } from "@mui/material";
import { AuthLayoutSupabase } from "@/components/layout";
import { RegisterData } from "@/features/auth/types";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function Register() {
  const { register: registerUser, registerLoading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const dataRegister: RegisterData = {
        email: data.email,
        password: data.password,
        username: data.name,
      };
      await registerUser(dataRegister);
      reset({});
    } catch (error) {
      console.error("Error de registro:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9fa]">
      <div className="w-full h-full ">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg">
          {/* Formulario */}
          <div className="w-full lg:w-1/2 bg-white p-8 md:p-12">
            <div className="flex items-center mb-8 justify-center">
              <div
                className="flex flex-row justify-start items-center w-[100%]
                max-w-[190px] h-[100px] bg-white
            
                "
              >
                <NovaFormLogo />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-8 text-[#0a1929]">
              Registro
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormTextInput
                control={control}
                fieldName="username"
                label="Nombre de Usuario"
                placeholder="Ingrese su nombre de usuario"
                rules={{
                  required: "El nombre de usuario es requerido",
                  minLength: {
                    value: 3,
                    message:
                      "El nombre de usuario debe tener al menos 3 caracteres",
                  },
                  validate: (value) => {
                    if (value.includes(" ")) {
                      return "El nombre de usuario no puede contener espacios";
                    }
                    return true;
                  },
                }}
              />

              <CustomFormTextInput
                control={control}
                fieldName="email"
                label="Correo Electrónico"
                placeholder="Ingrese su correo electrónico"
                type="email"
                rules={{
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                }}
              />

              <CustomFormPasswordInput
                control={control}
                fieldName="password"
                label="Contraseña"
                placeholder="Ingrese su contraseña"
                rules={{
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                }}
              />

              <CustomFormCheckbox
                control={control}
                fieldName="terms"
                label={
                  <span>
                    Acepto los{" "}
                    <span className="text-[#1a365d] hover:underline cursor-pointer font-medium">
                      Términos de Servicio
                    </span>{" "}
                    y la{" "}
                    <span className="text-[#1a365d] hover:underline cursor-pointer font-medium">
                      Política de Privacidad
                    </span>
                  </span>
                }
                rules={{
                  required: "Debes aceptar los términos y condiciones",
                }}
              />

              <Button
                type="submit"
                variant="contained"
                loading={registerLoading}
                sx={{
                  padding: "10px 20px",
                }}
                className="w-full bg-[#0a1929] text-white  rounded-md font-semibold hover:bg-[#1a365d] transition-colors"
              >
                Crear Cuenta
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/login"
                className="text-[#1a365d] hover:underline font-medium"
              >
                Iniciar Sesión
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-center text-sm text-gray-500 mb-4">
                O Regístrate Con:
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

          {/* Ilustración */}
          <div className="hidden lg:block lg:w-1/2 bg-[#0a1929] p-12 relative">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2021/09/26/12/42/remote-work-6656979_1280.svg"
                alt="Ilustración de Registro"
                className="max-w-full max-h-full opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayoutSupabase>{page}</AuthLayoutSupabase>;
};
