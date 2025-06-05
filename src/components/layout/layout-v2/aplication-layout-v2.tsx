import React from "react";
import Sidebar from "./Sidebar";
import { NavigationSection } from "@/config/navigation";
import NovaFormLogo from "@/features/shared/components/theme/NovaFormLogo";

function AplicationLayoutV2({
  children,
  mainNavigation = [],
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  mainNavigation: NavigationSection[];
}) {
  // Determinar las clases adicionales basadas en el estado de 'sidebarStore.open'

  const [openSidebar, setOpenSidebar] = React.useState(false);
  const additionalClasses = openSidebar
    ? ""
    : " -ml-[220px]  sm:-ml-[220px] md:-ml-[220px]  xl:-ml-[220px]    xl:mr-5  ";

  return (
    <div className="w-[100%] h-[100%] bg-[#fff] pt-[64.8px] grow flex flex-col   ">
      {/*     <SoporteComponente /> */}
      <Sidebar
        items={mainNavigation}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        logo={
          <div
            className="flex flex-row justify-start items-center w-[100%]
                max-w-[240px] h-[100px] bg-white
            
                "
          >
            <NovaFormLogo />
          </div>
        }
      >
        <div
          className={`bg-white rounded-2xl w-[100%] max-h-[100%] overflow-y-auto flex flex-col grow  ${additionalClasses}  transition-all duration-500 ease-in-out `}
        >
          {children}
        </div>
      </Sidebar>
    </div>
  );
}
export default AplicationLayoutV2;
