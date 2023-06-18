import React from 'react'
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4">
        <p className="capitalize">&copy; {currentYear} website developed by <Link href={"https://danlevison.vercel.app/"} target="_blank" className="font-bold">Dan Levison</Link></p>
    </footer>
  )
}

export default Footer