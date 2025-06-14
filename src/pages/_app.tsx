import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Crear un tema oscuro personalizado
const darkTheme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
    button: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#000000",
          "&:hover": {
            backgroundColor: "#2c2c2c",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            transform: "translate(14px, -9px) scale(0.75)",
            background: "#fff",
            padding: "0 4px",
            color: "rgba(0, 0, 0, 0.7)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#000000",
          },
          "& .MuiInputLabel-root.MuiFormLabel-filled": {
            color: "#000000",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderWidth: "1px",
              borderColor: "#000000",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px",
            },
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "1px",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#000000",
          },
          "&.MuiFormLabel-filled": {
            color: "#000000",
          },
        },
      },
    },
  },
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
