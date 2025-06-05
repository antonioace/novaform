import React from "react";
import ListElementsConfig from "./ListElementsConfig";
import { configuracionByElement } from "../utils/configuracion";
import CardElement from "./CardElemento";

function PanelConfigElements() {
  const [selectedOptionConfig, setSelectedOptionConfig] = React.useState<
    "elements" | "layouts"
  >("elements");
  const [search, setSearch] = React.useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const elementsList = configuracionByElement.flatMap(
    (element) => element.elements
  );
  const filteredElements = elementsList.filter((element) =>
    element.label.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        height: "100%",
        width: "var(--editor-width-tabpanel)",
        outline: "none",
        borderRight: "1px solid #eeeeee",
      }}
    >
      <div className="flex flex-col  grow">
        <div className="flex flex-col border-b border-b-[#EEEEEE] pb-2">
          <div className="flex flex-col p-2">
            {" "}
            <h1 className="text-sm font-semibold mb-3">Agregar bloques</h1>
            <div
              className="flex bg-[#fff] rounded-md mt-2 w-full h-7
        border border-[#eeeeee]
        p-[2px]
        "
            >
              <button
                className="flex-1 text-xs font-semibold rounded-md transition-colors duration-150 h-full px-3 focus:outline-none"
                style={{
                  background:
                    selectedOptionConfig === "elements"
                      ? "#111"
                      : "transparent",
                  color:
                    selectedOptionConfig === "elements" ? "#fff" : "#b0b0b0",
                  boxShadow: "none",
                }}
                onClick={() => setSelectedOptionConfig("elements")}
              >
                Elementos
              </button>
              <button
                className="flex-1 text-xs font-semibold rounded-md transition-colors duration-150 h-full px-3 focus:outline-none"
                style={{
                  background:
                    selectedOptionConfig === "layouts" ? "#111" : "transparent",
                  color:
                    selectedOptionConfig === "layouts" ? "#fff" : "#b0b0b0",
                  boxShadow: "none",
                }}
                onClick={() => setSelectedOptionConfig("layouts")}
              >
                Layouts
              </button>
            </div>
            <div className="relative mt-3 w-full">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#b0b0b0] text-sm pointer-events-none">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#b0b0b0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar elementos"
                className="w-full pl-7 pr-2 py-1.5 rounded-md bg-[#fff] border border-[#eeeeee] text-xs text-[#232323] placeholder-[#b0b0b0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 transition-all duration-150 shadow-sm"
                style={{ height: "28px" }}
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {selectedOptionConfig === "elements" &&
          search?.length === 0 &&
          configuracionByElement.map((element) => (
            <ListElementsConfig
              key={element.title}
              title={element.title}
              elements={element.elements}
            />
          ))}
        {selectedOptionConfig === "elements" && search?.length > 0 && (
          <div className="grid grid-cols-3 gap-3 p-2">
            {filteredElements.map((element) => (
              <CardElement
                key={element.label}
                icon={element.icon}
                label={element.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PanelConfigElements;
