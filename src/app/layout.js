"use client"

import './globals.css'
import { Nunito } from 'next/font/google'
import { DemoStudentDataProvider } from "../DemoStudentDataContext"

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
      <DemoStudentDataProvider>
        <body className={`${nunito.variable} font-nunito`}>
          {children}
        </body>
      </DemoStudentDataProvider>
    </html>
  )
}
