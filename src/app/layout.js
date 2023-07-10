import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: "--font-nunito"
})

export const metadata = {
  title: 'Student Space',
  description: 'An app for primary school teachers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-nunito`}>
        {children}
      </body>
    </html>
  )
}
