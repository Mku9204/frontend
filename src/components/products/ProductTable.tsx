import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Card, Rating, Chip, Tooltip, Typography, Skeleton } from '@mui/material';
import { formatCurrency, formatNumber, formatPct, truncate, shortCategory } from '../../utils/formatters';

interface ProductTableProps {
  items?: any[];
  loading?: boolean;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
}

const COLUMNS = [
  { id: 'product_name', label: 'Product', width: '28%' },
  { id: 'category', label: 'Category', width: '18%' },
  { id: 'discounted_price', label: 'Price', width: '8%' },
  { id: 'actual_price', label: 'MRP', width: '8%' },
  { id: 'discount_pct', label: 'Discount', width: '8%' },
  { id: 'rating', label: 'Rating', width: '12%' },
  { id: 'rating_count', label: 'Reviews', width: '8%' },
  { id: 'review_title', label: 'Review Summary', width: '10%' },
];

const SkeletonRows = ({ count }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      {COLUMNS.map((column) => (
        <TableCell key={column.id}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  ));

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 0,
};

const ProductTable = ({ items = [], loading = false, pagination = DEFAULT_PAGINATION, onPageChange, onRowsPerPageChange }: ProductTableProps) => {

  return (
    <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell key={column.id} sx={{ width: column.width, fontWeight: 700, bgcolor: 'background.paper' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonRows count={10} />
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">No products found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Tooltip title={product.product_name} placement="top-start">
                      <Typography variant="body2">{truncate(product.product_name, 55)}</Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip label={shortCategory(product.category)} size="small" variant="outlined" sx={{ maxWidth: 150, fontSize: 11 }} />
                  </TableCell>
                  <TableCell>{formatCurrency(product.discounted_price)}</TableCell>
                  <TableCell sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>{formatCurrency(product.actual_price)}</TableCell>
                  <TableCell>
                    <Chip label={formatPct(product.discount_pct)} size="small" color="success" sx={{ fontWeight: 700 }} />
                  </TableCell>
                  <TableCell>
                    <Rating value={Number(product.rating)} precision={0.1} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">{product.rating}</Typography>
                  </TableCell>
                  <TableCell>{formatNumber(product.rating_count)}</TableCell>
                  <TableCell>
                    <Tooltip title={product.review_title || ''}>
                      <Typography variant="body2">{truncate(product.review_title, 40)}</Typography>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page - 1}
        rowsPerPage={pagination.limit}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(event) => onRowsPerPageChange(Number(event.target.value))}
      />
    </Card>
  );
};

export default ProductTable;
