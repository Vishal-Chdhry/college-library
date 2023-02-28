import './globals.css';
import '@tremor/react/dist/esm/tremor.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
