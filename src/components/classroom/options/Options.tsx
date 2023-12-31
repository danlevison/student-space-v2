"use client"

import { Fragment, useState, useContext } from "react"
import { Menu, Transition } from "@headlessui/react"
import StudentDataContext from "@/context/StudentDataContext"
import { AiFillCaretDown } from "react-icons/ai"
import { RxReset } from "react-icons/rx"
import { TiSortAlphabetically } from "react-icons/ti"
import { MdPerson, MdGroups } from "react-icons/md"
import EditStudents from "./editStudents/EditStudents"
import ResetStudentPoints from "./resetPoints/ResetStudentPoints"
import EditTables from "./editTables/EditTables"

const Options = () => {
	const [isEditStudentsModalOpen, setIsEditStudentsModalOpen] = useState(false)
	const [openResetStudentPointsModal, setOpenResetStudentPointsModal] =
		useState(false)
	const [isEditTablesModalOpen, setIsEditTablesModalOpen] = useState(false)
	const { studentData, setStudentData } = useContext(StudentDataContext)

	const handleEditStudentsModal = () => {
		setIsEditStudentsModalOpen(true)
	}

	const handleResetPointsModal = () => {
		setOpenResetStudentPointsModal(true)
	}

	const handleEditTablesModal = () => {
		setIsEditTablesModalOpen(true)
	}

	// TODO: Decide if I want to sort students by a-z in db as well.

	const sortStudentsAlphabetically = () => {
		setStudentData((prevStudentData) => {
			const sortedData = [...prevStudentData]
			sortedData.sort((a, b) => a.name.localeCompare(b.name))
			return sortedData
		})
	}

	return (
		<>
			<Menu
				as="div"
				className="inline-block text-left"
			>
				<div>
					<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						Options
						<AiFillCaretDown
							className="ml-2 -mr-1 h-5 w-5 text-iconClr"
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
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="p-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={handleEditStudentsModal}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<MdPerson
												className="mr-2 h-5 w-5 text-primaryTextClr"
												aria-hidden="true"
											/>
										) : (
											<MdPerson
												className="mr-2 h-5 w-5 text-iconClr"
												aria-hidden="true"
											/>
										)}
										Edit Students
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={handleEditTablesModal}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<MdGroups
												className="mr-2 h-5 w-5 text-primaryTextClr"
												aria-hidden="true"
											/>
										) : (
											<MdGroups
												className="mr-2 h-5 w-5 text-iconClr"
												aria-hidden="true"
											/>
										)}
										Edit Tables
									</button>
								)}
							</Menu.Item>
						</div>
						<div className="p-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={sortStudentsAlphabetically}
										disabled={studentData.length === 0}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr disabled:text-gray-400"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<TiSortAlphabetically
												className="mr-2 h-5 w-5 text-primaryTextClr"
												aria-hidden="true"
											/>
										) : (
											<TiSortAlphabetically
												className="mr-2 h-5 w-5 text-iconClr"
												aria-hidden="true"
											/>
										)}
										Order A-Z
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={handleResetPointsModal}
										disabled={studentData.length === 0}
										className={`${
											active
												? "bg-buttonClr text-primaryTextClr"
												: "text-secondaryTextClr disabled:text-gray-400"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<RxReset
												className="mr-2 h-5 w-5 text-primaryTextClr"
												aria-hidden="true"
											/>
										) : (
											<RxReset
												className="mr-2 h-5 w-5 text-iconClr"
												aria-hidden="true"
											/>
										)}
										Reset Points
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>

			{/* Edit Students Modal */}
			{isEditStudentsModalOpen && (
				<EditStudents
					isEditStudentsModalOpen={isEditStudentsModalOpen}
					setIsEditStudentsModalOpen={setIsEditStudentsModalOpen}
				/>
			)}
			{/* Reset Points Modal */}
			{openResetStudentPointsModal && (
				<ResetStudentPoints
					openResetStudentPointsModal={openResetStudentPointsModal}
					setOpenResetStudentPointsModal={setOpenResetStudentPointsModal}
				/>
			)}
			{/* Edit Tables Modal */}
			{isEditTablesModalOpen && (
				<EditTables
					isEditTablesModalOpen={isEditTablesModalOpen}
					setIsEditTablesModalOpen={setIsEditTablesModalOpen}
				/>
			)}
		</>
	)
}

export default Options
