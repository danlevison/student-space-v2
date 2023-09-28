import React from "react"
import { useAuth } from "@/context/AuthContext"

const ConditionalHeading = () => {
	const { currentUser } = useAuth()
	const creationTime = currentUser?.metadata.creationTime
	const lastSignInTime = currentUser?.metadata.lastSignInTime
	return (
		<h1 className="text-5xl sm:text-7xl font-cabinSketch font-[700] mb-24">
			{creationTime === lastSignInTime ? "Welcome!" : "Welcome Back!"}
		</h1>
	)
}

export default ConditionalHeading
