import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/utils/firebase"
import {
	doc,
	getDoc,
	collection,
	setDoc,
	serverTimestamp
} from "firebase/firestore"
import { Dialog } from "@headlessui/react"
import { RiAddLine } from "react-icons/ri"
import { toast } from "react-toastify"
import bagAvatar from "@/../../public/assets/avatars/bag.svg"

type CreateClassProps = {
	setShouldFetchClassData: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateClass({ setShouldFetchClassData }: CreateClassProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [classroomName, setClassroomName] = useState("")
	const { currentUser } = useAuth()
	const classId = crypto.randomUUID()

	const handleClickOpen = () => {
		setIsOpen(true)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setClassroomName(e.target.value.trim())
	}

	const handleCreateClass = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		try {
			if (!currentUser) {
				console.error("User not authenticated.")
				return
			}

			const docRef = doc(db, "users", currentUser.uid)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const classDocumentRef = doc(collection(docRef, "classes"), classId)

				// Check if the document already exists
				const classDocSnap = await getDoc(classDocumentRef)

				if (!classDocSnap.exists()) {
					// If the document doesn't exist, create it with studentData, className and classAvatar
					await setDoc(classDocumentRef, {
						studentData: [],
						className: classroomName,
						classAvatar: bagAvatar,
						createdAt: serverTimestamp()
					})

					// Class successfully created
					setShouldFetchClassData(true)
					toast.success("Class successfully created!")
				} else {
					console.error("Class already exists.")
				}
			} else {
				console.error("User document does not exist")
			}
		} catch (error) {
			console.error("Error creating class", error)
			toast.error("Error creating class, please try again.")
		}
		setIsOpen(false)
	}

	return (
		<>
			<button
				onClick={handleClickOpen}
				className="w-[230px] h-[230px] border border-[#5065A8] shadow-lg bg-white rounded-2xl hover:scale-105 duration-300 ease-out"
			>
				<div className="flex flex-col justify-center items-center">
					<p className="text-lg">Create class</p>
					<RiAddLine
						size={70}
						role="presentation"
						aria-hidden="true"
					/>
				</div>
			</button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50"
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<div
					className="fixed inset-0 bg-[#32416c]/90"
					aria-hidden="true"
				/>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					{/* The actual dialog panel  */}
					<Dialog.Panel className="flex flex-col p-6 mx-auto w-[500px] h-[300px] rounded-3xl bg-modalBgClr border-2 border-modalBorderClr">
						<Dialog.Title className="text-3xl font-bold text-center">
							Create New Class
						</Dialog.Title>
						<form
							onSubmit={handleCreateClass}
							className="flex flex-col justify-between h-full pt-4"
						>
							<div className="flex flex-col">
								<label
									htmlFor="classname"
									className="text-lg py-2"
								>
									Class name
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									id="classname"
									name="classname"
									required
									maxLength={25}
									className="py-3 px-2 rounded-lg outline-inputOutlineClr"
								/>
							</div>
							<div className="flex justify-center gap-8">
								<button
									onClick={() => setIsOpen(false)}
									type="button"
									className="w-full text-sm sm:text-xl text-white bg-buttonClr py-3 rounded-xl shadow-md hover:scale-105 duration-300"
								>
									Cancel
								</button>
								<button
									disabled={!classroomName}
									className="w-full text-sm sm:text-xl text-white bg-buttonClr py-3 rounded-xl shadow-md hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0"
								>
									Create Class
								</button>
							</div>
						</form>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	)
}

export default CreateClass
