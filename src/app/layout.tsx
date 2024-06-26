import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import ContainerLayout from './LayoutContainer';

const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Github Search User',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ContainerLayout>
        <body className={space_mono.className}>{children}</body>
      </ContainerLayout>
    </html>
  );
}
