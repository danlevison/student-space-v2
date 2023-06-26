import React from 'react'
import Link from "next/link"
import Image from "next/image"
import LogoImage from "../../public/assets/student-space-logo.png"

const Logo = () => {
  return (
    <Link href={"/"}>
        <Image src={LogoImage} alt="Student Space Logo" width={130} height={130} style={{
            objectFit: "cover"
        }} />
    </Link>
  )
}

export default Logo