import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading…' }: LoadingSpinnerProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 220,
      gap: 2,
    }}
  >
    <Box sx={{ position: 'relative', width: 48, height: 48 }}>
      <CircularProgress
        size={48}
        thickness={2.5}
        sx={{
          color: '#7C3AED',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <CircularProgress
        size={36}
        thickness={2}
        sx={{
          color: 'rgba(59, 130, 246, 0.3)',
          position: 'absolute',
          top: 6,
          left: 6,
          animationDuration: '1.4s',
          animationDirection: 'reverse',
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
        }}
      />
    </Box>
    <Typography
      sx={{
        fontSize: '0.8125rem',
        color: '#475569',
        fontWeight: 500,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}
    >
      {message}
    </Typography>
  </Box>
);

export default LoadingSpinner;
