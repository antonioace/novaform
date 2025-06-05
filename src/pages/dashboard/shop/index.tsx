import React from 'react';
import ShopPage from '@/features/shop/pages/ShopPage';
import ContainerLayoutAuth from '@/components/layout/container-layout.-auth';

function ShopIndexPage() {
  return <ShopPage />;
}

ShopIndexPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

export default ShopIndexPage; 