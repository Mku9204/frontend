'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';

interface ProvidersProps {
  readonly children: React.ReactNode;
}

/**
 * Client-side providers: MUI ThemeProvider + CssBaseline.
 * The Emotion cache/registry is handled by MuiRegistry in layout.tsx.
 */
function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Providers;
