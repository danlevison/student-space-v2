import React, { useContext, useState, useRef } from "react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai"
import CopyPasteStudentList from "./CopyPasteStudentList"
import { updateStudentDataInClass } from "@/utils/updateStudentData"
// Types
import { StudentData } from "../../../types/types"
import { toast } from "react-toastify"

type AddStudentProps = {
	isAddStudentModalOpen: boolean
	setIsAddStudentModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	avatars: HTMLImageElement[]
}

const AddStudent = ({
	isAddStudentModalOpen,
	setIsAddStudentModalOpen,
	avatars
}: AddStudentProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [studentName, setStudentName] = useState("")
	const [studentDob, setStudentDob] = useState("")
	const [addedStudents, setAddedStudents] = useState<StudentData[] | null>([])
	const [alertMessage, setAlertMessage] = useState("")
	const [showCopyPasteModal, setShowCopyPasteModal] = useState(false)
	const nameInputRef = useRef<HTMLInputElement>(null)
	const dateInputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.value.trim()
		setStudentName(inputName)
	}

	const capitaliseStudentName = () => {
		return studentName.charAt(0).toUpperCase() + studentName.slice(1)
	}

	const checkForDuplicates = (
		studentName: string,
		addedStudents: StudentData[],
		studentData: StudentData[]
	) => {
		return (
			addedStudents.some((student) => student.name === studentName) ||
			studentData.some((student) => student.name === studentName)
		)
	}

	const addStudent = () => {
		const randomIndex = Math.floor(Math.random() * avatars.length)
		const uuid = crypto.randomUUID()

		const newStudent = {
			name: capitaliseStudentName(),
			dob: studentDob,
			points: 0,
			avatar: avatars[randomIndex],
			selected: false,
			tableData: {
				tableName: "",
				tablePoints: 0,
				isOnTable: false,
				selected: false
			},
			uuid: uuid
		}

		const isDuplicate = checkForDuplicates(
			studentName,
			addedStudents,
			studentData
		)

		if (isDuplicate) {
			setAlertMessage(
				"It looks like you're trying to add a student to this class twice"
			)
		} else {
			setAlertMessage("")
			setStudentName("")
			nameInputRef.current.value = ""
			dateInputRef.current.value = ""

			// Add the new student to the list
			setAddedStudents((prevAddedStudents) => [
				newStudent,
				...prevAddedStudents
			])
			setStudentDob("")
			nameInputRef.current.focus()
		}
	}

	const removeStudent = (studentId: string) => {
		setAddedStudents((prevAddedStudents) =>
			prevAddedStudents.filter((student) => student.uuid != studentId)
		)
	}

	const handleAddStudentSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()
		try {
			const updatedStudentData = studentData.concat(addedStudents)

			// Update studentData and display added students in the demoClass
			setStudentData(updatedStudentData)

			// Update studentData and display added students in the active users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error adding student to user class collection:", error)
			toast.error("Error adding student")
		}

		nameInputRef.current.value = ""
		dateInputRef.current.value = ""
		nameInputRef.current.focus()
		setAlertMessage("")
		setIsAddStudentModalOpen(false)
	}

	const handleCopyPasteModal = () => {
		setShowCopyPasteModal(true)
	}

	return (
		<>
			<Dialog
				open={isAddStudentModalOpen}
				onClose={() => setIsAddStudentModalOpen(false)}
				className="relative z-50"
				initialFocus={nameInputRef}
			>
				{/* Backdrop */}
				<div
					className="fixed inset-0 bg-modalBackdropClr"
					aria-hidden="true"
				/>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="w-full max-w-[500px] h-full max-h-[680px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
						<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
							<Dialog.Title className="font-bold text-xl capitalize">
								Add student
							</Dialog.Title>
							<button onClick={() => setIsAddStudentModalOpen(false)}>
								<AiOutlineClose
									size={28}
									className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
								/>
							</button>
						</div>
						<form
							onSubmit={handleAddStudentSubmit}
							className="flex flex-col"
						>
							<div className="p-5">
								{alertMessage ? (
									<p className="font-bold text-red-500 pb-1">{alertMessage}</p>
								) : (
									<label
										htmlFor="name"
										className="pb-1"
									>
										First name
									</label>
								)}
								<input
									onChange={handleInputChange}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault() // Prevent form submission
											addStudent() // Call addStudent function when Enter key is pressed
										}
									}}
									className={
										alertMessage
											? "border-2 border-red-500 w-full rounded-lg p-3 outline-none"
											: "w-full rounded-lg p-3 outline-inputOutlineClr"
									}
									type="text"
									id="name"
									name="name"
									ref={nameInputRef}
								/>
								<div className="flex items-center gap-2 pt-4 relative">
									<label htmlFor="dob">{`Date of birth (optional or add later)`}</label>
									<AiOutlineInfoCircle
										size={20}
										className="peer mb-1"
									/>
									<span className="absolute w-auto p-2 left-[-18px] sm:left-0 top-[-22px] rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left peer-hover:scale-100">
										We use Date of birth (DOB) to display students&apos;
										birthdays. 🎂
									</span>
								</div>
								<input
									onChange={(e) => setStudentDob(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault() // Prevent form submission
											addStudent() // Call addStudent function when Enter key is pressed
										}
									}}
									className="w-full bg-white rounded-lg p-3 outline-inputOutlineClr"
									type="date"
									id="dob"
									name="dob"
									ref={dateInputRef}
								/>
								<button
									onClick={addStudent}
									type="button"
									disabled={!studentName}
									className="block bg-white w-full sm:w-[200px] mx-auto p-2 rounded-lg border-2 border-green-600 mt-4 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white"
								>
									Add
								</button>
							</div>

							<div className="mt-2">
								{addedStudents.length > 0 ? (
									<div className="bg-[#f1f3f8] p-5 border-y-2 border-gray-300 h-[250px] overflow-auto">
										<p className="font-bold">
											{addedStudents.length}{" "}
											{addedStudents.length === 1 ? "student" : "students"}
										</p>
										{addedStudents.map((student) => (
											<div
												key={student.uuid}
												className="flex items-center gap-4 border-b-2 border-gray-400 py-2"
											>
												<p>{student.name}</p>
												<p>{student.dob}</p>
												<button
													onClick={() => removeStudent(student.uuid)}
													type="button"
													className="ml-auto"
												>
													<AiOutlineClose size={20} />
												</button>
											</div>
										))}
									</div>
								) : (
									<div className="flex justify-center items-center bg-[#f1f3f8] p-5 text-center h-[250px] border-y-2 border-gray-300">
										No students added yet
									</div>
								)}
							</div>

							<div className="flex items-center justify-between gap-2 p-5">
								<button
									onClick={handleCopyPasteModal}
									type="button"
									className="bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
								>
									Or, copy and paste your student list
								</button>
								<button
									className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 hover:scale-105 duration-300 disabled:bg-gray-400 disabled:text-white disabled:hover:scale-100 disabled:duration-0"
									disabled={addedStudents.length === 0}
									aria-label="Submit add student form"
								>
									Save
								</button>
							</div>
						</form>
					</Dialog.Panel>
				</div>
				<CopyPasteStudentList
					showCopyPasteModal={showCopyPasteModal}
					setShowCopyPasteModal={setShowCopyPasteModal}
					studentDob={studentDob}
					avatars={avatars}
					addedStudents={addedStudents}
					setAddedStudents={setAddedStudents}
					alertMessage={alertMessage}
					setAlertMessage={setAlertMessage}
				/>
			</Dialog>
		</>
	)
}

export default AddStudent
