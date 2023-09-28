"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

const PasswordReset = () => {
	const [email, setEmail] = useState("")
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const { resetPassword } = useAuth()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setMessage("")
			setError("")
			setLoading(true)
			await resetPassword(email)
			setMessage("A reset password link has been sent to your inbox")
		} catch (error) {
			setError("Failed to reset password"), error
		}

		setLoading(false)
	}

	return (
		<div className="w-full max-w-[450px] bg-[#fbe8de] p-5 rounded-lg shadow-xl z-50">
			<h1 className="text-3xl md:text-4xl font-bold text-center">
				Password Reset
			</h1>
			{error && (
				<div className="bg-red-300 text-red-900 font-bold text-center p-3 rounded-md mt-2">
					<p>{error}</p>
				</div>
			)}
			{message && (
				<div className="bg-green-200 text-green-900 font-bold text-center p-3 rounded-md mt-2">
					<p>{message}</p>
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col mt-4"
			>
				<label>Email</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
					className="border border-gray-300 p-2 rounded-md"
				/>
				<button
					className="w-full bg-buttonClr text-white p-2 mt-4 rounded-md"
					disabled={loading}
				>
					Reset password
				</button>
			</form>
			<div className="text-center mt-4">
				<Link href={"/login"}>Sign in</Link>
			</div>
		</div>
	)
}

export default PasswordReset
