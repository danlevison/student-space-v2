import React, { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { FcGoogle } from "react-icons/fc"
import { AuthErrorCodes } from "firebase/auth"

const SignIn = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { login, googleLogin } = useAuth()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validation
		if (!email) {
			return setError("Email is required")
		}

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!emailRegex.test(email)) {
			return setError("Invalid email")
		}

		if (!password) {
			return setError("Password is required")
		}

		try {
			setError("")
			setLoading(true)
			await login(email, password)
		} catch (error) {
			if (error.code.includes("auth/user-not-found")) {
				setError("Incorrect email or password")
			} else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
				setError("Incorrect email or password")
			} else {
				setError("Failed to sign in"), error
			}
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleLogin = async () => {
		try {
			setError("")
			const result = await googleLogin()
			const userDocRef = doc(db, "users", result.user.uid)
			const docSnap = await getDoc(userDocRef)
			if (docSnap.exists()) {
				// If it exists, return early to avoid creating duplicate records.
				return
			}
			await setDoc(userDocRef, {
				email: result.user.email,
				createdAt: serverTimestamp()
			})
		} catch (error) {
			setError("Failed to sign in"), error
		}
	}

	return (
		<div className="w-full max-w-[450px] bg-[#fbe8de] p-5 rounded-lg shadow-xl z-10">
			<h1 className="text-3xl md:text-4xl font-bold text-center">Sign in</h1>
			{error && (
				<div className="bg-red-300 text-red-900 font-bold text-center p-3 rounded-md mt-2">
					<p data-testid="error">{error}</p>
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
					className="p-2 rounded-md border border-gray-300"
					data-testid="email-input"
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
					className="p-2 rounded-md border border-gray-300"
					data-testid="password-input"
				/>
				<button
					className="w-full bg-buttonClr text-white p-2 mt-4 rounded-md"
					disabled={loading}
				>
					{loading ? "Please wait" : "Log in"}
				</button>
			</form>
			<div className="text-center mt-4">
				<Link
					href={"/forgot-password"}
					className="underline text-blue-700"
				>
					Forgot Password?
				</Link>
			</div>
			<p className="text-center text-gray-600 py-5">Or sign in with </p>
			<button
				onClick={handleGoogleLogin}
				className="flex justify-center items-center gap-2 w-full text-primaryTextClr bg-gray-600 p-2 font-medium rounded-lg"
				disabled={loading}
			>
				<FcGoogle
					size={24}
					aria-label="/"
					role="presentation"
				/>
				Google
			</button>
		</div>
	)
}

export default SignIn
