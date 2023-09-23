"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"
import footerBg from "../../public/assets/footer-bg.png"
import Logo from "../components/Logo"

const Footer = () => {
	const [user] = useAuthState(auth)
	const currentYear = new Date().getFullYear()

	return (
		<footer className="relative w-full h-[560px] bg-[#e3f7fc] pt-10 z-0">
			<div>
				<Image
					src={footerBg}
					alt="/"
					fill={false}
					className="absolute bottom-0 object-cover bg-[#e3f7fc] w-full"
				/>
			</div>

			<div className="flex justify-center items-center w-full z-[10]">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center w-full md:w-auto gap-10 md:gap-32 lg:gap-60 pt-16 px-6 z-[10]">
					<div className="h-full">
						<Logo />
						<p className="py-4">Crafted exclusively for primary teachers.</p>
					</div>

					<div className="mb-16 z-[10]">
						<h2 className="font-bold capitalize text-lg md:text-2xl mb-4 text-[#5f5f7f]">
							Useful links
						</h2>
						<ul className="flex flex-col gap-4 text-[#5f5f7f]">
							<li>
								<Link
									href={"/"}
									className="hover:underline"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href={"/#about"}
									className="hover:underline"
								>
									About
								</Link>
							</li>
							<li>
								{user ? (
									<Link
										href={"/dashboard"}
										className="hover:underline"
									>
										Dashboard
									</Link>
								) : (
									<Link
										href={"/auth/login"}
										className="hover:underline"
									>
										Sign in
									</Link>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div>
				<p className="text-xs sm:text-base sm:pb-1 px-4 w-full capitalize py-2 text-center absolute bottom-0 left-[50%] translate-x-[-50%]">
					&copy; {currentYear} all rights reserved | website by{" "}
					<a
						href={"https://danlevison.dev/"}
						target="_blank"
						className="font-bold"
					>
						Dan Levison <span className="sr-only">Opens in a new tab</span>
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer
