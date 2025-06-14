import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from './providers';

import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Calendar',
    template: 'Calendar',
  },
  description: 'Calendar',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>
          <div className="relative flex flex-col h-screen bg-slate-400">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
