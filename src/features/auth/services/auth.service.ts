import supabase from "@/config/supabase.config";
import { AuthError } from "@supabase/supabase-js";

import { IAuthResponse, RegisterData, LoginData } from "../types";
import { IResponseService } from "@/features/shared";
import { BackendService } from "@/features/shared/service/backend.service";

export class AuthService extends BackendService {
  private static instance: AuthService;

  private constructor() {
    super("auth");
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async register({
    email,
    password,
    username,
  }: RegisterData): Promise<IResponseService<IAuthResponse | null>> {
    console.log("🔄 Registrando nuevo usuario...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          confirmation_sent_at: Date.now(),
        },
      },
    });
    if (error) {
      console.error("❌ Error en el registro:", error);
      return {
        success: false,
        data: null,
        error:
          error instanceof AuthError ? error.message : "Error en el registro",
      };
    }

    console.log("✅ Usuario registrado exitosamente");
    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
      error: null,
    };
  }

  async login({
    email,
    password,
  }: LoginData): Promise<IResponseService<IAuthResponse | null>> {
    console.log("🔄 Iniciando sesión...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      return {
        success: false,
        data: null,
        error:
          error instanceof AuthError
            ? error.message
            : "Error en el inicio de sesión",
      };
    }

    console.log("✅ Sesión iniciada exitosamente");
    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
      error: null,
    };
  }

  async logout(): Promise<IResponseService<null>> {
    console.log("🔄 Cerrando sesión...");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Error al cerrar sesión:", error);
      return {
        success: false,
        data: null,
        error:
          error instanceof AuthError ? error.message : "Error al cerrar sesión",
      };
    }

    console.log("✅ Sesión cerrada exitosamente");
    return {
      success: true,
      data: null,
      error: null,
    };
  }

  async getCurrentUser(): Promise<IResponseService<IAuthResponse | null>> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("❌ Error al obtener usuario actual:", error);
      return {
        success: false,
        data: null,
        error:
          error instanceof AuthError
            ? error.message
            : "Error al obtener usuario actual",
      };
    }

    return {
      success: true,
      data: {
        user,
        session: null,
      },
      error: null,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkTokenCustomBackend(): Promise<IResponseService<any>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = await this.get<any>(`/checktoken`);
    return resp;
  }
}

export default AuthService.getInstance();
