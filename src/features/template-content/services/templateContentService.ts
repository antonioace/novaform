import { BackendService } from '@/features/shared/service/backend.service';
import { IResponseService } from '@/features/shared';
import { TemplateContent } from '../types/template-content.types';

export class TemplateContentService extends BackendService {
  constructor() {
    super('/template-content');
  }

  async createTemplate(data: { pageId: string; content: string }): Promise<IResponseService<TemplateContent | null>> {
    return this.post<TemplateContent, typeof data>('', data);
  }

  async findAllTemplates(): Promise<IResponseService<TemplateContent[] | null>> {
    return this.get<TemplateContent[]>('');
  }

  async findTemplatesByPageId(pageId: string): Promise<IResponseService<TemplateContent[] | null>> {
    return this.get<TemplateContent[]>(`/page/${pageId}`);
  }

  async findTemplateById(id: string): Promise<IResponseService<TemplateContent | null>> {
    return this.getById<TemplateContent>('', id);
  }

  async updateTemplate(id: string, data: { content?: string; status?: number }): Promise<IResponseService<TemplateContent | null>> {
    return this.update<TemplateContent, typeof data>(`/${id}`, data);
  }

  async removeTemplate(id: string): Promise<IResponseService<TemplateContent | null>> {
    return this.delete<TemplateContent>(`/${id}`);
  }
} 