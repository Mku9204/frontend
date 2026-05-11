import { Grid, Typography, Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface SummaryCardsProps {
  data: {
    total_products?: number;
    avg_rating?: number;
    avg_discount_pct?: number;
    total_reviews?: number;
    total_categories?: number;
  };
}

const metrics = [
  {
    label: 'Total Products',
    key: 'total_products',
    icon: <InventoryIcon sx={{ fontSize: 22 }} />,
    color: '#7C3AED',
    bg: 'rgba(124, 58, 237, 0.15)',
    border: 'rgba(124, 58, 237, 0.25)',
    glow: 'rgba(124, 58, 237, 0.3)',
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'Average Rating',
    key: 'avg_rating',
    icon: <StarRateIcon sx={{ fontSize: 22 }} />,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.3)',
    trend: '+0.2',
    trendUp: true,
  },
  {
    label: 'Avg Discount',
    key: 'avg_discount_pct',
    icon: <LocalOfferIcon sx={{ fontSize: 22 }} />,
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.3)',
    trend: '+3%',
    trendUp: true,
  },
  {
    label: 'Total Reviews',
    key: 'total_reviews',
    icon: <RateReviewIcon sx={{ fontSize: 22 }} />,
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.25)',
    glow: 'rgba(59, 130, 246, 0.3)',
    trend: '+8%',
    trendUp: true,
  },
  {
    label: 'Categories',
    key: 'total_categories',
    icon: <CategoryIcon sx={{ fontSize: 22 }} />,
    color: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.12)',
    border: 'rgba(236, 72, 153, 0.25)',
    glow: 'rgba(236, 72, 153, 0.3)',
    trend: 'Stable',
    trendUp: null,
  },
];

const formatValue = (key: string, value: number | string | undefined) => {
  if (value === undefined || value === null) return '—';
  const n = Number(value);
  if (isNaN(n)) return String(value);
  if (key === 'avg_rating') return n.toFixed(2);
  if (key === 'avg_discount_pct') return `${n.toFixed(1)}%`;
  if (key === 'total_reviews' || key === 'total_products') {
    return n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `${(n / 1_000).toFixed(1)}K`
      : n.toLocaleString();
  }
  return n.toString();
};

const SummaryCards = ({ data }: SummaryCardsProps) => (
  <Grid container spacing={2.5}>
    {metrics.map((metric) => {
      const value = data[metric.key as keyof typeof data];
      return (
        <Grid
          size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
          key={metric.key}
          sx={{ flexBasis: { lg: '20%' }, maxWidth: { lg: '20%' } }}
        >
          <Box
            id={`metric-${metric.key}`}
            sx={{
              p: 2.5,
              borderRadius: '18px',
              background: 'rgba(13, 23, 40, 0.75)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${metric.border}`,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 12px 40px ${metric.glow}`,
                borderColor: metric.color,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
                opacity: 0.7,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: metric.bg,
                filter: 'blur(30px)',
                pointerEvents: 'none',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: metric.bg,
                border: `1px solid ${metric.border}`,
                color: metric.color,
                mb: 2,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {metric.icon}
            </Box>

            {/* Value */}
            <Typography
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: '1.625rem',
                lineHeight: 1,
                color: '#F1F5F9',
                mb: 0.5,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {formatValue(metric.key, value as number | undefined)}
            </Typography>

            {/* Label */}
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#64748B',
                mb: 1.5,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {metric.label}
            </Typography>

            {/* Trend */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.4,
                px: 1,
                py: 0.3,
                borderRadius: '6px',
                background: metric.trendUp === true
                  ? 'rgba(16, 185, 129, 0.12)'
                  : metric.trendUp === false
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(100, 116, 139, 0.12)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {metric.trendUp !== null && (
                <TrendingUpIcon
                  sx={{
                    fontSize: 13,
                    color: metric.trendUp ? '#34D399' : '#F87171',
                    transform: metric.trendUp ? 'none' : 'scaleY(-1)',
                  }}
                />
              )}
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: metric.trendUp === true
                    ? '#34D399'
                    : metric.trendUp === false
                      ? '#F87171'
                      : '#64748B',
                }}
              >
                {metric.trend}
              </Typography>
            </Box>
          </Box>
        </Grid>
      );
    })}
  </Grid>
);

export default SummaryCards;
