import React from "react"
import Link from "next/link"
import paperBg from "@/../public/assets/paperbg.png"
import notFoundImg from "@/../public/assets/404.png"
import Image from "next/image"

const NotFound = () => {
	return (
		<main
			className="relative flex flex-col justify-center items-center min-h-screen text-center px-8 bg-[#fbf8de]"
			style={{
				backgroundImage: `url(${paperBg.src})`,
				backgroundSize: "auto"
			}}
		>
			<Image
				src={notFoundImg}
				alt="Illustration of a snapped penicl with a 404 error code"
				width={0}
				height={0}
				priority
				style={{ objectFit: "cover" }}
				className="w-[300px] mt-[-100px] select-none"
			/>
			<h1 className="text-5xl md:text-7xl font-bold font-cabinSketch z-10 my-6">
				Oops, I think you&apos;ve got the wrong class!
			</h1>
			<Link
				href={"/"}
				className="text-[#5065A8] text-lg md:text-3xl font-bold underline z-10"
			>
				Let&apos;s get you back on track! 😊
			</Link>
		</main>
	)
}

export default NotFound
