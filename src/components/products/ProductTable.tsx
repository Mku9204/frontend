import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Box, Rating, Chip, Tooltip, Typography, Skeleton,
} from '@mui/material';
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
  { id: 'category', label: 'Category', width: '16%' },
  { id: 'discounted_price', label: 'Price', width: '8%' },
  { id: 'actual_price', label: 'MRP', width: '8%' },
  { id: 'discount_pct', label: 'Discount', width: '8%' },
  { id: 'rating', label: 'Rating', width: '14%' },
  { id: 'rating_count', label: 'Reviews', width: '8%' },
  { id: 'review_title', label: 'Review', width: '10%' },
];

const SkeletonRows = ({ count }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      {COLUMNS.map((column) => (
        <TableCell key={column.id} sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <Skeleton height={18} sx={{ borderRadius: 1 }} />
        </TableCell>
      ))}
    </TableRow>
  ));

const DEFAULT_PAGINATION = { total: 0, page: 1, limit: 20, totalPages: 0 };

const ProductTable = ({
  items = [],
  loading = false,
  pagination = DEFAULT_PAGINATION,
  onPageChange,
  onRowsPerPageChange,
}: ProductTableProps) => {
  return (
    <Box
      sx={{
        borderRadius: '18px',
        background: 'rgba(13, 23, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)',
          opacity: 0.6,
        },
      }}
    >
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small" id="products-table">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    width: column.width,
                    background: 'rgba(7, 12, 25, 0.95) !important',
                    backdropFilter: 'blur(20px)',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#475569',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06) !important',
                    py: 2,
                    px: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
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
                <TableCell
                  colSpan={COLUMNS.length}
                  align="center"
                  sx={{
                    py: 8,
                    borderBottom: 'none',
                    background: 'transparent',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '2rem' }}>📦</Typography>
                    <Typography sx={{ color: '#475569', fontWeight: 500, fontSize: '0.9375rem' }}>
                      No products found
                    </Typography>
                    <Typography sx={{ color: '#334155', fontSize: '0.8125rem' }}>
                      Try adjusting your filters
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              items.map((product, rowIdx) => (
                <TableRow
                  key={product.id ?? rowIdx}
                  hover
                  sx={{
                    '&:last-child td': { borderBottom: 'none' },
                    transition: 'background-color 0.15s ease',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell>
                    <Tooltip title={product.product_name} placement="top-start">
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: '#CBD5E1',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 220,
                        }}
                      >
                        {truncate(product.product_name, 55)}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={shortCategory(product.category)}
                      size="small"
                      variant="outlined"
                      sx={{
                        maxWidth: 140,
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        height: 22,
                        borderColor: 'rgba(124, 58, 237, 0.25)',
                        color: '#8B5CF6',
                        background: 'rgba(124, 58, 237, 0.08)',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9' }}>
                      {formatCurrency(product.discounted_price)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        textDecoration: 'line-through',
                        color: '#334155',
                      }}
                    >
                      {formatCurrency(product.actual_price)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={formatPct(product.discount_pct)}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        color: '#34D399',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Rating
                        value={Number(product.rating)}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ fontSize: '0.85rem' }}
                      />
                      <Typography sx={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
                        {product.rating}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 500 }}>
                      {formatNumber(product.rating_count)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip title={product.review_title || ''}>
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          color: '#64748B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 160,
                        }}
                      >
                        {truncate(product.review_title, 40)}
                      </Typography>
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
        sx={{
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
            fontSize: '0.8125rem',
            color: '#64748B',
          },
          '.MuiTablePagination-select': { fontSize: '0.8125rem', color: '#94A3B8' },
        }}
      />
    </Box>
  );
};

export default ProductTable;
