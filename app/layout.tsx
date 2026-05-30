import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SessionProvider } from '@/components/SessionProvider'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Trovio — Trova clienti su Reddit in tempo reale',
  description:
    'Trovio aiuta i freelancer a trovare clienti su Reddit. Cerca lead, genera messaggi personalizzati e inizia a guadagnare.',
  keywords: ['freelancer', 'lead generation', 'Reddit', 'clienti', 'outreach'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <Script
          src="https://embeds.iubenda.com/widgets/ec6c28fa-227e-447e-8a27-36b335386afd.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}