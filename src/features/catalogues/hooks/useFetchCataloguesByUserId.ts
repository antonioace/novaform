import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import catalogueService from "@/features/catalogues/services/catalogue.service";
import { ICatalogueResponse } from "../types/catalogue.types";

export const useFetchCataloguesByUserId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [catalogues, setCatalogues] = useState<ICatalogueResponse[]>([]);
  const { showSuccess, showError } = useNotification();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);

  const fetchCataloguesByUserId = async (
    userId: string
  ): Promise<ICatalogueResponse[] | null> => {
    setIsLoading(true);
    try {
      const response = await catalogueService.getCataloguesByUserId(
        userId,
        page + 1,
        limit
      );

      if (response.success && response.data) {
        setCatalogues(response.data?.data || []);
        setTotal(response.data?.pagination?.total || 0);

        showSuccess("Catálogos cargados exitosamente");
        return response.data?.data || [];
      } else {
        showError(response.error || "Error al cargar los catálogos");
        setCatalogues([]);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchCataloguesByUserId,

    catalogues,
    isLoading,
    fetchCataloguesLoading: isLoading,
    total,
    page,
    limit,
    setPage,
    setLimit,
  };
};
