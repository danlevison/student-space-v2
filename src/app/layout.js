import './globals.css'
import { Inter } from 'next/font/google'
import Nav from "@/components/Nav"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Student Space',
  description: 'An app for primary school teachers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
