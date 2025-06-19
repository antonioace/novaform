import React from "react";
import Canvas from "../components/Canvas";
import { BuilderProvider, useBuilder } from "../context/BuilderContext";
import { ReactFlowProvider } from "@xyflow/react";
import GlobalLoading from "@/features/shared/components/global-loading";
import { useRouter } from "next/router";
import ConfigElemento from "../components/ConfigElemento";
import CustomToolbarEditor from "../components/CustomToolbarEditor";

function BuilderPageContent() {
  const { loadingPage } = useBuilder();
  if (loadingPage) {
    return <GlobalLoading />;
  }
  return (
    <div className="flex flex-col h-full relative flex-1">
      <CustomToolbarEditor />
      <div
        className="flex flex-grow overflow-hidden "
        style={{
          marginTop: "35px",
          marginLeft: "40px",
          maxHeight: "calc(100vh - 35px)",
        }}
      >
        <Canvas />
        <ConfigElemento />
      </div>
    </div>
  );
}

export const BuilderPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return <GlobalLoading />;
  }
  const { id } = router?.query as { id: string };

  return (
    <BuilderProvider id={id as string}>
      <ReactFlowProvider>
        <BuilderPageContent />
      </ReactFlowProvider>
    </BuilderProvider>
  );
};
