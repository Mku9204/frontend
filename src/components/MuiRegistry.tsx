'use client';

/**
 * MuiRegistry — Emotion style registry for Next.js App Router + MUI.
 *
 * The App Router streams HTML before JS loads, so Emotion must flush its
 * collected styles into the <head> via `useServerInsertedHTML` to avoid a
 * hydration mismatch between the server-rendered <style> tags and what the
 * client expects to find in the DOM.
 *
 * Pattern from the official MUI + Next.js App Router guide:
 * https://mui.com/material-ui/integrations/nextjs/#app-router
 */

import { useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

export default function MuiRegistry({ children }: { children: React.ReactNode }) {
  // Create the cache once; store it in a ref so it survives re-renders.
  const cacheRef = useRef<EmotionCache | null>(null);
  const isInsertedRef = useRef<Set<string>>(new Set());

  if (cacheRef.current === null) {
    // `prepend: true` keeps MUI styles before any global styles so specificity
    // behaves predictably.
    const cache = createCache({ key: 'mui', prepend: true });
    // Override the insertion fn so we can capture which styles were inserted.
    cache.compat = true;
    cacheRef.current = cache;
  }

  // `useServerInsertedHTML` runs on the server after each render chunk to
  // inject collected styles before the HTML is flushed to the browser.
  useServerInsertedHTML(() => {
    const cache = cacheRef.current!;
    const inserted = isInsertedRef.current;
    const newStyles: string[] = [];

    for (const [id, style] of Object.entries(cache.inserted)) {
      if (!inserted.has(id)) {
        inserted.add(id);
        if (typeof style === 'string') {
          newStyles.push(style);
        }
      }
    }

    if (newStyles.length === 0) return null;

    return (
      <style
        key="mui-emotion-styles"
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{ __html: newStyles.join('') }}
      />
    );
  });

  return (
    <CacheProvider value={cacheRef.current}>
      {children}
    </CacheProvider>
  );
}
