import React, { useState, useContext } from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { updateStudentDataInClass } from "@/utils/updateStudentData"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-toastify"
import DeleteTableModal from "./DeleteTableModal"

type TableInfoModalProps = {
	setIsEditTablesModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	openTableInfo: boolean
	setOpenTableInfo: React.Dispatch<React.SetStateAction<boolean>>
	selectedTableName: string
	setTempSelectedTableName: React.Dispatch<React.SetStateAction<string>>
	tempSelectedTableName: string
}

const TableInfoModal = ({
	setIsEditTablesModalOpen,
	openTableInfo,
	setOpenTableInfo,
	selectedTableName,
	setTempSelectedTableName,
	tempSelectedTableName
}: TableInfoModalProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [tempStudentData, setTempStudentData] = useState(studentData)
	const [alertMessage, setAlertMessage] = useState("")
	const [openCheckDeleteTableModal, setOpenCheckDeleteTableModal] =
		useState(false)

	const updateTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempSelectedTableName(e.target.value)
	}

	const formatTableName = () => {
		const parts = tempSelectedTableName.split(" ")
		const formattedParts = parts.map((part) => {
			if (part) {
				return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
			}
			return part
		})
		return formattedParts.join(" ").trim()
	}

	const toggleStudent = (selectedStudentName: string) => {
		setTempStudentData((prevTempStudentData) => {
			return prevTempStudentData.map((student) => {
				if (selectedStudentName === student.name) {
					return {
						...student,
						tableData: {
							...student.tableData,
							isOnTable: !student.tableData.isOnTable
						}
					}
				}
				return student
			})
		})
	}

	const handleTableInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const tableName = formatTableName()
			const existingTableName = studentData.find(
				(student) => student.tableData?.tableName === tableName
			)

			if (
				existingTableName &&
				existingTableName.tableData?.tableName !== selectedTableName
			) {
				setAlertMessage("A table with this name already exists!")
				return
			}

			// Update studentData tableData to show updatedTableName in demoClass
			const updatedStudentData = tempStudentData.map((student) => {
				if (student.tableData?.tableName === selectedTableName) {
					return {
						...student,
						tableData: { ...student.tableData, tableName: tableName.trim() }
					}
				}
				return student
			})

			setStudentData(updatedStudentData)

			// Update studentData and edit table in the active users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error updating student information:", error)
		}

		alertMessage ? setOpenTableInfo(true) : setOpenTableInfo(false)
		setIsEditTablesModalOpen(false)
		toast.success("Table group edited successfully!")
	}

	return (
		<Dialog
			open={openTableInfo}
			onClose={() => {
				setOpenTableInfo(false)
				setTempStudentData(studentData)
				setAlertMessage("")
			}}
			className="relative z-50"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="flex flex-col w-full max-w-[750px] h-full max-h-[500px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr">
					<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
						<Dialog.Title className="font-bold text-xl break-words w-3/4">
							{selectedTableName}
						</Dialog.Title>
						<button
							onClick={() => {
								setOpenTableInfo(false)
								setTempStudentData(studentData)
								setAlertMessage("")
							}}
						>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>
					<form
						onSubmit={handleTableInfoSubmit}
						className="flex flex-col h-full p-5 overflow-auto"
						id="form"
					>
						{alertMessage ? (
							<p className="font-bold text-red-500 pb-1">{alertMessage}</p>
						) : (
							<label
								htmlFor="tableName"
								className="pb-1"
							>
								Table name
							</label>
						)}
						<input
							onChange={updateTableName}
							value={tempSelectedTableName}
							className={
								alertMessage
									? "border-2 border-red-500 w-full rounded-lg p-3 outline-none"
									: "w-full rounded-lg p-3 outline-inputOutlineClr"
							}
							id="tableName"
							name="tableName"
							type="text"
							maxLength={30}
						/>

						<div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 items-center py-4">
							{tempStudentData
								.filter(
									(student) =>
										student.tableData?.tableName === selectedTableName
								)
								.map((student) => (
									<div
										key={student.name}
										className="flex justify-center"
									>
										<input
											onChange={() => toggleStudent(student.name)}
											checked={student.tableData.isOnTable}
											type="checkbox"
											id={student.name}
											name={student.name}
											className="hidden peer"
										/>
										<label
											htmlFor={student.name}
											className="border border-buttonClr text-center select-none flex flex-col items-center w-28 cursor-pointer bg-white p-4 rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300"
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
										</label>
									</div>
								))}
						</div>
					</form>
					<div className="flex flex-row-reverse justify-between items-center border-t-2 border-gray-300 px-5 py-3">
						<div className="flex items-center justify-center gap-2">
							<button
								onClick={() => {
									setOpenTableInfo(false)
									setTempStudentData(studentData)
									setAlertMessage("")
								}}
								type="button"
								className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr text-sm font-bold"
							>
								Cancel
							</button>
							<button
								type="submit"
								form="form"
								className="font-bold text-sm bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400"
							>
								Save
							</button>
						</div>
						<button
							onClick={() =>
								setOpenCheckDeleteTableModal(!openCheckDeleteTableModal)
							}
							type="button"
							className="w-[110px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-primaryTextClr text-sm font-bold"
						>
							Delete table
						</button>
					</div>
				</Dialog.Panel>
			</div>

			<DeleteTableModal
				openCheckDeleteTableModal={openCheckDeleteTableModal}
				setOpenCheckDeleteTableModal={setOpenCheckDeleteTableModal}
				selectedTableName={selectedTableName}
				setOpenTableInfo={setOpenTableInfo}
			/>
		</Dialog>
	)
}

export default TableInfoModal
