import { Box, Grid, Skeleton } from '@mui/material';

const GlassSkeletonBox = ({ height }: { height: number }) => (
  <Box
    sx={{
      borderRadius: '18px',
      background: 'rgba(13, 23, 40, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      overflow: 'hidden',
      height,
      p: 2.5,
    }}
  >
    <Skeleton
      variant="rectangular"
      height="100%"
      sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)' }}
    />
  </Box>
);

export default function ProductsSkeleton() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={100} height={16} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="40%" height={38} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="25%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Filter bar skeleton */}
          <GlassSkeletonBox height={72} />

          <Box sx={{ mt: 2.5 }}>
            <GlassSkeletonBox height={580} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <GlassSkeletonBox height={340} />
        </Grid>
      </Grid>
    </Box>
  );
}
