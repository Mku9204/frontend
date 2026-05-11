'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Grid, Typography } from '@mui/material';
import ProductTable from '../../components/products/ProductTable';
import ProductFilters from '../../components/products/ProductFilters';
import FileImport from '../../components/products/FileImport';
import ErrorAlert from '../../components/common/ErrorAlert';
import ProductsSkeleton from '../../components/products/ProductsSkeleton';
import { productsApi } from '../../api/productsApi';

export function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const category = searchParams.get('category') || '';
  const minRating = searchParams.get('minRating') || '';
  const search = searchParams.get('search') || '';

  const filters = useMemo(
    () => ({
      search: search || '',
      category: category || '',
      minRating: minRating || '',
    }),
    [search, category, minRating],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsRes, categoriesRes] = await Promise.all([
          productsApi.getAll({
            page,
            limit,
            category: category || undefined,
            minRating: minRating || undefined,
            search: search || undefined,
          }),
          productsApi.getCategories(),
        ]);

        setProducts(productsRes.data);
        setPagination(productsRes.pagination);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, category, minRating, search]);

  const updateFilter = (field: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(field, value);
    } else {
      params.delete(field);
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/products?${params.toString()}`);
  };

  const changePageSize = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', String(newLimit));
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handleImportSuccess = () => {
    setImportLoading(false);
    setImportError(null);
    router.refresh();
  };

  if (loading && products.length === 0) {
    return <ProductsSkeleton />;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Outfit', fontWeight: 800, background: 'linear-gradient(to right, #A78BFA, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
        🗂 Product Catalogue
      </Typography>

      {error && <ErrorAlert message={error} />}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{mb:2}}>
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={updateFilter}
              onReset={() => router.push('/products')}
            />
          </Box>
          <ProductTable
            items={products}
            loading={loading}
            pagination={pagination}
            onPageChange={changePage}
            onRowsPerPageChange={changePageSize}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FileImport
            onUploadStart={() => setImportLoading(true)}
            onUploadError={(message) => {
              setImportLoading(false);
              setImportError(message);
            }}
            onUploadSuccess={handleImportSuccess}
            loading={importLoading}
            error={importError}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
