"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { AuthErrorCodes } from "firebase/auth"
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

		// Validation
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!emailRegex.test(email)) {
			return setError("Invalid email")
		}

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
			if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
				setError("Email address is already registered"), error
			} else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
				setError("Password should be at least 6 characters")
			} else {
				setError("Failed to create an account"), error
			}
		}

		setLoading(false)
	}

	return (
		<div className="w-full max-w-[450px] bg-[#fbe8de] p-5 rounded-lg shadow-xl z-10">
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
				noValidate
			>
				<label htmlFor="email">Email</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="email"
					name="email"
					required
					ref={emailRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<label
					htmlFor="password"
					className="mt-4"
				>
					Password
				</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					id="password"
					name="password"
					required
					ref={passwordRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<label
					htmlFor="confirm-password"
					className="mt-4"
				>
					Confirm Password
				</label>
				<input
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
					ref={passwordConfirmationRef}
					className="border border-gray-300 p-2 rounded-md"
				/>
				<button
					className="w-full bg-buttonClr text-white p-2 mt-4 rounded-md disabled:bg-gray-400"
					disabled={loading || !(email && password && passwordConfirmation)}
				>
					Sign Up
				</button>
			</form>
		</div>
	)
}

export default Signup
