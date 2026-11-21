import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'ZEBORA X MUSIC — Find your frequency', description: 'Discover music and play it through the official YouTube embedded player.', applicationName: 'ZEBORA X MUSIC' };
export const viewport: Viewport = { themeColor: '#09090d', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
