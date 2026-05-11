'use client';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../theme/createEmotionCache';
import theme from '../theme/theme';

const clientSideEmotionCache = createEmotionCache();

interface ProvidersProps {
  readonly children: React.ReactNode;
  readonly cache?: EmotionCache;
}

function Providers({ children, cache = clientSideEmotionCache }: ProvidersProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Providers;
