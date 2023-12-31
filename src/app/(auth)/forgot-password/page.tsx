import React from "react"
import Link from "next/link"
import Nav from "@/components/Nav/Nav"
import Scribble from "@/components/Scribble"
import PasswordReset from "./_components/PasswordReset"

const ForgotPassword = () => {
	const scribblesSvgs = [
		{
			src: "/assets/Scribbles/67.svg",
			className: "absolute top-32 left-10 w-[75px] md:w-[150px]"
		},
		{
			src: "/assets/Scribbles/37.svg",
			className:
				"absolute bottom-32 md:bottom-1 right-20 w-[75px] md:w-[100px] 2xl:w-[150px]"
		},
		{
			src: "/assets/Scribbles/66.svg",
			className: "absolute top-52 right-24 md:right-80 w-[50px] md:w-[100px]"
		},
		{
			src: "/assets/Scribbles/5.svg",
			className: "absolute bottom-24 left-2 w-[100px] md:w-[200px]"
		},
		{
			src: "/assets/Scribbles/55.svg",
			className:
				"absolute bottom-72 right-5 md:right-32 lg:right-56 w-[25px] md:w-[40px]"
		},
		{
			src: "/assets/Scribbles/39.svg",
			className:
				"absolute top-72 left-24 md:top-96 2xl:top-80 md:left-72 w-[30px] md:w-[40px]"
		},
		{
			src: "/assets/Scribbles/27.svg",
			className: "absolute top-10 right-5 w-[75px] md:w-[100px]"
		},
		{
			src: "/assets/Scribbles/9.svg",
			className:
				"hidden md:block absolute top-10 w-[100px] 2xl:w-[150px] rotate-180"
		},
		{
			src: "/assets/Scribbles/48.svg",
			className:
				"hidden md:block absolute bottom-4 2xl:bottom-10 w-[20px] 2xl:w-[25px] rotate-180"
		},
		{
			src: "/assets/Scribbles/34.svg",
			className:
				"hidden md:block absolute left-24 lg:left-80 xl:left-96 w-[25px] rotate-180"
		},
		{
			src: "/assets/Scribbles/28.svg",
			className:
				"hidden 2xl:block absolute right-24 lg:right-80 xl:right-96 w-[50px] rotate-180"
		}
	]

	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="py-24 px-10 min-h-screen flex flex-col items-center justify-center relative">
				<Scribble scribblesSvgs={scribblesSvgs} />
				<PasswordReset />
				<div className="mt-4 z-10">
					<p>
						Need an account?{" "}
						<span>
							<Link href={"/register"}>Sign up</Link>
						</span>
					</p>
				</div>
			</main>
		</>
	)
}

export default ForgotPassword
