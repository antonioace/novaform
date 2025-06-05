import { useState, useEffect } from 'react';
import { Category } from '../types/shop.types';
import { mockCategories } from '../mocks/mockData';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulamos una carga con un pequeño retraso
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      try {
        setCategories(mockCategories);
        setError(null);
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 600); // Simulamos 600ms de carga
    
    return () => clearTimeout(timer);
  }, []);
  
  return { categories, isLoading, error };
}; 