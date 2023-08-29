import './globals.css'
import { Nunito } from 'next/font/google'
import { StudentDataProvider } from "@/StudentDataContext"

const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: "--font-nunito"
})

export const metadata = {
  title: 'Student Space',
  description: 'A class management app for primary school teachers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StudentDataProvider>
        <body className={`${nunito.variable} font-nunito`}>
          {children}
        </body>
      </StudentDataProvider>
    </html>
  )
}
