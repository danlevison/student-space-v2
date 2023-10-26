import React, { useEffect, useState } from "react"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/utils/firebase"
import { updateDoc, doc } from "firebase/firestore"

type AccountSettingsProps = {
	openAccountSettings: boolean
	setOpenAccountSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountSettings = ({
	openAccountSettings,
	setOpenAccountSettings
}: AccountSettingsProps) => {
	const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
	const [email, setEmail] = useState(currentUser?.email)
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setEmail(currentUser?.email)
		setPassword("")
		setPasswordConfirmation("")
		setError("")
		setMessage("")
		setLoading(false)
	}, [openAccountSettings, currentUser?.email])

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

		if (password !== passwordConfirmation) {
			return setError("Passwords do not match")
		}

		if (password.length && passwordConfirmation.length < 6) {
			return setError("Password should be at least 6 characters")
		}

		try {
			setError("")
			setMessage("")
			setLoading(true)
			if (email !== currentUser.email) {
				await updateUserEmail(email).then(() =>
					setMessage("Account information successfully updated")
				)
				const docRef = doc(db, "users", currentUser.uid)
				await updateDoc(docRef, {
					email: email
				})
			}
			if (password) {
				await updateUserPassword(password)
			}
			setMessage("Account information successfully updated")
		} catch (error) {
			setError("Failed to update account information"), error
		}

		setLoading(false)
	}

	return (
		<Dialog
			open={openAccountSettings}
			onClose={() => setOpenAccountSettings(false)}
			className={"relative z-50"}
		>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<Dialog.Panel className="flex flex-col w-full max-w-[550px] max-h-fit rounded-xl bg-modalBgClr border-2 border-modalBorderClr">
					<div className="p-5 flex justify-between items-center border-b-2 border-gray-300 z-10">
						<Dialog.Title className="font-bold text-xl">
							Account Settings
						</Dialog.Title>
						<button
							onClick={() => {
								setOpenAccountSettings(false)
							}}
						>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>
					{error && (
						<div className="bg-red-300 text-red-900 font-bold text-center p-3 rounded-md mt-5 mx-5">
							<p>{error}</p>
						</div>
					)}
					{message && (
						<div className="bg-green-200 text-green-900 font-bold text-center p-3 rounded-md mt-5 mx-5">
							<p>{message}</p>
						</div>
					)}
					<form
						onSubmit={handleSubmit}
						className="flex flex-col p-5"
						noValidate
					>
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							id="email"
							name="email"
							type="email"
							required
							className="border-2 border-gray-400 p-3 rounded-md text-[#5065a8]"
						/>
						<label
							htmlFor="password"
							className="mt-4"
						>
							New password
						</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							id="password"
							name="password"
							type="password"
							placeholder="Leave blank to remain unchanged"
							className="border-2 border-gray-400 p-3 rounded-md text-[#5065a8]"
						/>
						<label
							htmlFor="confirm-password"
							className="mt-4"
						>
							Confirm Password
						</label>
						<input
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							value={passwordConfirmation}
							id="confirm-password"
							name="confirm-password"
							type="password"
							placeholder="Leave blank to remain unchanged"
							className="border-2 border-gray-400 p-3 rounded-md text-[#5065a8]"
						/>
						<button
							disabled={loading}
							className="mt-4 text-sm font-bold bg-gray-100 hover:bg-green-200 rounded-2xl py-3 px-5 disabled:bg-gray-400 disabled:text-white"
						>
							{loading ? "Saving changes" : "Save changes"}
						</button>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default AccountSettings
