"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"
import Logo from "./Logo"
import { FiMenu } from "react-icons/fi"
import { CgClose } from "react-icons/cg"

type NavLinkProps = {
	href: string
	title: string
	className: string
}

const Nav = () => {
	const [user, loading] = useAuthState(auth)
	const [nav, setNav] = useState(false)

	const handleNav = () => {
		setNav(!nav)
	}

	const NavLink = ({ href, title, className = "" }: NavLinkProps) => {
		return (
			<Link
				onClick={() => setNav(false)}
				scroll={false}
				href={href}
				className={`${className}`}
			>
				{title}
			</Link>
		)
	}

	return (
		<nav className="fixed top-0 w-full h-[5.5rem] z-[10] px-8 bg-white border-b border-gray-300">
			<div className="flex justify-between items-center gap-4 w-full h-full px-2 2xl:px-16">
				<Logo />
				{/* Desktop */}
				<ul className="hidden md:flex items-center gap-16 font-bold text-[#5f5f7f]">
					<li>
						<NavLink
							href={"/"}
							title={"Home"}
							className="hover:text-blue-400"
						/>
					</li>
					<li>
						<NavLink
							href={"/#about"}
							title={"About"}
							className="hover:text-blue-400"
						/>
					</li>
					<li>
						{!user ? (
							<NavLink
								href={"/login"}
								title={"Sign in"}
								className="hover:text-blue-400"
							/>
						) : (
							<NavLink
								href={"/dashboard"}
								title={"Dashboard"}
								className="hover:text-blue-400"
							/>
						)}
					</li>
					{user && (
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
								<NavLink
									href={"/"}
									title={"Home"}
									className="hover:text-blue-400"
								/>
							</li>
							<li>
								<NavLink
									href={"/#about"}
									title={"About"}
									className="hover:text-blue-400"
								/>
							</li>
							{user ? (
								<li>
									<NavLink
										href={"/dashboard"}
										title={"Dashboard"}
										className="hover:text-blue-400"
									/>
								</li>
							) : (
								<li>
									<NavLink
										href={"/login"}
										title={"Sign in"}
										className="hover:text-blue-400"
									/>
								</li>
							)}
							{user && (
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
