import type { Metadata } from 'next';
import '../styles/globals.css';
import Providers from './providers';
import Sidebar from '../components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Product Analytics',
  description: 'Analytics dashboard for product reviews and ratings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Sidebar>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
