import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShelfSpace: Less Clutter, More Reading',
  description: 'ShelfSpace: Elevate Your Reading - An innovative book tracking app that limits your to-read list for a more focused and enjoyable reading experience. Simplify and enrich your reading journey with ShelfSpace.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
