import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/lib/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sagar Vashist — Full Stack Developer',
  description: 'Full Stack Web Developer — React, Next.js, Node.js, MongoDB.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: 'var(--card)', color: 'var(--text)',
              border: '1px solid var(--border)', borderRadius: '14px', fontSize: '13px'
            }
          }} />
        </ThemeProvider>
      </body>
    </html>
  )
}
