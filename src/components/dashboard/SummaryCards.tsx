import { Grid, Card, Typography, Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CategoryIcon from '@mui/icons-material/Category';

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
  { label: 'Total Products', key: 'total_products', icon: <InventoryIcon fontSize="large" sx={{ color: '#A78BFA' }} /> },
  { label: 'Average Rating', key: 'avg_rating', icon: <StarRateIcon fontSize="large" sx={{ color: '#FCD34D' }} /> },
  { label: 'Average Discount', key: 'avg_discount_pct', icon: <LocalOfferIcon fontSize="large" sx={{ color: '#34D399' }} /> },
  { label: 'Total Reviews', key: 'total_reviews', icon: <RateReviewIcon fontSize="large" sx={{ color: '#60A5FA' }} /> },
  { label: 'Categories', key: 'total_categories', icon: <CategoryIcon fontSize="large" sx={{ color: '#F472B6' }} /> },
];

const SummaryCards = ({ data }: SummaryCardsProps) => (
  <Grid container spacing={3}>
    {metrics.map((metric) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={metric.key} sx={{ flexBasis: { lg: '20%' }, maxWidth: { lg: '20%' } }}>
        <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 3, 
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {metric.icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
              {metric.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'Outfit' }}>
              {data[metric.key as keyof typeof data] ?? '-'}
            </Typography>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default SummaryCards;
