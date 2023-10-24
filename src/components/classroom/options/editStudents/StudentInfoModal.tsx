import React, { useState, useContext } from "react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { updateStudentDataInClass } from "@/utils/updateStudentData"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import StudentAvatarMenu from "./StudentAvatarMenu"
import DeleteStudentModal from "./DeleteStudentModal"
// Types
import { StudentData } from "../../../../types/types"

type StudentInfoModalProps = {
	openStudentInfo: boolean
	setOpenStudentInfo: React.Dispatch<React.SetStateAction<boolean>>
	selectedStudent: StudentData
	setSelectedStudent: React.Dispatch<React.SetStateAction<StudentData>>
	newStudentAvatar: HTMLImageElement
	setNewStudentAvatar: React.Dispatch<React.SetStateAction<HTMLImageElement>>
}

const StudentInfoModal = ({
	openStudentInfo,
	setOpenStudentInfo,
	selectedStudent,
	setSelectedStudent,
	newStudentAvatar,
	setNewStudentAvatar
}: StudentInfoModalProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [checkDeleteStudentModal, setCheckDeleteStudentModal] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")

	const updateStudentName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedStudent((prevSelectedStudent) => ({
			...prevSelectedStudent,
			name: e.target.value
		}))
	}

	const updateStudentDob = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedStudent((prevSelectedStudent) => ({
			...prevSelectedStudent,
			dob: e.target.value
		}))
	}

	const capitaliseStudentName = () => {
		const updatedCapitalisedName =
			selectedStudent?.name.charAt(0).toUpperCase() +
			selectedStudent?.name.slice(1)
		return updatedCapitalisedName
	}

	const handleStudentInfoSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		try {
			e.preventDefault()

			capitaliseStudentName()
			const updatedDob = selectedStudent?.dob

			const existingStudent = studentData.find(
				(student) => student.name === capitaliseStudentName()
			)

			if (existingStudent && existingStudent.uuid !== selectedStudent?.uuid) {
				setAlertMessage("A student with this name already exists!")
				return
			}

			// Update the student name, dob and avatar in the demoClass
			const updatedStudentData = studentData.map((student) => {
				if (student.uuid === selectedStudent?.uuid) {
					return {
						...student,
						name: capitaliseStudentName(),
						dob: updatedDob,
						avatar: newStudentAvatar
					}
				}
				return student
			})

			setStudentData(updatedStudentData) // Update the local state with the updated student data

			// Update studentData and edit student in the active users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)

			setOpenStudentInfo(false)
		} catch (error) {
			console.error("Error updating student information:", error)
		}
		setAlertMessage("")
	}

	return (
		<Dialog
			open={openStudentInfo}
			onClose={() => {
				setOpenStudentInfo(false)
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
				<Dialog.Panel className="flex flex-col w-full max-w-[500px] h-full max-h-[490px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
					<div className="p-5 flex justify-between items-center border-b-2 border-gray-300 z-10">
						<Dialog.Title className="font-bold text-xl break-words w-3/4">
							{selectedStudent?.name}
						</Dialog.Title>
						<button
							onClick={() => {
								setOpenStudentInfo(false)
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
						onSubmit={handleStudentInfoSubmit}
						className="flex flex-col p-5"
						id="form"
					>
						<StudentAvatarMenu
							newStudentAvatar={newStudentAvatar}
							setNewStudentAvatar={setNewStudentAvatar}
						/>

						<div className="flex flex-col mt-4">
							{alertMessage ? (
								<p className="font-bold text-red-500 pb-1 text-lg">
									{alertMessage}
								</p>
							) : (
								<label
									htmlFor="name"
									className="pb-1 text-lg"
								>
									First name
								</label>
							)}
							<input
								className={
									alertMessage
										? "border-2 border-red-500 w-full rounded-lg p-3 outline-none"
										: "w-full rounded-lg p-3 outline-inputOutlineClr"
								}
								type="text"
								id="name"
								name="name"
								required
								value={selectedStudent?.name}
								onChange={updateStudentName}
								maxLength={30}
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="dob"
								className="pt-3 text-lg"
							>
								Date of birth
							</label>
							<input
								className=" bg-white rounded-lg p-3 outline-inputOutlineClr"
								type="date"
								id="dob"
								name="dob"
								value={selectedStudent?.dob}
								onChange={updateStudentDob}
							/>
						</div>
					</form>
					<div className="flex justify-between flex-row-reverse items-center border-t-2 border-gray-300 mt-3 px-5 py-4">
						<div className="flex items-center justify-center gap-2">
							<button
								onClick={() => {
									setOpenStudentInfo(false)
									setAlertMessage("")
								}}
								type="button"
								className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
							>
								Cancel
							</button>
							<button
								type="submit"
								form="form"
								disabled={!selectedStudent?.name.trim()}
								className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
							>
								Save
							</button>
						</div>
						<button
							onClick={() =>
								setCheckDeleteStudentModal(!checkDeleteStudentModal)
							}
							type="button"
							className="w-[150px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-sm text-primaryTextClr font-bold"
						>
							Remove student
						</button>
					</div>
				</Dialog.Panel>
			</div>
			<DeleteStudentModal
				checkDeleteStudentModal={checkDeleteStudentModal}
				setCheckDeleteStudentModal={setCheckDeleteStudentModal}
				selectedStudent={selectedStudent}
				setOpenStudentInfo={setOpenStudentInfo}
			/>
		</Dialog>
	)
}

export default StudentInfoModal
