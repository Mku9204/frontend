import { Card, CardContent, CardHeader, Divider, SxProps, Theme } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';

interface ChartCardProps {
  title: string;
  subheader?: string;
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ChartCard = ({ title, subheader, loading, error, children, sx = {} }: ChartCardProps) => (
  <Card sx={{ height: '100%', ...sx }}>
    <CardHeader title={title} subheader={subheader} titleTypographyProps={{ variant: 'h6' }} />
    <Divider />
    <CardContent>
      {loading ? <LoadingSpinner /> : error ? <ErrorAlert message={error} /> : children}
    </CardContent>
  </Card>
);

export default ChartCard;
