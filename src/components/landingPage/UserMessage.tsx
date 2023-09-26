"use client"

import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"

const UserMessage = () => {
	const [user] = useAuthState(auth)
	const creationTime = user?.metadata.creationTime
	const lastSignInTime = user?.metadata.lastSignInTime

	return (
		<h3 className="text-2xl md:text-xl lg:text-2xl text-center pt-10 pb-2 text-secondaryTextClr">
			{!user
				? "Get Started!"
				: creationTime !== lastSignInTime
				? "Welcome Back!"
				: "Get Started!"}
		</h3>
	)
}

export default UserMessage
