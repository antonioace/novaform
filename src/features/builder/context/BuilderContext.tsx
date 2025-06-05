import React, { createContext, useContext, useState } from "react";

enum DISPOSITIVOS {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

export interface Block {
  id: string;
  type?: string;
  name?: string;
  description?: string;
}
interface BuilderContextType {
  dispositivoActual: DISPOSITIVOS;
  setDispositivoActual: (dispositivo: DISPOSITIVOS) => void;
  bloqueActual: Block | null;
  setBloqueActual: (bloque: Block) => void;
  bloques: Block[];
  setBloques: (bloques: Block[]) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dispositivoActual, setDispositivoActual] = useState<DISPOSITIVOS>(
    DISPOSITIVOS.DESKTOP
  );

  const [bloqueActual, setBloqueActual] = useState<Block | null>(null);
  const [bloques, setBloques] = useState<Block[]>([]);
  return (
    <BuilderContext.Provider
      value={{ dispositivoActual, setDispositivoActual, bloqueActual, setBloqueActual, bloques, setBloques }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder debe ser usado dentro de BuilderProvider");
  }
  return context;
};
