import React from 'react';
import ContainerLayoutAuth from '@/components/layout/container-layout.-auth';
import CartPage from '@/features/shop/pages/CartPage';

function ShoppingCartPage() {
  return <CartPage />;
}

ShoppingCartPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

export default ShoppingCartPage; 