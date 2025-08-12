import React, { useState } from "react";
import {
  FiEye,
  FiShare2,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiBarChart,
  FiUpload,
  FiSettings,
} from "react-icons/fi";
import NovaFormLogo from "../../shared/components/theme/NovaFormLogo";
import {
  CuestionarioProvider,
  useCuestionario,
} from "../context/CuestionarioContext";
import { AddContentModal, EditFormInfoModal } from "../components/modals";
import { ContentList, ContentEditor, ContentSettings } from "../components";
import { useRouter } from "next/router";
import DrawerThemeConfig from "../components/drawers/DrawerThemeConfig";

type TabType = "contenido" | "resultados";

const CuestionarioPageContent = () => {
  const [activeTab, setActiveTab] = useState<TabType>("contenido");
  const [drawerThemeConfigOpen, setDrawerThemeConfigOpen] = useState(false);
  const router = useRouter();
  const {
    form,
    addContentModalOpen,
    setAddContentModalOpen,
    editFormInfoModalOpen,
    setEditFormInfoModalOpen,
    addQuestion,
    deviceType,
    setDeviceType,
    updateFormTitle,
    updateFormDescription,
  } = useCuestionario();

  const handleAddElement = (type: string, title: string) => {
    // Crear una nueva pregunta con el tipo seleccionado
    addQuestion(type, title);
    setAddContentModalOpen(false);
  };

  const handleEditFormInfo = () => {
    setEditFormInfoModalOpen(true);
  };

  const handleSaveFormInfo = (title: string, description: string) => {
    updateFormTitle(title);
    updateFormDescription(description);
  };

  const returnToList = () => {
    router.push("/dashboard/cuestionario/list");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        {/* Top Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <NovaFormLogo
                estilos={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={returnToList}
              />
              <div 
                onClick={handleEditFormInfo}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                title="Clic para editar el nombre y descripción del formulario"
              >
                <h1
                  className="text-xl font-semibold"
                  style={{ color: "#021642" }}
                >
                  {form.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {form.description || "Clic para añadir una descripción"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Device Selector */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDeviceType("desktop")}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceType === "desktop"
                      ? "text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{
                    backgroundColor:
                      deviceType === "desktop" ? "#021642" : "transparent",
                  }}
                >
                  <FiMonitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceType("tablet")}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceType === "tablet"
                      ? "text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{
                    backgroundColor:
                      deviceType === "tablet" ? "#021642" : "transparent",
                  }}
                >
                  <FiTablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceType("mobile")}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceType === "mobile"
                      ? "text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={{
                    backgroundColor:
                      deviceType === "mobile" ? "#021642" : "transparent",
                  }}
                >
                  <FiSmartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiEye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiSettings className="w-5 h-5" />
                </button>
                <button
                  className="px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#021642" }}
                >
                  <FiUpload className="w-4 h-4 inline mr-2" />
                  Publicar
                </button>
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ml-4"
                style={{ backgroundColor: "#021642" }}
              >
                VB
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex items-center space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("contenido")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "contenido"
                  ? "border-current text-current"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              style={{
                color: activeTab === "contenido" ? "#021642" : undefined,
                borderColor: activeTab === "contenido" ? "#021642" : undefined,
              }}
            >
              Contenido
            </button>
            <button
              onClick={() => setActiveTab("resultados")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === "resultados"
                  ? "border-current text-current"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              style={{
                color: activeTab === "resultados" ? "#021642" : undefined,
                borderColor: activeTab === "resultados" ? "#021642" : undefined,
              }}
            >
              <FiBarChart className="w-4 h-4" />
              <span>Resultados</span>
            </button>
            <button
              onClick={() => setDrawerThemeConfigOpen(true)}
              className={`py-3 px-1  font-medium text-sm transition-colors flex items-center space-x-2`}
            >
              <FiShare2 className="w-4 h-4" />
              <span>Estilos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {activeTab === "contenido" && (
          <>
            <ContentList />
            <ContentEditor />
            <ContentSettings />
          </>
        )}

        {activeTab === "resultados" && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <FiBarChart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Resultados
              </h3>
              <p className="text-gray-600">
                Los resultados aparecerán aquí una vez que publiques tu
                formulario.
              </p>
            </div>
          </div>
        )}

  
      </div>

      {/* Add Content Modal */}
      <AddContentModal
        open={addContentModalOpen}
        onClose={() => setAddContentModalOpen(false)}
        onAddElement={handleAddElement}
      />

      {/* Edit Form Info Modal */}
      <EditFormInfoModal
        open={editFormInfoModalOpen}
        onClose={() => setEditFormInfoModalOpen(false)}
        title={form.title}
        description={form.description}
        onSave={handleSaveFormInfo}
      />

      <DrawerThemeConfig
        open={drawerThemeConfigOpen}
        onClose={() => setDrawerThemeConfigOpen(false)}
      />
    </div>
  );
};

const CuestionarioPage = () => {
  return (
    <CuestionarioProvider>
      <CuestionarioPageContent />
    </CuestionarioProvider>
  );
};

export default CuestionarioPage;
