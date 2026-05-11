import { Box, Grid, Skeleton, Typography } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        <Skeleton width="40%" />
      </Typography>

      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Skeleton variant="rounded" height={120} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {[...Array(2)].map((_, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Skeleton variant="rounded" height={420} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {[...Array(2)].map((_, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Skeleton variant="rounded" height={420} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
