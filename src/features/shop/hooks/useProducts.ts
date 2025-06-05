import { useState, useEffect } from 'react';
import { Product } from '../types/shop.types';
import { filterProducts } from '../mocks/mockData';

interface UseProductsProps {
  categoryId?: string | null;
  sortBy?: string;
  search?: string;
}

export const useProducts = ({ categoryId, sortBy, search }: UseProductsProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulamos una carga con un pequeño retraso
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      try {
        const filteredProducts = filterProducts({ categoryId, sortBy, search });
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 800); // Simulamos 800ms de carga
    
    return () => clearTimeout(timer);
  }, [categoryId, sortBy, search]);
  
  return { products, isLoading, error };
}; 