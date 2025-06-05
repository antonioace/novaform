import React from 'react';
import { useRouter } from 'next/router';
import ProductPage from '@/features/shop/pages/ProductPage';
import ContainerLayoutAuth from '@/components/layout/container-layout.-auth';

function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  if (!id) {
    return <div>Cargando...</div>;
  }
  
  return <ProductPage productId={id as string} />;
}

ProductDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

export default ProductDetailPage; 