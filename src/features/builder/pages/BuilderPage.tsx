import React, { useEffect } from "react";
import Canvas from "../components/Canvas";
import Config from "../components/Config";
import CustomToolbar from "../components/CustomToolbar";
import { BuilderProvider } from "../context/BuilderContext";
import supabase from "@/config/supabase.config";
import { ReactFlowProvider } from "@xyflow/react";

function BuilderPage() {
  useEffect(() => {
    const probarSupabase = async () => {
      try {
        const { data, error } = await supabase.from("test").select("*");
        if (error) {
          console.error("Error al probar Supabase:", error.message);
        } else {
          console.log("Conexión exitosa a Supabase:", data);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
      }
    };

    probarSupabase();
  }, []);

  return (
    <BuilderProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full relative flex-1">
          <CustomToolbar />
          <div
            className="flex flex-grow overflow-hidden "
            style={{
              marginTop: "35px",
              marginLeft: "40px",
              maxHeight: "calc(100vh - 35px)",
            }}
          >
            <Canvas />
            <Config />
          </div>
        </div>
      </ReactFlowProvider>
    </BuilderProvider>
  );
}

export default BuilderPage;
