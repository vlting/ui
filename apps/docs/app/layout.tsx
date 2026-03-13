import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
import '@vlting/stl/styles'
import './globals.css'

export const metadata: Metadata = {
  title: '@vlting/ui — Cross-platform design system',
  description:
    'Cross-platform design system built on @vlting/stl — 68+ components, 10 blocks, 6 chart types, 3200+ icons.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
