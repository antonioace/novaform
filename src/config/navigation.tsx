import {
  AiFillHome,
  AiFillSetting,
  AiOutlineBuild,
} from "react-icons/ai";

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
        name: "Builder",
        href: "/dashboard/builder",
        icon: AiOutlineBuild,
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
