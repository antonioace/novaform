import { IPage, IUpdatePageDto } from "@/features/page/types";
import { BackendService } from "../../shared/service/backend.service";
import {
  ICreateProjectDto,
  IProjectByFiltersResponse,
  IProjectFilters,
  IProjectResponse,
} from "../types/interfaces";

class ProjectService extends BackendService {
  private static instance: ProjectService;

  private constructor() {
    super("project");
  }

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async getProjects() {
    return this.get<IProjectResponse[]>("/");
  }

  async getProjectById(id: string) {
    return this.get<IProjectResponse>(`/${id}`);
  }

  async createProject(project: ICreateProjectDto) {
    return this.post<IProjectResponse, ICreateProjectDto>("/", project);
  }

  async updateProject(id: string, project: Partial<IProjectResponse>) {
    return this.put<IProjectResponse, Partial<IProjectResponse>>(
      `/${id}`,
      project
    );
  }

  async deleteProject(id: string) {
    return this.delete(`/${id}`);
  }

  async getProjectByIdUser(page = 1, limit = 6) {
    return this.get<IProjectByFiltersResponse>(
      `/my-projects?page=${page}&limit=${limit}`
    );
  }
  async getPageByProjectFilters(filters: IProjectFilters) {
    return this.get<IPage>(`/pages`, {
      projectId: filters.projectId,
      name: filters.name,
    });
  }

  async updatePageByIdProject(page: IUpdatePageDto) {
    return this.put<IPage, IUpdatePageDto>(`/pages`, page);
  }
}

export const projectService = ProjectService.getInstance();
