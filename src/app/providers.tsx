'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';

interface ProvidersProps {
  readonly children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Providers;
