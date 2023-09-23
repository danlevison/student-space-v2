import React, { useState, useRef, useContext } from "react"
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"

const CopyPasteStudentList = ({
	showCopyPasteModal,
	setShowCopyPasteModal,
	avatars,
	studentDob,
	addedStudents,
	setAddedStudents,
	alert,
	setAlert,
	alertMessage,
	setAlertMessage
}) => {
	const { studentData } = useContext(StudentDataContext)
	const [pastedText, setPastedText] = useState("")
	const pasteTextAreaRef = useRef(null)

	const handleTextareaChange = (e) => {
		setPastedText(e.target.value)
	}

	const handlePasteStudents = () => {
		// Extract student names from pasted text
		const studentNames = pastedText
			.split("\n")
			.map((name) => name.charAt(0).toUpperCase() + name.slice(1).trim())

		// Filter out empty names
		const validStudentNames = studentNames.filter((name) => name.length > 0)

		// Add valid student names to the list
		const newStudents = validStudentNames.map((name) => {
			const randomIndex = Math.floor(Math.random() * avatars.length)
			const uuid = crypto.randomUUID()
			return {
				name: name,
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
		})

		const isDuplicate = validStudentNames.some(
			(name) =>
				addedStudents.some((student) => student.name === name) ||
				studentData.some((student) => student.name === name)
		)

		if (isDuplicate) {
			setAlert(true)
			setAlertMessage(
				"It looks like you're trying to add a student to this class twice"
			)
		} else {
			setAlert(false)
			setAlertMessage("")
			pasteTextAreaRef.current.value = ""
			setAddedStudents((prevAddedStudents) => [
				...newStudents,
				...prevAddedStudents
			])
			setShowCopyPasteModal(false)
		}
	}

	return (
		<Dialog
			open={showCopyPasteModal}
			onClose={() => setShowCopyPasteModal(false)}
			className="relative z-[100]"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-[650px] h-full max-h-[660px] rounded-xl bg-modalBgClr overflow-auto">
					<div className="p-5 flex justify-between items-center">
						<Dialog.Title className="font-bold text-xl capitalize">
							Copy/Paste student list
						</Dialog.Title>
						<button onClick={() => setShowCopyPasteModal(false)}>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>

					<div className="p-5">
						<p className="text-center font-bold mb-5">
							You can add your students' dates of birth later to display their
							birthdays.
						</p>
						{alert ? (
							<p className="font-bold text-red-500 pb-1">{alertMessage}</p>
						) : (
							<label
								htmlFor="pasteNames"
								className="pb-1"
							>
								Paste your student list
							</label>
						)}
						<textarea
							onChange={handleTextareaChange}
							ref={pasteTextAreaRef}
							id="pasteNames"
							rows="9"
							placeholder={`Copy/Paste your student names here. Put each name on a new line.\n\nExample:\n\nFirst Name\nFirst Name\nFirst Name`}
							className="text-lg font-bold border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr placeholder:text-lg placeholder:text-iconClr placeholder:font-bold"
						/>
						<button
							onClick={handlePasteStudents}
							type="button"
							disabled={
								!pasteTextAreaRef.current ||
								!pasteTextAreaRef.current.value.trim()
							}
							className="block bg-white w-full sm:w-[200px] mx-auto p-2 rounded-lg border-2 border-green-600 mt-4 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white"
						>
							Import list
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default CopyPasteStudentList
