import React, { useState } from 'react';
import { Grid, Container, Box, TextField, InputAdornment } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortFilter } from '../components/SortFilter';
import { useProducts } from '../hooks/useProducts';
import { useRouter } from 'next/router';
import { SortOption } from '../types/shop.types';

export const ShopPage: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { products, isLoading } = useProducts({
    categoryId: selectedCategory,
    sortBy: sortOption,
    search: searchTerm,
  });
  
  const handleViewProduct = (productId: string) => {
    router.push(`/shop/product/${productId}`);
  };
  
  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Productos</h1>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Box className="sticky top-24">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <Box className="mt-4">
              <SortFilter
                selectedOption={sortOption}
                onSelectOption={setSortOption}
              />
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onViewProduct={handleViewProduct}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopPage; 