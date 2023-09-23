"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import LogoImg from "../../public/assets/student-space-logo.png"

const Logo = ({ closeNav }) => {
	return (
		<Link
			href={"/"}
			onClick={closeNav}
		>
			<Image
				src={LogoImg}
				alt="Student Space Logo"
				width={130}
				height={130}
				style={{
					objectFit: "cover"
				}}
			/>
		</Link>
	)
}

export default Logo
