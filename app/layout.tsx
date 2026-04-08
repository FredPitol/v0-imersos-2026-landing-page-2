import type { Metadata, Viewport } from 'next'
import { Oswald, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Oswald - Bold display font for titles (Monument Extended alternative)
const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700']
});

// Raleway - Clean sans-serif for body/subtitles (Maxima Nouva alternative)
const raleway = Raleway({ 
  subsets: ["latin"],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Imersos 2026 — O Despertar de Uma Geração',
  description: 'Conferência Jovem Cristã Imersos 2026. Mais do que um evento, um convite para viver para Deus. Novembro de 2026.',
  keywords: ['conferência cristã', 'imersos 2026', 'jovens cristãos', 'conferência jovem', 'avivamento'],
  authors: [{ name: 'Conferência Imersos' }],
  openGraph: {
    title: 'Imersos 2026 — O Despertar de Uma Geração',
    description: 'Conferência Jovem Cristã. Novembro de 2026.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${oswald.variable} ${raleway.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
