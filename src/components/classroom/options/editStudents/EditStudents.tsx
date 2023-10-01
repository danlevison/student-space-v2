import React, { useState, useContext } from "react"
import Image from "next/image"
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import StudentInfoModal from "./StudentInfoModal"
// Types
import { StudentData } from "../../../../../types/types"

type EditStudentsProps = {
	isEditStudentsModalOpen: boolean
	setIsEditStudentsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditStudents = ({
	isEditStudentsModalOpen,
	setIsEditStudentsModalOpen
}: EditStudentsProps) => {
	const { studentData } = useContext(StudentDataContext)
	const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
		null
	)
	const [newStudentAvatar, setNewStudentAvatar] =
		useState<HTMLImageElement | null>(null)
	const [openStudentInfo, setOpenStudentInfo] = useState(false)

	const formatDob = (student: StudentData) => {
		const studentDob = new Date(student.dob)
		const year = studentDob.toLocaleString("default", { year: "numeric" })
		const month = studentDob.toLocaleString("default", { month: "2-digit" })
		const day = studentDob.toLocaleString("default", { day: "2-digit" })
		return `${year}-${month}-${day}`
	}

	const handleStudentInfoModal = (student: StudentData) => {
		setSelectedStudent({
			...student,
			dob: formatDob(student)
		})

		setNewStudentAvatar(student.avatar)
		setOpenStudentInfo(true)
	}

	return (
		<Dialog
			open={isEditStudentsModalOpen}
			onClose={() => setIsEditStudentsModalOpen(false)}
			className="relative z-40"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="p-5 w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr overflow-auto">
					<div className="flex justify-between items-center gap-6">
						<Dialog.Title className="font-bold text-xl">
							Edit Students
						</Dialog.Title>
						<button onClick={() => setIsEditStudentsModalOpen(false)}>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>
					{studentData.length === 0 ? (
						<div className="flex justify-center items-center text-center h-full">
							<p className="text-2xl">No student data available</p>
						</div>
					) : (
						<div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mt-4 p-2">
							{studentData.map((student) => (
								<button
									key={student.uuid}
									onClick={() => handleStudentInfoModal(student)}
									className="flex flex-col justify-center items-center text-center text-lg border border-buttonClr font-bold bg-white p-3 rounded-xl hover:scale-105 duration-300 break-words"
								>
									<Image
										src={student.avatar}
										alt="Student Avatar: Sketched Animal"
										width={40}
										height={40}
										className="select-none"
									/>
									{student.name}
								</button>
							))}
						</div>
					)}
				</Dialog.Panel>
			</div>

			<StudentInfoModal
				openStudentInfo={openStudentInfo}
				setOpenStudentInfo={setOpenStudentInfo}
				selectedStudent={selectedStudent}
				setSelectedStudent={setSelectedStudent}
				newStudentAvatar={newStudentAvatar}
				setNewStudentAvatar={setNewStudentAvatar}
			/>
		</Dialog>
	)
}

export default EditStudents
