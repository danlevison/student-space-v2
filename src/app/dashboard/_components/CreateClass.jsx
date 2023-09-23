import { useState, useContext } from "react"
import StudentDataContext from "@/context/StudentDataContext"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/utils/firebase"
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

function CreateClass({ setShouldFetchClassData }) {
	const [isOpen, setIsOpen] = useState(false)
	const { userClassName, setUserClassName, userUid } =
		useContext(StudentDataContext)
	const classId = crypto.randomUUID()
	const [user, loading] = useAuthState(auth)
	const [classAvatar, setClassAvatar] = useState(bagAvatar)

	const handleClickOpen = () => {
		setIsOpen(true)
	}

	const handleInputChange = (e) => {
		setUserClassName(e.target.value.trim())
	}

	const handleCreateClass = async (e) => {
		e.preventDefault()

		try {
			if (!user) {
				console.log("User not authenticated.")
				return
			}

			const docRef = doc(db, "users", userUid)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const data = docSnap.data()

				// Ensure userClassName is not empty
				if (userClassName === "") {
					console.log("Invalid class name")
					return
				}

				const classDocumentRef = doc(collection(docRef, "classes"), classId)

				// Check if the document already exists
				const classDocSnap = await getDoc(classDocumentRef)

				if (!classDocSnap.exists()) {
					// If the document doesn't exist, create it with studentData, className and classAvatar
					await setDoc(classDocumentRef, {
						studentData: [],
						className: userClassName,
						classAvatar: classAvatar,
						createdAt: serverTimestamp()
					})

					// Class successfully created
					setShouldFetchClassData(true)
					setIsOpen(false)
					toast.success("Class successfully created!")
				} else {
					console.log("Class already exists.")
				}
			} else {
				console.log("User document does not exist")
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<button
				onClick={handleClickOpen}
				className="w-[230px] h-[230px] border border-[#5065A8] shadow-lg bg-white rounded-2xl hover:scale-105 duration-300 ease-out"
			>
				<div className="flex flex-col justify-center items-center">
					<p className="text-lg">Create class</p>
					<RiAddLine size={70} />
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
					<Dialog.Panel className="flex flex-col p-6 mx-auto w-[500px] h-[300px] rounded-3xl bg-modalBgClr">
						<Dialog.Title className="text-3xl font-bold text-center">
							Create Class
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
									className="py-3 px-2 border border-gray-400 rounded-lg outline-inputOutlineClr"
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
									disabled={!userClassName}
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
