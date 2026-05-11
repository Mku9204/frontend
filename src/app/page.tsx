'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Fade, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import SummaryCards from '../components/dashboard/SummaryCards';
import ChartCard from '../components/common/ChartCard';
import BarChart from '../components/charts/BarChart';
import Histogram from '../components/charts/Histogram';
import ErrorAlert from '../components/common/ErrorAlert';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import { formatNumber } from '../utils/formatters';
import { analyticsApi } from '../api/analyticsApi';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, categoryRes, topReviewedRes, discountRes, avgRatingRes] = await Promise.all([
          analyticsApi.getSummary(),
          analyticsApi.getProductsPerCategory(),
          analyticsApi.getTopReviewed(10),
          analyticsApi.getDiscountDist(),
          analyticsApi.getAvgRatingPerCategory(),
        ]);

        setData({
          summary: summaryRes.data,
          productsPerCategory: categoryRes.data,
          topReviewed: topReviewedRes.data,
          discountDist: discountRes.data,
          avgRatingPerCategory: avgRatingRes.data,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Fade in>
        <Box>
          <PageHeader />
          <ErrorAlert message={error} />
        </Box>
      </Fade>
    );
  }

  if (!data) {
    return (
      <Fade in>
        <Box>
          <PageHeader />
          <ErrorAlert message="No data available" />
        </Box>
      </Fade>
    );
  }

  const categoryData = data.productsPerCategory.map((item: any) => ({
    name: item.category,
    value: Number(item.count),
  }));

  const topReviewedData = data.topReviewed.map((item: any) => {
    const name = item.product_name || '';
    return {
      name: name.slice(0, 28) + (name.length > 28 ? '…' : ''),
      value: Number(item.rating_count),
    };
  });

  const avgRatingData = data.avgRatingPerCategory.map((item: any) => ({
    name: item.category,
    value: Number(item.avg_rating),
  }));

  return (
    <Fade in timeout={600}>
      <Box>
        <PageHeader />

        {/* KPI Cards */}
        <Box sx={{ mb: 4 }}>
          <SummaryCards data={data.summary} />
        </Box>

        {/* Charts Row 1 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard
              title="Products per Category"
              subheader="Distribution across top-level categories"
              accentColor="#7C3AED"
            >
              <BarChart
                data={categoryData}
                layout="vertical"
                valueKey="value"
                formatter={(val) => formatNumber(val)}
                height={340}
              />
            </ChartCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard
              title="Top Reviewed Products"
              subheader="Products with the most customer reviews"
              accentColor="#3B82F6"
            >
              <BarChart
                data={topReviewedData}
                layout="vertical"
                valueKey="value"
                formatter={(val) => formatNumber(val)}
                height={340}
              />
            </ChartCard>
          </Grid>
        </Grid>

        {/* Charts Row 2 */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard
              title="Discount Distribution"
              subheader="Number of products per discount bracket"
              accentColor="#10B981"
            >
              <Histogram data={data.discountDist} nameKey="bucket" valueKey="count" height={300} />
            </ChartCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard
              title="Category-wise Average Rating"
              subheader="Average star rating per top-level category"
              accentColor="#F59E0B"
            >
              <BarChart
                data={avgRatingData}
                layout="vertical"
                valueKey="value"
                formatter={(value) => `${value} ★`}
                height={340}
              />
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}

function PageHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <BarChartIcon sx={{ fontSize: 14, color: '#475569' }} />
        <Typography sx={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
          Analytics
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#334155' }}>/</Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
          Overview
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
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
            Dashboard Overview
          </Typography>
          <Typography sx={{ color: '#475569', fontSize: '0.875rem', fontWeight: 400 }}>
            Real-time product analytics and insights
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Chip
            icon={<TrendingUpIcon sx={{ fontSize: '14px !important' }} />}
            label="Live Data"
            size="small"
            sx={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              color: '#34D399',
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: '#34D399' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
