import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Next App',
  description: 'An intelligent content recommendation system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
