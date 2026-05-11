import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 500, color: '#94A3B8' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 24px',
          transition: 'all 0.2s ease',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
      variants: [
        {
          props: { variant: 'standard', severity: 'error' },
          style: {
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#FCA5A5',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            '& .MuiAlert-icon': {
              color: '#F87171',
            },
          },
        },
      ],
    },
  },
});

export default theme;
