"use client"

import React from "react"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"

const ConditionalLink = () => {
	const [user] = useAuthState(auth)
	return (
		<>
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
		</>
	)
}

export default ConditionalLink
