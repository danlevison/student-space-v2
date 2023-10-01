import React, { useState, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { AiFillCaretDown } from "react-icons/ai"
import { BiSolidUserDetail } from "react-icons/bi"
import { auth } from "@/utils/firebase"
import AccountSettings from "./AccountSettings"

const ProfileMenu = () => {
	const [openAccountSettings, setOpenAccountSettings] = useState(false)

	const handleAccountSettings = () => {
		setOpenAccountSettings(!openAccountSettings)
	}

	return (
		<>
			<Menu
				as="div"
				className="inline-block text-left"
			>
				<div>
					<Menu.Button
						className="flex items-center justify-center w-full bg-transparent"
						aria-label="Profile menu"
					>
						<BiSolidUserDetail
							size={30}
							className="text-[#5f5f7f]"
						/>
						<AiFillCaretDown
							className="ml-2 -mr-1 h-3 w-3 text-[#5f5f7f]"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="flex flex-col absolute right-3 mt-1 w-40 p-1 bg-white rounded-md divide-y divide-grey-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={handleAccountSettings}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr"
										} group flex w-full items-center rounded-md px-2 py-2`}
									>
										Profile settings
									</button>
								)}
							</Menu.Item>
						</div>
						<div className="p-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => {
											auth.signOut()
										}}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr"
										} group flex w-full items-center rounded-md px-2 py-2`}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>

			<AccountSettings
				openAccountSettings={openAccountSettings}
				setOpenAccountSettings={setOpenAccountSettings}
			/>
		</>
	)
}

export default ProfileMenu
