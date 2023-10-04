import React, { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"

const SignIn = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { login, googleLogin } = useAuth()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setError("")
			setLoading(true)
			await login(email, password)
			router.push("/dashboard")
		} catch (error) {
			setError("Failed to sign in"), error
		}

		setLoading(false)
	}

	const handleGoogleLogin = async () => {
		try {
			setError("")
			setLoading(true)
			const result = await googleLogin()
			const userDocRef = doc(db, "users", result.user.uid)
			const docSnap = await getDoc(userDocRef)
			if (docSnap.exists()) {
				router.push("/dashboard") // Redirect user to the dashboard
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
					<p>{error}</p>
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col mt-4"
			>
				<label htmlFor="email">Email</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="email"
					name="email"
					required
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
					className="border border-gray-300 p-2 rounded-md"
				/>
				<button
					className="w-full bg-buttonClr text-white p-2 mt-4 rounded-md"
					disabled={loading}
				>
					Log in
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
