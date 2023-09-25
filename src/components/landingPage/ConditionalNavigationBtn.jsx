"use client"

import React from "react"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"

const ConditionalNavigationBtn = () => {
	const [user] = useAuthState(auth)

	return (
		<>
			{user ? (
				<Link
					href={"/dashboard"}
					className="py-3 px-16 text-lg lg:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300"
				>
					Dashboard
				</Link>
			) : (
				<Link
					href={"/auth/login"}
					className="py-2 px-10 md:py-3 md:px-16 text-lg md:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300"
				>
					Sign in
				</Link>
			)}
		</>
	)
}

export default ConditionalNavigationBtn
