import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types/shop.types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage', error);
      }
    }
  }, []);
  
  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Añadir producto al carrito
  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Actualizar cantidad si ya existe
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Añadir nuevo item
        return [...prevItems, { product, quantity }];
      }
    });
  }, []);
  
  // Actualizar cantidad de un producto
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }, []);
  
  // Eliminar producto del carrito
  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  }, []);
  
  // Vaciar carrito
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  // Calcular total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  
  return { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    totalPrice,
    itemCount: cartItems.length
  };
}; 