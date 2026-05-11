import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#06B6D4',
      light: '#67E8F9',
      dark: '#0891B2',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#93C5FD',
      dark: '#2563EB',
    },
    background: {
      default: '#080C14',
      paper: '#0D1728',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      disabled: '#475569',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", "Roboto", "Helvetica", sans-serif',
    h1: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 },
    subtitle1: { fontWeight: 500, letterSpacing: '0.005em' },
    subtitle2: { fontWeight: 600, color: '#94A3B8', letterSpacing: '0.01em' },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', color: '#64748B' },
    button: { fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none' },
    overline: { fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.6875rem' },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.4)',
    '0 4px 6px rgba(0,0,0,0.3)',
    '0 8px 15px rgba(0,0,0,0.35)',
    '0 10px 25px rgba(0,0,0,0.4)',
    '0 12px 30px rgba(0,0,0,0.45)',
    '0 16px 35px rgba(0,0,0,0.5)',
    '0 20px 40px rgba(0,0,0,0.5)',
    '0 24px 48px rgba(0,0,0,0.55)',
    '0 28px 56px rgba(0,0,0,0.6)',
    '0 32px 64px rgba(0,0,0,0.6)',
    '0 36px 72px rgba(0,0,0,0.65)',
    '0 40px 80px rgba(0,0,0,0.65)',
    '0 44px 88px rgba(0,0,0,0.7)',
    '0 48px 96px rgba(0,0,0,0.7)',
    '0 52px 104px rgba(0,0,0,0.7)',
    '0 56px 112px rgba(0,0,0,0.7)',
    '0 60px 120px rgba(0,0,0,0.7)',
    '0 64px 128px rgba(0,0,0,0.7)',
    '0 68px 136px rgba(0,0,0,0.7)',
    '0 72px 144px rgba(0,0,0,0.7)',
    '0 76px 152px rgba(0,0,0,0.7)',
    '0 80px 160px rgba(0,0,0,0.7)',
    '0 84px 168px rgba(0,0,0,0.7)',
    '0 88px 176px rgba(0,0,0,0.7)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#7C3AED #0D1424',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': { backgroundColor: '#0D1424', width: 6 },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            background: 'linear-gradient(180deg, #7C3AED 0%, #3B82F6 100%)',
            minHeight: 24,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: 'rgba(13, 23, 40, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 18,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(124, 58, 237, 0.15)',
            borderColor: 'rgba(124, 58, 237, 0.2)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px 16px',
        },
        title: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#F1F5F9',
        },
        subheader: {
          fontSize: '0.8125rem',
          color: '#64748B',
          marginTop: 2,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '8px 20px 20px',
          '&:last-child': { paddingBottom: 20 },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600,
          borderRadius: 10,
          padding: '9px 22px',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
          letterSpacing: '0.01em',
        },
        contained: {
          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6D28D9 0%, #4338CA 100%)',
            boxShadow: '0 6px 25px rgba(124, 58, 237, 0.5)',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderColor: 'rgba(124, 58, 237, 0.4)',
          color: '#A78BFA',
          '&:hover': {
            borderColor: '#7C3AED',
            background: 'rgba(124, 58, 237, 0.08)',
          },
        },
        text: {
          '&:hover': { background: 'rgba(124, 58, 237, 0.08)' },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(13, 23, 40, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
        },
        outlined: {
          background: 'rgba(13, 23, 40, 0.5)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(15, 25, 50, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 10,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'border-color 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(124, 58, 237, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7C3AED',
              borderWidth: 1.5,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#A78BFA' },
          '& .MuiInputBase-input': { color: '#F1F5F9' },
          '& .MuiInputAdornment-root': { color: '#64748B' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: '#64748B' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          mx: 0.5,
          '&.Mui-selected': {
            background: 'rgba(124, 58, 237, 0.15)',
            color: '#A78BFA',
          },
          '&:hover': { background: 'rgba(255, 255, 255, 0.05)' },
          '&.Mui-selected:hover': { background: 'rgba(124, 58, 237, 0.2)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 26,
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: '#94A3B8',
          '&:hover': { background: 'rgba(255, 255, 255, 0.05)' },
        },
        colorSuccess: {
          background: 'rgba(16, 185, 129, 0.15)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          color: '#34D399',
        },
        colorPrimary: {
          background: 'rgba(124, 58, 237, 0.15)',
          borderColor: 'rgba(124, 58, 237, 0.3)',
          color: '#A78BFA',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar': { width: 5, height: 5 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(124, 58, 237, 0.4)',
            borderRadius: 4,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { borderCollapse: 'separate', borderSpacing: 0 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: 'rgba(7, 12, 25, 0.9)',
            backdropFilter: 'blur(20px)',
            color: '#64748B',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '14px 16px',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            transition: 'background-color 0.15s ease',
            '&:hover': { background: 'rgba(124, 58, 237, 0.05)' },
            '&:hover .MuiTableCell-root': { borderColor: 'rgba(124, 58, 237, 0.1)' },
          },
          '& .MuiTableCell-body': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            padding: '12px 16px',
            color: '#CBD5E1',
            fontSize: '0.8438rem',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#64748B',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(7, 12, 25, 0.6)',
        },
        selectIcon: { color: '#64748B' },
        actions: {
          '& .MuiIconButton-root': { color: '#64748B', '&:hover': { color: '#F1F5F9' } },
          '& .MuiIconButton-root.Mui-disabled': { color: '#334155' },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(255, 255, 255, 0.06)' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          // Standard error variant
          '&.MuiAlert-standardError': {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#FCA5A5',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            '& .MuiAlert-icon': { color: '#F87171' },
          },
          // Standard info variant
          '&.MuiAlert-standardInfo': {
            background: 'rgba(59, 130, 246, 0.1)',
            color: '#93C5FD',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            '& .MuiAlert-icon': { color: '#60A5FA' },
          },
          // Standard success variant
          '&.MuiAlert-standardSuccess': {
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#6EE7B7',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            '& .MuiAlert-icon': { color: '#34D399' },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          background: 'rgba(124, 58, 237, 0.15)',
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #7C3AED, #3B82F6)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          '&::after': {
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: {
          background: 'rgba(7, 12, 25, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          fontSize: '0.8125rem',
          borderRadius: 8,
          padding: '6px 12px',
          color: '#F1F5F9',
        },
        arrow: { color: 'rgba(7, 12, 25, 0.95)' },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: { color: '#F59E0B' },
        iconEmpty: { color: 'rgba(245, 158, 11, 0.2)' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': { background: 'rgba(124, 58, 237, 0.1)', color: '#A78BFA' },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
