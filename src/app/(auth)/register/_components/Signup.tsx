"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { useAuth } from "@/context/AuthContext"

const Signup = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmationRef = useRef()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { signup } = useAuth()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== passwordConfirmation) {
			return setError("Passwords do not match")
		}
		try {
			setError("")
			setLoading(true)
			const result = await signup(email, password)
			const userDocRef = doc(db, "users", result.user.uid)
			await setDoc(userDocRef, {
				email: result.user.email,
				createdAt: serverTimestamp()
			})
			router.push("/login")
		} catch (error) {
			setError("Failed to create an account"), error
		}

		setLoading(false)
	}

	return (
		<div className="w-full max-w-[450px] bg-[#fbe8de] p-5 rounded-lg shadow-xl z-50">
			<h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">
				Sign up
			</h1>
			{error && (
				<div className="bg-red-300 text-red-900 font-bold text-center p-3 rounded-md mt-2">
					<p>{error}</p>
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
					ref={emailRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<label className="mt-4">Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					required
					ref={passwordRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<label className="mt-4">Confirm Password</label>
				<input
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					type="password"
					required
					ref={passwordConfirmationRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<button
					className="w-full bg-buttonClr text-white p-2 mt-4 rounded-md"
					disabled={loading}
				>
					Sign Up
				</button>
			</form>
		</div>
	)
}

export default Signup
