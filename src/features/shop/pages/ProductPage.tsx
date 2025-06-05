import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, Rating, Divider } from '@mui/material';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '../hooks/useCart';
import { getProductById } from '../services/productService';
import { Product } from '../types/shop.types';

interface ProductPageProps {
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  
  if (isLoading) {
    return <Container className="py-8"><Typography>Cargando...</Typography></Container>;
  }
  
  if (!product) {
    return <Container className="py-8"><Typography>Producto no encontrado</Typography></Container>;
  }
  
  return (
    <Container className="py-8">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="relative aspect-square">
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" className="mb-2">{product.name}</Typography>
          <Rating value={product.rating} readOnly className="mb-4" />
          
          <Typography variant="h5" className="mb-4 font-bold">
            ${product.price}
            {product.originalPrice && (
              <Typography component="span" className="line-through ml-2 text-gray-500">
                ${product.originalPrice}
              </Typography>
            )}
          </Typography>
          
          <Typography className="mb-6">{product.description}</Typography>
          
          <Button 
            variant="contained"
            startIcon={<FiShoppingCart />}
            onClick={() => addToCart(product, quantity)}
            disabled={!product.inStock}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage; 