import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-bebas-neue'
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
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
