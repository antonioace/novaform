export const CONTENT_STATIC = {
  result: {
    blocksList: [
      {
        id: "login-container",
        type: "CONTENEDOR",
        name: "Contenedor Login",
        children: [
          {
            id: "login-card",
            type: "CONTENEDOR",
            name: "Tarjeta de Login",
            children: [
              {
                id: "login-title",
                type: "TEXTO",
                name: "Título Login",
                description: "Inicia sesión en tu cuenta",
              },
              {
                id: "login-form",
                type: "CONTENEDOR_FORMULARIO",
                name: "Formulario Login",
                children: [
                  {
                    id: "login-email",
                    type: "INPUT_EMAIL",
                    name: "Campo Email",
                  },
                  {
                    id: "login-password",
                    type: "INPUT_PASSWORD",
                    name: "Campo Contraseña",
                  },
                  {
                    id: "login-submit",
                    type: "BOTON",
                    name: "Botón Iniciar Sesión",
                    description: "Iniciar Sesión",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    stylesList: [
      {
        blockId: "login-container",
        styles: {
          DESKTOP: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
          },
        },
      },
      {
        blockId: "login-card",
        styles: {
          DESKTOP: {
            width: "100%",
            maxWidth: "400px",
            padding: "32px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          },
        },
      },
      {
        blockId: "login-title",
        styles: {
          DESKTOP: {
            fontSize: "24px",
            textAlign: "center",
            color: "#333333",
            fontWeight: "bold",
          },
        },
      },
      {
        blockId: "login-form",
        styles: {
          DESKTOP: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          },
        },
      },
      {
        blockId: "login-email",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "login-password",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "login-submit",
        styles: {
          DESKTOP: {
            padding: "12px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          },
        },
      },
    ],
    configList: [
      { blockId: "login-container", config: {} },
      { blockId: "login-card", config: {} },
      { blockId: "login-title", config: {} },
      { blockId: "login-form", config: {} },
      { blockId: "login-email", config: {} },
      { blockId: "login-password", config: {} },
      { blockId: "login-submit", config: {} },
    ],
  },
};

export const REGISTER_CONTENT_STATIC = {
  result: {
    blocksList: [
      {
        id: "register-container",
        type: "CONTENEDOR",
        name: "Contenedor Registro",
        children: [
          {
            id: "register-card",
            type: "CONTENEDOR",
            name: "Tarjeta de Registro",
            children: [
              {
                id: "register-title",
                type: "TEXTO",
                name: "Título Registro",
                description: "Crea tu cuenta",
              },
              {
                id: "register-form",
                type: "CONTENEDOR_FORMULARIO",
                name: "Formulario Registro",
                children: [
                  {
                    id: "register-name",
                    type: "INPUT_TEXTO",
                    name: "Campo Nombre",
                  },
                  {
                    id: "register-email",
                    type: "INPUT_EMAIL",
                    name: "Campo Email",
                  },
                  {
                    id: "register-password",
                    type: "INPUT_PASSWORD",
                    name: "Campo Contraseña",
                  },
                  {
                    id: "register-confirm-password",
                    type: "INPUT_PASSWORD",
                    name: "Campo Confirmar Contraseña",
                  },
                  {
                    id: "register-submit",
                    type: "BOTON",
                    name: "Botón Registrar",
                    description: "Registrarse",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    stylesList: [
      {
        blockId: "register-container",
        styles: {
          DESKTOP: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#e9ecef",
          },
        },
      },
      {
        blockId: "register-card",
        styles: {
          DESKTOP: {
            width: "100%",
            maxWidth: "450px",
            padding: "36px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          },
        },
      },
      {
        blockId: "register-title",
        styles: {
          DESKTOP: {
            fontSize: "26px",
            textAlign: "center",
            color: "#343a40",
            fontWeight: "bold",
          },
        },
      },
      {
        blockId: "register-form",
        styles: {
          DESKTOP: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          },
        },
      },
      {
        blockId: "register-name",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "register-email",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "register-password",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "register-confirm-password",
        styles: {
          DESKTOP: {
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          },
        },
      },
      {
        blockId: "register-submit",
        styles: {
          DESKTOP: {
            padding: "12px",
            backgroundColor: "#28a745",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          },
        },
      },
    ],
    configList: [
      { blockId: "register-container", config: {} },
      { blockId: "register-card", config: {} },
      { blockId: "register-title", config: {} },
      { blockId: "register-form", config: {} },
      { blockId: "register-name", config: {} },
      { blockId: "register-email", config: {} },
      { blockId: "register-password", config: {} },
      { blockId: "register-confirm-password", config: {} },
      { blockId: "register-submit", config: {} },
    ],
  },
};
