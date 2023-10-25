"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { auth } from "../../utils/firebase"
import { useAuth } from "@/context/AuthContext"
import Logo from "../Logo"
import { FiMenu } from "react-icons/fi"
import { CgClose } from "react-icons/cg"

const Nav = () => {
	const { currentUser } = useAuth()
	const [nav, setNav] = useState(false)
	const [windowWidth, setWindowWidth] = useState(null)

	const handleNav = () => {
		setNav(!nav)
	}

	useEffect(() => {
		document.body.style.overflow = nav ? "hidden" : "unset"
		document.documentElement.style.overflow = nav ? "hidden" : "unset"

		return () => {
			document.body.style.overflow = "unset"
			document.documentElement.style.overflow = "unset"
		}
	}, [nav])

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			const newWidth = window.innerWidth
			setWindowWidth(newWidth)
			if (newWidth >= 768) {
				setNav(false)
			}
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<nav className="fixed top-0 w-full h-[5.5rem] px-8 bg-white border-b border-gray-300 z-50">
			<div className="flex justify-between items-center gap-4 w-full h-full px-2 2xl:px-16">
				<Logo />
				{/* Desktop */}
				<ul className="hidden md:flex items-center gap-16 font-bold text-[#5f5f7f]">
					<li>
						<Link
							href={"/"}
							className="hover:text-blue-400"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href={"/#about"}
							className="hover:text-blue-400"
						>
							About
						</Link>
					</li>
					<li>
						{!currentUser ? (
							<Link
								href={"/login"}
								className="hover:text-blue-400"
							>
								Sign in
							</Link>
						) : (
							<Link
								href={"/dashboard"}
								className="hover:text-blue-400"
							>
								Dashboard
							</Link>
						)}
					</li>
					{currentUser && (
						<button
							onClick={() => auth.signOut()}
							className="hover:text-blue-400"
						>
							Sign out
						</button>
					)}
				</ul>
				<button
					onClick={handleNav}
					className="md:hidden cursor-pointer"
				>
					<FiMenu
						size={30}
						className="text-[#5f5f7f]"
					/>
				</button>
			</div>

			{/* Mobile */}
			<div
				className={
					nav
						? "md:hidden fixed left-0 top-[5.5rem] w-full h-screen bg-black/70"
						: ""
				}
			>
				<div
					className={
						nav
							? "fixed left-0 top-0 w-full text-center sm:text-left h-screen bg-white p-10 ease-in-out duration-700"
							: "fixed left-[-100%] top-0 p-10 ease-in-out duration-700 h-screen"
					}
				>
					<div>
						<div className="flex justify-between items-center pb-24">
							<Logo closeNav={() => setNav(false)} />
							<button onClick={handleNav}>
								<CgClose
									size={30}
									className="text-[#5f5f7f]"
								/>
							</button>
						</div>

						<ul className="flex flex-col items-center gap-32 font-bold text-[#5f5f7f]">
							<li>
								<Link
									onClick={() => setNav(false)}
									href={"/"}
									className="hover:text-blue-400"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									onClick={() => setNav(false)}
									href={"/#about"}
									className="hover:text-blue-400"
								>
									About
								</Link>
							</li>
							{currentUser ? (
								<li>
									<Link
										onClick={() => setNav(false)}
										href={"/dashboard"}
										className="hover:text-blue-400"
									>
										Dashboard
									</Link>
								</li>
							) : (
								<li>
									<Link
										onClick={() => setNav(false)}
										href={"/login"}
										className="hover:text-blue-400"
									>
										Sign in
									</Link>
								</li>
							)}
							{currentUser && (
								<button
									onClick={() => {
										auth.signOut()
										setNav(false)
									}}
									className="hover:text-blue-400"
								>
									Sign out
								</button>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav
