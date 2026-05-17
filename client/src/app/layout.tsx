import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'UR Fitness | Premium Gym Management',
  description: 'Transform your body, transform your life. Premium fitness club with state-of-the-art equipment and expert trainers.',
  keywords: 'gym, fitness, workout, membership, personal training',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NextTopLoader
          color="linear-gradient(to right, #7B2FFF, #FF2D55)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111118',
              color: '#E8E8F0',
              border: '1px solid rgba(123,47,255,0.3)',
              borderRadius: '12px',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: '500',
              letterSpacing: '0.02em',
            },
            success: {
              iconTheme: { primary: '#00C878', secondary: '#111118' },
            },
            error: {
              iconTheme: { primary: '#FF2D55', secondary: '#111118' },
            },
          }}
        />
      </body>
    </html>
  );
}