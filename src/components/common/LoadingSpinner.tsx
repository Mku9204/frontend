import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading…' }: LoadingSpinnerProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 2 }}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export default LoadingSpinner;
