import React  from "react";
import Canvas from "../components/Canvas";
import Config from "../components/Config";
import CustomToolbar from "../components/CustomToolbar";
import { BuilderProvider, useBuilder } from "../context/BuilderContext";
import { ReactFlowProvider } from "@xyflow/react";
import GlobalLoading from "@/features/shared/components/global-loading";
import { useRouter } from "next/router";

function BuilderPageContent() {
  const { loadingPage } = useBuilder();
  if (loadingPage) {
    return <GlobalLoading />;
  }
  return (
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
  );
}

function BuilderPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <BuilderProvider id={id as string}>
      <ReactFlowProvider>
        <BuilderPageContent />
      </ReactFlowProvider>
    </BuilderProvider>
  );
}

export default BuilderPage;
