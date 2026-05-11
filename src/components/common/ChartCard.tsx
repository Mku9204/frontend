import { Box, Typography, Divider, SxProps, Theme } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';

interface ChartCardProps {
  title: string;
  subheader?: string;
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  accentColor?: string;
}

const ChartCard = ({ title, subheader, loading, error, children, sx = {}, accentColor = '#7C3AED' }: ChartCardProps) => (
  <Box
    sx={{
      height: '100%',
      borderRadius: '18px',
      background: 'rgba(13, 23, 40, 0.75)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      position: 'relative',
      '&:hover': {
        borderColor: `rgba(${accentColor === '#7C3AED' ? '124, 58, 237' : '59, 130, 246'}, 0.2)`,
        boxShadow: `0 16px 50px rgba(0, 0, 0, 0.4)`,
        transform: 'translateY(-2px)',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        opacity: 0.6,
      },
      ...sx,
    }}
  >
    {/* Header */}
    <Box sx={{ px: 3, pt: 2.5, pb: 2 }}>
      <Typography
        sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#F1F5F9',
          mb: 0.25,
        }}
      >
        {title}
      </Typography>
      {subheader && (
        <Typography sx={{ fontSize: '0.78125rem', color: '#475569', fontWeight: 400 }}>
          {subheader}
        </Typography>
      )}
    </Box>

    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />

    {/* Content */}
    <Box sx={{ px: 2, pt: 2, pb: 2.5 }}>
      {loading ? <LoadingSpinner /> : error ? <ErrorAlert message={error} /> : children}
    </Box>
  </Box>
);

export default ChartCard;
