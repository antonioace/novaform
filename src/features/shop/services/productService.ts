import { Product } from '../types/shop.types';
import { filterProducts, findProductById } from '../mocks/mockData';

interface ProductQueryParams {
  categoryId?: string | null;
  sortBy?: string;
  search?: string;
}

export const getProducts = async (params: ProductQueryParams = {}): Promise<Product[]> => {
  // Simulamos una petición asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterProducts(params));
    }, 800);
  });
};

export const getProductById = async (id: string): Promise<Product> => {
  // Simulamos una petición asíncrona
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = findProductById(id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Producto no encontrado'));
      }
    }, 800);
  });
}; 