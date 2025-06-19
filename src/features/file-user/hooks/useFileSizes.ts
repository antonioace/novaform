import { useState, useCallback } from "react";
import { calculateFileSize } from "../utils";

interface FileSizeCache {
  [url: string]: string;
}

export const useFileSizes = () => {
  const [fileSizes, setFileSizes] = useState<FileSizeCache>({});
  const [loadingSizes, setLoadingSizes] = useState<Set<string>>(new Set());

  const getFileSize = useCallback(async (url: string): Promise<string> => {
    // Si ya tenemos el tamaño en cache, lo retornamos
    if (fileSizes[url]) {
      return fileSizes[url];
    }

    // Si ya está cargando, retornamos "Calculando..."
    if (loadingSizes.has(url)) {
      return "Calculando...";
    }

    // Marcamos como cargando
    setLoadingSizes(prev => new Set(prev).add(url));

    try {
      const size = await calculateFileSize(url);
      
      // Guardamos en cache
      setFileSizes(prev => ({
        ...prev,
        [url]: size
      }));

      // Removemos del estado de carga
      setLoadingSizes(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });

      return size;
    } catch {
      // En caso de error, removemos del estado de carga
      setLoadingSizes(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });

      // Guardamos "N/A" en cache para evitar reintentos
      setFileSizes(prev => ({
        ...prev,
        [url]: "N/A"
      }));

      return "N/A";
    }
  }, [fileSizes, loadingSizes]);

  const preloadFileSizes = useCallback(async (urls: string[]) => {
    const promises = urls.map(url => getFileSize(url));
    await Promise.allSettled(promises);
  }, [getFileSize]);

  const clearCache = useCallback(() => {
    setFileSizes({});
    setLoadingSizes(new Set());
  }, []);

  return {
    getFileSize,
    preloadFileSizes,
    clearCache,
    fileSizes,
    isLoading: (url: string) => loadingSizes.has(url),
  };
}; 