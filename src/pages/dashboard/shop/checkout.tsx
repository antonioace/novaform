import React from 'react';
import CheckoutPage from '@/features/shop/pages/CheckoutPage';
import ContainerLayoutAuth from '@/components/layout/container-layout.-auth';

function CheckoutProcessPage() {
  return <CheckoutPage />;
}

CheckoutProcessPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

export default CheckoutProcessPage; 