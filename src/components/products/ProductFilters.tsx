import { Grid, TextField, MenuItem, Button, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';

interface ProductFiltersProps {
  categories: string[];
  filters: {
    search: string;
    category: string;
    minRating: string;
  };
  onFilterChange: (field: string, value: string) => void;
  onReset: () => void;
}

const RATINGS = [
  { value: '', label: 'Any Rating' },
  { value: '4', label: '4★ & above' },
  { value: '3', label: '3★ & above' },
  { value: '2', label: '2★ & above' },
];

const ProductFilters = ({ categories, filters, onFilterChange, onReset }: ProductFiltersProps) => (
  <Grid container spacing={2} sx={{ alignItems: 'center' }}>
    {/* Search */}
    <Grid size={{ xs: 12, sm: 5, md: 5 }}>
      <TextField
        id="product-search"
        fullWidth
        size="small"
        placeholder="Search products or reviews…"
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: '#475569' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'rgba(7, 12, 25, 0.6)',
            '& input::placeholder': { color: '#475569', opacity: 1 },
          },
        }}
      />
    </Grid>

    {/* Category */}
    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
      <TextField
        id="product-category"
        fullWidth
        select
        size="small"
        label="Category"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon fontSize="small" sx={{ color: '#475569' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ '& .MuiOutlinedInput-root': { background: 'rgba(7, 12, 25, 0.6)' } }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    {/* Min Rating */}
    <Grid size={{ xs: 6, sm: 3, md: 2 }}>
      <TextField
        id="product-min-rating"
        fullWidth
        select
        size="small"
        label="Min Rating"
        value={filters.minRating}
        onChange={(e) => onFilterChange('minRating', e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <StarIcon fontSize="small" sx={{ color: '#F59E0B', fontSize: 16 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ '& .MuiOutlinedInput-root': { background: 'rgba(7, 12, 25, 0.6)' } }}
      >
        {RATINGS.map((r) => (
          <MenuItem key={r.value} value={r.value}>
            {r.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    {/* Clear */}
    <Grid size={{ xs: 6, sm: 12, md: 1 }}>
      <Button
        id="product-filter-clear"
        variant="outlined"
        size="medium"
        onClick={onReset}
        fullWidth
        sx={{ whiteSpace: 'nowrap', minWidth: 'unset', px: 1.5 }}
      >
        Clear
      </Button>
    </Grid>
  </Grid>
);

export default ProductFilters;
