export interface TemplateContent {
  id: string;
  name: string;
  description: string;
  pageId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateContentDto {
  name: string;
  description: string;
  pageId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export interface UpdateTemplateContentDto {
  content?: string;
  status?: number;
} 