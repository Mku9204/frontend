'use client';

import { useEffect, useState } from 'react';
import { Box,  Grid, Typography, Fade } from '@mui/material';
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
          <Typography variant="h4" sx={{ mb: 3, background: 'linear-gradient(to right, #A78BFA, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            📊 Product Analytics Dashboard
          </Typography>
          <ErrorAlert message={error} />
        </Box>
      </Fade>
    );
  }

  if (!data) {
    return (
      <Fade in>
        <Box>
          <Typography variant="h4" sx={{ mb: 3, background: 'linear-gradient(to right, #A78BFA, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            📊 Product Analytics Dashboard
          </Typography>
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
      name: name.slice(0, 30) + (name.length > 30 ? '…' : ''),
      value: Number(item.rating_count),
    };
  });

  const avgRatingData = data.avgRatingPerCategory.map((item: any) => ({
    name: item.category,
    value: Number(item.avg_rating),
  }));

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, background: 'linear-gradient(to right, #A78BFA, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
        📊 Product Analytics Dashboard
      </Typography>

      <SummaryCards data={data.summary} />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Products per Category"
            subheader="Distribution across top-level categories"
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
 
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Discount Distribution"
            subheader="Number of products per discount bracket"
          >
            <Histogram data={data.discountDist} nameKey="bucket" valueKey="count" height={300} />
          </ChartCard>
        </Grid>
 
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Category-wise Average Rating"
            subheader="Average star rating per top-level category"
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
  );
}
