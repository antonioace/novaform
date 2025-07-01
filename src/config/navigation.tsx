import { AiFillHome, AiFillSetting, AiOutlineProject } from "react-icons/ai";
import { BsFileText } from "react-icons/bs";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  children?: NavigationItem[];
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

export const mainNavigation: NavigationSection[] = [
  {
    items: [
      {
        name: "Home",
        href: "/",
        icon: AiFillHome,
      },

      {
        name: "Configuraciones",
        href: "/dashboard/settings",
        icon: AiFillSetting,
      },

      {
        name: "Proyectos",
        href: "/dashboard/project",
        icon: AiOutlineProject,
      },

      {
        name: "Cuestionarios",
        href: "/dashboard/cuestionario/list",
        icon: BsFileText,
      },
    ],
  },
  /* {
    title: "Support",
    items: [
      {
        name: "Support",
        href: "/support",
        icon: AiOutlineQuestionCircle,
      },
      {
        name: "Changelog",
        href: "/changelog",
        icon: AiFillStar,
      },
    ],
  }, */
];
