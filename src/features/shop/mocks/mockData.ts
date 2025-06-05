import { Product, Category } from '../types/shop.types';

// Datos mock de categorías
export const mockCategories: Category[] = [
  { id: 'electronics', name: 'Electrónicos', icon: 'laptop' },
  { id: 'clothing', name: 'Ropa', icon: 'shirt' },
  { id: 'books', name: 'Libros', icon: 'book' },
  { id: 'home', name: 'Hogar', icon: 'home' },
  { id: 'toys', name: 'Juguetes', icon: 'toys' }
];

// Datos mock de productos
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Última Generación',
    description: 'Potente laptop con procesador de última generación, 16GB RAM y 512GB SSD.',
    price: 999.99,
    originalPrice: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    category: 'electronics',
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone Premium',
    description: 'Smartphone con pantalla AMOLED, cámara de 108MP y batería de larga duración.',
    price: 799.99,
    originalPrice: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    category: 'electronics',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Auriculares Inalámbricos',
    description: 'Auriculares con cancelación de ruido y 30 horas de batería.',
    price: 149.99,
    originalPrice: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'electronics',
    rating: 4.2,
    inStock: true
  },
  {
    id: '4',
    name: 'Camiseta Premium',
    description: 'Camiseta de algodón 100% orgánico con diseño exclusivo.',
    price: 29.99,
    originalPrice: 200,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    category: 'clothing',
    rating: 4.0,
    inStock: true
  },
  {
    id: '5',
    name: 'Zapatillas Deportivas',
    description: 'Zapatillas ultraligeras para running con máxima amortiguación.',
    price: 89.99,
    originalPrice: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'clothing',
    rating: 4.7,
    inStock: true
  },
  {
    id: '6',
    name: 'Novela Bestseller',
    description: 'La novela más vendida del año, una historia impactante que no podrás dejar de leer.',
    price: 19.99,
    originalPrice: 200,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    category: 'books',
    rating: 4.9,
    inStock: true
  },
  {
    id: '7',
    name: 'Lámpara de Diseño',
    description: 'Elegante lámpara de diseño nórdico para decorar tu hogar.',
    price: 79.99,
    originalPrice: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    category: 'home',
    rating: 4.3,
    inStock: true
  },
  {
    id: '8',
    name: 'Juego de Mesa Familiar',
    description: 'Divertido juego para toda la familia, para 2-6 jugadores.',
    price: 34.99,
    originalPrice: 200,
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09',
    category: 'toys',
    rating: 4.6,
    inStock: false
  },
  {
    id: '9',
    name: 'Robot Educativo',
    description: 'Robot programable para que los niños aprendan robótica y programación.',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c',
    category: 'toys',
    rating: 4.4,
    inStock: true
  }
];

// Función para buscar un producto por ID
export const findProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

// Función para filtrar productos
export const filterProducts = (params: {
  categoryId?: string | null;
  sortBy?: string;
  search?: string;
}): Product[] => {
  const { categoryId, sortBy, search } = params;
  
  let filteredProducts = [...mockProducts];
  
  // Filtrar por categoría
  if (categoryId) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryId);
  }
  
  // Filtrar por búsqueda
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Ordenar productos
  if (sortBy) {
    switch (sortBy) {
      case 'newest':
        // Como no tenemos fecha de creación, mantenemos el orden actual
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return filteredProducts;
}; 