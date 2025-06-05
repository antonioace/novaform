import React from "react";

import { AnimadasRutas } from "./AnimadasRutas";
import CustomTabText from "./CustomTabText";

interface TabContainerProps {
  options: { key: string; label: string }[];
  activeOption: string;
  onOptionChange: (key: string) => void;
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

function TabContainer({
  options = [],
  activeOption,
  onOptionChange,
  children,
  orientation = "vertical",
}: TabContainerProps) {
  const handleButtonClick = (key: string) => {
    onOptionChange(key);
  };
  const classNameVertical = "flex flex-row max-w-full flex-wrap gap-2 mb-8";
  const classNameHorizontal =
    "flex flex-col max-w-[300px] flex-wrap gap-5 mb-8 ";
  const classNameContainerVertical = "p-5 h-full flex flex-col";
  const classNameContainerHorizontal = "p-5 h-full flex flex-row gap-8";
  return (
    <>
      <AnimadasRutas>
        <div
          className={
            orientation === "vertical"
              ? classNameContainerVertical
              : classNameContainerHorizontal
          }
        >
          <div>
            <div
              className={
                orientation === "vertical"
                  ? classNameVertical
                  : classNameHorizontal
              }
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {options?.map((option) => (
                <CustomTabText
                  key={option.key}
                  text={option.label}
                  active={activeOption === option.key}
                  onClick={() => handleButtonClick(option.key)}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-7">
            <>{children}</>
          </div>
        </div>
      </AnimadasRutas>
    </>
  );
}

export default TabContainer;
