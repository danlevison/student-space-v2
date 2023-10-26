import React, { useContext, useState, useRef } from "react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"
import { toast } from "react-toastify"
import { updateStudentDataInClass } from "@/utils/updateStudentData"

type AddTableProps = {
	isAddTableModalOpen: boolean
	setIsAddTableModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTable = ({
	isAddTableModalOpen,
	setIsAddTableModalOpen
}: AddTableProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [alertMessage, setAlertMessage] = useState("")
	const [tableName, setTableName] = useState("")
	const tableInputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.value
		setTableName(inputName)
	}

	const toggleSelectedStudent = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const studentName = e.target.name

			// Toggles the selected property value
			const updatedStudentData = studentData.map((student) => {
				if (student.name === studentName) {
					return {
						...student,
						tableData: {
							...student.tableData,
							selected: !student.tableData?.selected || false
						}
					}
				}
				return student
			})

			// Set the updated student data in the demoClass
			setStudentData(updatedStudentData)

			// Update studentData in the active users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error updating student information:", error)
		}
	}

	const formatTableName = () => {
		const parts = tableName.split(" ")
		const formattedParts = parts.map((part) => {
			if (part) {
				return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
			}
			return part
		})
		return formattedParts.join(" ").trim()
	}

	const checkExistingTable = () => {
		return studentData.find(
			(student) => student.tableData.tableName === formatTableName()
		)
	}

	const handleAddTableSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const existingTable = checkExistingTable()

			if (existingTable) {
				setAlertMessage("A table with this name already exists!")
				return
			}

			// Update demoStudentData tableData in the demoClass
			const updatedStudentData = studentData.map((student) => {
				if (student.tableData.selected) {
					return {
						...student,
						tableData: {
							...student.tableData,
							tableName: formatTableName(),
							isOnTable: true,
							selected: false
						}
					}
				}
				return student
			})

			// Adds a new table in the demoClass
			setStudentData(updatedStudentData)

			// Adds a new table in the current users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error updating tableData in user class collection:", error)
		}

		tableInputRef.current.value = ""
		setIsAddTableModalOpen(false)
		setAlertMessage("")
		toast.success("Table group created successfully!")
	}

	const reset = () => {
		setStudentData((prevStudentData) => {
			return prevStudentData.map((student) => {
				return {
					...student,
					tableData: { ...student.tableData, selected: false }
				}
			})
		})
	}

	return (
		<>
			<Dialog
				open={isAddTableModalOpen}
				onClose={() => {
					setIsAddTableModalOpen(false)
					reset()
				}}
				className="relative z-50"
				initialFocus={tableInputRef}
			>
				{/* Backdrop */}
				<div
					className="fixed inset-0 bg-modalBackdropClr"
					aria-hidden="true"
				/>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="flex flex-col w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr">
						<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
							<Dialog.Title className="font-bold text-xl capitalize">
								Add table
							</Dialog.Title>
							<button
								onClick={() => {
									setIsAddTableModalOpen(false)
									reset()
								}}
							>
								<AiOutlineClose
									size={28}
									className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
								/>
							</button>
						</div>
						<form
							onSubmit={handleAddTableSubmit}
							className="p-5 flex flex-col h-full overflow-auto"
							id="form"
						>
							<div className="flex flex-col items-center">
								{alertMessage ? (
									<p className="font-bold text-xl text-red-500 pb-1">
										{alertMessage}
									</p>
								) : (
									<label
										htmlFor="tableName"
										className="text-xl pb-1"
									>
										Table name
									</label>
								)}
								<input
									onChange={handleInputChange}
									value={tableName}
									type="text"
									id="tableName"
									name="tableName"
									required
									maxLength={30}
									ref={tableInputRef}
									className={
										alertMessage
											? "w-full sm:w-[400px] border-2 border-red-500 rounded-lg p-2 outline-none"
											: "w-full sm:w-[400px] rounded-lg p-2 outline-inputOutlineClr"
									}
								/>
							</div>
							<div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] overflow-auto mt-5">
								{studentData.map((student) => (
									<div
										key={student.uuid}
										className="mx-auto py-2 h-fit"
									>
										<input
											onChange={toggleSelectedStudent}
											checked={student.tableData.selected}
											type="checkbox"
											id={student.name}
											name={student.name}
											className="hidden peer"
											disabled={student.tableData.tableName ? true : false}
										/>
										<label
											htmlFor={student.name}
											className="flex flex-col items-center w-[7.3rem] cursor-pointer text-center bg-white border border-buttonClr p-4 rounded-xl peer-disabled:bg-gray-200 peer-checked:bg-green-200 peer-hover:scale-105 duration-300 select-none"
										>
											<Image
												src={student.avatar}
												alt="Student Avatar: Sketched Animal"
												width={40}
												height={40}
												className="select-none"
											/>
											<span className="font-bold mt-1 text-lg">
												{student.name.length > 9
													? student.name.slice(0, 9) + "..."
													: student.name}
											</span>
											<span>
												{student.tableData.tableName.length > 9
													? student.tableData.tableName.slice(0, 9) + "..."
													: student.tableData.tableName}
											</span>
										</label>
									</div>
								))}
							</div>
						</form>
						<div className="flex justify-end gap-10 border-t-2 border-gray-300 w-full px-5 py-3">
							<button
								onClick={() => {
									setIsAddTableModalOpen(false)
									reset()
								}}
								type="button"
								className="w-full text-sm sm:text-base sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300"
								aria-label="Cancel"
							>
								Cancel
							</button>
							<button
								type="submit"
								form="form"
								className="w-full text-sm sm:text-base sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0"
								aria-label="Submit add student form"
								disabled={
									!studentData.some((student) => student.tableData.selected)
								}
							>
								Add Table
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	)
}

export default AddTable
