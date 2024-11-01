import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spiritual - Prompt Enhancer',
  description: 'Transform your prompts into powerful, detailed instructions',
  keywords: ['AI prompt enhancer', 'prompt engineering', 'AI writing assistant', 'prompt optimization', 'Claude AI', 'AI tools'],
  authors: [{ name: 'dxd' }],
  publisher: 'Spiritual',
  icons: {
    icon: '/reaper.png',
    shortcut: '/reaper.png',
    apple: '/reaper.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spiritu.al',
    title: 'Spiritual - Prompt Enhancer',
    description: 'Transform your prompts into powerful, detailed instructions',
    siteName: 'Spiritual',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}