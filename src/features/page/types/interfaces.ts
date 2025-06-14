import {
  Block,
  BlockConfig,
  BlockStyles,
  DISPOSITIVOS,
} from "@/features/builder/utils/interfaces";

export interface IPage {
  id: string;
  name: string;
  description: string;
  projectId: string;
  path: string;
  content: {
    configList?: BlockConfig[] | null;
    stylesList?: BlockStyles[] | null;
    blocksList?: Block[] | null;
    containerMainStyles?: {
      [key in DISPOSITIVOS]?: React.CSSProperties;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface IUpdatePageDto {
  id: string;
  content: {
    configList?: BlockConfig[] | null;
    stylesList?: BlockStyles[] | null;
    blocksList?: Block[] | null;
    containerMainStyles?: {
      [key in DISPOSITIVOS]?: React.CSSProperties;
    };
  };
}
