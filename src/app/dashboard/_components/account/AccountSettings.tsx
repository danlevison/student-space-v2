import React, { useEffect, useState } from "react"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import { useAuth } from "@/context/AuthContext"

type AccountSettingsProps = {
	openAccountSettings: boolean
	setOpenAccountSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountSettings = ({
	openAccountSettings,
	setOpenAccountSettings
}: AccountSettingsProps) => {
	const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setPassword("")
		setPasswordConfirmation("")
		setError("")
		setMessage("")
		setLoading(false)
	}, [openAccountSettings])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== passwordConfirmation) {
			return setError("Passwords do not match")
		}

		const promises: Promise<void>[] = []
		setError("")
		setMessage("")
		setLoading(true)
		if (email !== currentUser.email) {
			promises.push(updateUserEmail(email))
		}
		if (password) {
			promises.push(updateUserPassword(password))
		}

		Promise.all(promises)
			.then(() => {
				setMessage("Account information successfully updated")
			})
			.catch(() => {
				setError("Failed to update account information")
			})
			.finally(() => {
				setLoading(false)
			})
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
				<Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] max-h-fit rounded-xl bg-modalBgClr">
					<div className="flex justify-between items-center pb-2 z-10">
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
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							name="email"
							type="email"
							defaultValue={currentUser?.email}
							required
							className="border-2 border-gray-400 p-3 rounded-md"
						/>
						<label
							htmlFor="password"
							className="mt-4"
						>
							New password
						</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							id="password"
							name="password"
							type="password"
							placeholder="Leave blank to remain unchanged"
							className="border-2 border-gray-400 p-3 rounded-md"
						/>
						<label
							htmlFor="confirm-password"
							className="mt-4"
						>
							Confirm Password
						</label>
						<input
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							id="confirm-password"
							name="confirm-password"
							type="password"
							placeholder="Leave blank to remain unchanged"
							className="border-2 border-gray-400 p-3 rounded-md"
						/>
						<button className="mt-4 text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-3 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400">
							Save changes
						</button>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default AccountSettings
