import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import { ProductCard } from './ProductCard';
import { Product } from '../types/shop.types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onViewProduct: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  isLoading, 
  onViewProduct 
}) => {
  // Renderizar esqueletos durante la carga
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box className="h-full">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" height={36} sx={{ mt: 1 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  // No hay productos encontrados
  if (products.length === 0) {
    return <Box className="text-center py-8">No se encontraron productos</Box>;
  }

  // Renderizar productos
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard 
            product={product} 
            onViewDetails={onViewProduct} 
          />
        </Grid>
      ))}
    </Grid>
  );
}; 