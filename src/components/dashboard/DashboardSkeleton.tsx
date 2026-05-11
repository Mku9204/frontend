import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonCard = ({ height = 120 }: { height?: number }) => (
  <Box
    sx={{
      borderRadius: '18px',
      background: 'rgba(13, 23, 40, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      overflow: 'hidden',
      height,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), transparent)',
      },
    }}
  >
    <Box sx={{ p: 2.5, height: '100%' }}>
      <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)' }} />
    </Box>
  </Box>
);

export default function DashboardSkeleton() {
  return (
    <Box>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={120} height={16} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="45%" height={38} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="30%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {[...Array(5)].map((_, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
            key={i}
            sx={{ flexBasis: { lg: '20%' }, maxWidth: { lg: '20%' } }}
          >
            <SkeletonCard height={140} />
          </Grid>
        ))}
      </Grid>

      {/* Chart Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[...Array(2)].map((_, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <SkeletonCard height={400} />
          </Grid>
        ))}
      </Grid>

      {/* Chart Row 2 */}
      <Grid container spacing={3}>
        {[...Array(2)].map((_, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <SkeletonCard height={370} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
