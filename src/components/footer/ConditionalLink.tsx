"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

const ConditionalLink = () => {
	const { currentUser } = useAuth()
	return (
		<>
			{currentUser ? (
				<Link
					href={"/dashboard"}
					className="hover:underline"
				>
					Dashboard
				</Link>
			) : (
				<Link
					href={"/login"}
					className="hover:underline"
				>
					Sign in
				</Link>
			)}
		</>
	)
}

export default ConditionalLink
