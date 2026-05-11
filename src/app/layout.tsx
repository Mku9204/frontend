import type { Metadata } from 'next';
import '../styles/globals.css';
import MuiRegistry from '../components/MuiRegistry';
import Providers from './providers';
import Sidebar from '../components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Analytics Pro — Product Intelligence',
  description: 'Premium product analytics dashboard for reviews, ratings, and category insights',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/*
         * MuiRegistry MUST wrap everything so it can collect and flush Emotion
         * styles into the <head> via useServerInsertedHTML before React hydrates.
         * This prevents the server/client HTML mismatch for MUI components.
         */}
        <MuiRegistry>
          <Providers>
            <Sidebar>{children}</Sidebar>
          </Providers>
        </MuiRegistry>
      </body>
    </html>
  );
}
