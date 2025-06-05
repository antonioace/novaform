import React from 'react';
import { Card, CardContent, Typography, Box, Rating, Button } from '@mui/material';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { Product } from '../types/shop.types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
      <Box className="relative w-full pt-[100%]" onClick={() => onViewDetails(product.id)}>
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="cursor-pointer"
        />
      </Box>
      <CardContent className="flex flex-col flex-grow">
        <Typography variant="h6" className="font-medium line-clamp-2">
          {product.name}
        </Typography>
        
        <Box className="flex items-center my-2">
          <Rating value={product.rating} readOnly precision={0.5} size="small" />
        </Box>
        
        <Box className="flex items-center mt-auto">
          <Typography variant="h6" className="font-bold">
            ${product.price}
          </Typography>
          {product.originalPrice && (
            <Typography variant="body2" className="line-through ml-2 text-gray-500">
              ${product.originalPrice}
            </Typography>
          )}
        </Box>
        
        <Button 
          variant="contained" 
          className="mt-3 bg-primary"
          onClick={() => addToCart(product, 1)}
          disabled={!product.inStock}
          startIcon={<FiShoppingCart />}
        >
          {product.inStock ? 'Añadir al carrito' : 'Agotado'}
        </Button>
      </CardContent>
    </Card>
  );
}; 