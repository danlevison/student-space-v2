"use client"

import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"
import { googleLogin } from "@/utils/auth"
import { FcGoogle } from "react-icons/fc"
import Nav from "@/components/Nav"
import Preloader from "@/components/Preloader"
import Scribble from "@/components/Scribble"
import { useRouter } from "next/navigation"

const Login = () => {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()
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
			className: "absolute top-60 right-16 md:right-80 w-[50px] md:w-[100px]"
		},
		{
			src: "/assets/Scribbles/5.svg",
			className: "absolute bottom-16 left-2 w-[150px] md:w-[200px]"
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
				"hidden md:block absolute bottom-4 2xl:bottom-32 w-[20px] 2xl:w-[25px] rotate-180"
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

	const handleGoogleLogin = () => {
		googleLogin(router)
	}

	useEffect(() => {
		if (user) {
			router.push("/dashboard")
		}
	}, [user, router])

	if (loading) return <Preloader />

	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="py-16 px-10 min-h-screen flex flex-col items-center justify-center relative">
				<Scribble scribblesSvgs={scribblesSvgs} />
				<div className="text-center shadow-xl text-secondaryTextClr mt-24 py-8 px-5 sm:p-10 rounded-lg bg-[#fbe8de] z-0">
					<h1 className="text-3xl md:text-4xl font-bold">Sign in</h1>
					<div className="py-4">
						<h3 className="md:text-lg">Sign in with your Google account</h3>
					</div>
					<div>
						<button
							onClick={handleGoogleLogin}
							className="flex justify-center items-center gap-4 w-full text-primaryTextClr bg-gray-600 p-4 font-medium rounded-lg"
						>
							<FcGoogle
								size={30}
								aria-label="/"
								role="presentation"
							/>
							Sign in with Google
						</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default Login