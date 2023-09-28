import React, { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function PrivateRoute(Component: any) {
	return function PrivaveRoute(props: any) {
		const { currentUser } = useAuth()
		useEffect(() => {
			if (!currentUser) {
				redirect("/login")
			}
		}, [currentUser])

		return <Component {...props} />
	}
}
