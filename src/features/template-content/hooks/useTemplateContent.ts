import { useState } from "react";
import { TemplateContentService } from "../services/templateContentService";
import {
  CreateTemplateContentDto,
  UpdateTemplateContentDto,
} from "../types/template-content.types";

const templateContentService = new TemplateContentService();

export const useCreateTemplateContent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const create = async (data: CreateTemplateContentDto) => {
    setLoading(true);
    const response = await templateContentService.createTemplate(data);
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { create, loading, success };
};

export const useGetTemplateContents = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const findAll = async () => {
    setLoading(true);
    const response = await templateContentService.findAllTemplates();
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { findAll, loading, success };
};

export const useGetTemplateContentByPageId = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const findByPageId = async (pageId: string) => {
    setLoading(true);
    const response = await templateContentService.findTemplatesByPageId(pageId);
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { findByPageId, loading, success };
};

export const useGetTemplateContent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const findOne = async (id: string) => {
    setLoading(true);
    const response = await templateContentService.findTemplateById(id);
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { findOne, loading, success };
};

export const useUpdateTemplateContent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = async (id: string, data: UpdateTemplateContentDto) => {
    setLoading(true);
    const response = await templateContentService.updateTemplate(id, data);
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { update, loading, success };
};

export const useRemoveTemplateContent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const remove = async (id: string) => {
    setLoading(true);
    const response = await templateContentService.removeTemplate(id);
    setSuccess(response.success);
    setLoading(false);
    return response;
  };

  return { remove, loading, success };
};
