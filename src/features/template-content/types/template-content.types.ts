export interface TemplateContent {
  id: string;
  name: string;
  description: string;
  pageId: string;
  content: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateContentDto {
  name: string;
  description: string;
  pageId: string;
  content: string;
}

export interface UpdateTemplateContentDto {
  content?: string;
  status?: number;
} 