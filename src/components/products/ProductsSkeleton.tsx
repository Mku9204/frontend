import { Box, Grid, Skeleton, Typography } from '@mui/material';

export default function ProductsSkeleton() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        <Skeleton width="30%" />
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
            <Skeleton variant="rounded" width={200} height={56} />
            <Skeleton variant="rounded" width={200} height={56} />
            <Skeleton variant="rounded" width={100} height={56} />
          </Box>
          <Skeleton variant="rounded" height={600} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Skeleton variant="rounded" height={300} />
        </Grid>
      </Grid>
    </Box>
  );
}
