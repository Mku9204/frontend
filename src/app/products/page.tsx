import { Suspense } from 'react';
import { ProductsClient } from './products-client';
import ProductsSkeleton from '../../components/products/ProductsSkeleton';

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsClient />
    </Suspense>
  );
}
