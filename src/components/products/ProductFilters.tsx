import { Grid, TextField, MenuItem, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
  { value: '', label: 'Any' },
  { value: '4', label: '4★ & above' },
  { value: '3', label: '3★ & above' },
  { value: '2', label: '2★ & above' },
];

const ProductFilters = ({ categories, filters, onFilterChange, onReset }: ProductFiltersProps) => (
  <Grid container spacing={2} sx={{ alignItems: 'center' }}>
    <Grid size={{ xs: 12, sm: 5, md: 4 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search product or review…"
        value={filters.search}
        onChange={(event) => onFilterChange('search', event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>

    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
      <TextField
        fullWidth
        select
        size="small"
        label="Category"
        value={filters.category}
        onChange={(event) => onFilterChange('category', event.target.value)}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid size={{ xs: 12, sm: 3, md: 2 }}>
      <TextField
        fullWidth
        select
        size="small"
        label="Min Rating"
        value={filters.minRating}
        onChange={(event) => onFilterChange('minRating', event.target.value)}
      >
        {RATINGS.map((rating) => (
          <MenuItem key={rating.value} value={rating.value}>
            {rating.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid size={{ xs: 12 }}>
      <Button variant="outlined" size="medium" startIcon={<ClearIcon />} onClick={onReset}>
        Clear
      </Button>
    </Grid>
  </Grid>
);

export default ProductFilters;
