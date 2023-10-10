import React, { useState, useRef, useContext } from "react"
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
// Types
import { StudentData } from "../../../types/types"

type CopyPasteStudentListProps = {
	showCopyPasteModal: boolean
	setShowCopyPasteModal: React.Dispatch<React.SetStateAction<boolean>>
	avatars: HTMLImageElement[]
	studentDob: string
	addedStudents: StudentData[]
	setAddedStudents: React.Dispatch<React.SetStateAction<StudentData[]>>
	alertMessage: string
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

const CopyPasteStudentList = ({
	showCopyPasteModal,
	setShowCopyPasteModal,
	avatars,
	studentDob,
	addedStudents,
	setAddedStudents,
	alertMessage,
	setAlertMessage
}: CopyPasteStudentListProps) => {
	const { studentData } = useContext(StudentDataContext)
	const [pastedText, setPastedText] = useState("")
	const pasteTextAreaRef = useRef<HTMLTextAreaElement>(null)

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPastedText(e.target.value)
	}

	const extractValidStudentNames = (pastedText: string) => {
		const studentNames = pastedText
			.split("\n") // split strings into array based on being on a new line
			.map(
				(name: string) =>
					name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().trim()
			)

		return filterExtractedNames(studentNames)
	}

	const filterExtractedNames = (studentNames: string[]) => {
		// Filter out empty names (empty lines) and any duplicate names
		return studentNames.filter(
			(name: string, index: number) =>
				name.length > 0 && studentNames.indexOf(name) === index
		)
	}

	const checkForDuplicates = (
		namesToCheck: string[],
		addedStudents: StudentData[],
		studentData: StudentData[]
	) => {
		return namesToCheck.some(
			(name) =>
				addedStudents.some((student) => student.name === name) ||
				studentData.some((student) => student.name === name)
		)
	}

	const handleAddPastedStudents = () => {
		const validStudentNames = extractValidStudentNames(pastedText)

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

		const isDuplicate = checkForDuplicates(
			validStudentNames,
			addedStudents,
			studentData
		)

		if (isDuplicate) {
			setAlertMessage(
				"It looks like you're trying to add a student to this class twice"
			)
		} else {
			setAlertMessage("")
			pasteTextAreaRef.current.value = ""

			// Add the new student to the list
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
				<Dialog.Panel className="w-full max-w-[650px] h-full max-h-[740px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
					<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
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
							You can add your students&apos; dates of birth later to display
							their birthdays.
						</p>
						<p className="text-center text-sm mb-5">
							We&apos;ll automatically import your list and any duplicate
							entries will be removed during the process.
						</p>
						{alertMessage ? (
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
							rows={10}
							placeholder={`Copy/Paste your student names here. Put each name on a new line.\n\nExample:\n\nFirst Name\nFirst Name\nFirst Name`}
							className="text-lg font-bold w-full rounded-lg p-2 outline-inputOutlineClr placeholder:text-lg placeholder:text-iconClr placeholder:font-bold"
						/>
					</div>
					<div className="flex justify-end items-center w-full border-t-2 border-gray-300 mt-[7.5rem] px-5 py-3">
						<button
							onClick={handleAddPastedStudents}
							type="button"
							disabled={
								!pasteTextAreaRef.current ||
								!pasteTextAreaRef.current.value.trim()
							}
							className="bg-white w-full sm:w-[150px] p-2 rounded-lg border-2 border-green-600 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white"
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
