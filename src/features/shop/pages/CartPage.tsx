import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, IconButton, TextField, Divider } from '@mui/material';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useCart } from '../hooks/useCart';
import Image from 'next/image';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
  
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center py-12">
          <FiShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <Typography variant="h5">Tu carrito está vacío</Typography>
          <Typography className="mb-6">¡Agrega algunos productos a tu carrito!</Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/shop')}
          >
            Continuar comprando
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="mb-8 font-bold">
        Carrito de compras
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map(item => (
            <Card key={item.product.id} className="mb-4">
              <CardContent className="flex">
                <Box className="w-24 h-24 relative flex-shrink-0">
                  <Image 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                
                <Box className="ml-4 flex-grow">
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2" className="text-gray-500 mb-4">
                    ${item.product.price.toFixed(2)}
                  </Typography>
                  
                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center">
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            updateQuantity(item.product.id, value);
                          }
                        }}
                        InputProps={{
                          inputProps: { min: 1 }
                        }}
                        className="w-16"
                      />
                    </Box>
                    
                    <IconButton 
                      color="error" 
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
          
          <Box className="mt-4">
            <Button 
              variant="outlined" 
              onClick={() => router.push('/shop')}
            >
              Continuar comprando
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Resumen de la orden
              </Typography>
              
              <Box className="mb-4">
                {cartItems.map(item => (
                  <Box key={item.product.id} className="flex justify-between mb-2">
                    <Typography>
                      {item.product.name} x {item.quantity}
                    </Typography>
                    <Typography>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Divider className="mb-4" />
              
              <Box className="flex justify-between font-bold mb-4">
                <Typography>Total:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => router.push('/shop/checkout')}
              >
                Proceder al pago
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage; 