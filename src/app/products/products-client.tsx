'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Grid, Typography, Chip, Fade } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FilterListIcon from '@mui/icons-material/FilterList';
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
    <Fade in timeout={600}>
      <Box>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <StorefrontIcon sx={{ fontSize: 14, color: '#475569' }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
              Catalogue
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#334155' }}>/</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
              Products
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', md: '1.875rem' },
                  background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5,
                }}
              >
                Product Catalogue
              </Typography>
              <Typography sx={{ color: '#475569', fontSize: '0.875rem', fontWeight: 400 }}>
                Browse, filter, and manage your product inventory
              </Typography>
            </Box>

            {pagination.total > 0 && (
              <Chip
                icon={<FilterListIcon sx={{ fontSize: '14px !important' }} />}
                label={`${pagination.total.toLocaleString()} total`}
                size="small"
                sx={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#93C5FD',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '& .MuiChip-icon': { color: '#93C5FD' },
                }}
              />
            )}
          </Box>
        </Box>

        {error && <ErrorAlert message={error} />}

        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Filters */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                background: 'rgba(13, 23, 40, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                mb: 2.5,
              }}
            >
              <ProductFilters
                categories={categories}
                filters={filters}
                onFilterChange={updateFilter}
                onReset={() => router.push('/products')}
              />
            </Box>

            {/* Product Table */}
            <ProductTable
              items={products}
              loading={loading}
              pagination={pagination}
              onPageChange={changePage}
              onRowsPerPageChange={changePageSize}
            />
          </Grid>

          {/* Sidebar: File Import */}
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
    </Fade>
  );
}
