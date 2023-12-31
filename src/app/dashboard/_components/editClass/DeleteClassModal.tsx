import React, { useContext } from "react"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../../../utils/firebase"
import { useAuth } from "@/context/AuthContext"
// import bagAvatar from "@/../../public/assets/avatars/bag.svg"
import { toast } from "react-toastify"

type DeleteClassModalProps = {
	openDeleteClassModal: boolean
	setOpenDeleteClassModal: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditClassModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	classData: {
		classId: string
		className: string
		classAvatar: {
			height: number
			width: number
			blurWidth: number
			src: string
			blurHeight: number
		}
	}
}

const DeleteClassModal = ({
	openDeleteClassModal,
	setOpenDeleteClassModal,
	setIsEditClassModalOpen,
	classData
}: DeleteClassModalProps) => {
	const { currentUser } = useAuth()

	const deleteClass = async () => {
		try {
			if (currentUser.uid) {
				// User has created their own class (Firebase)
				const classDocRef = doc(
					db,
					"users",
					currentUser.uid,
					"classes",
					classData.classId
				)
				await deleteDoc(classDocRef)
				toast.success("Class successfully deleted!")
			}
		} catch (error) {
			console.error("Error deleting class", error)
			toast.error("Error deleting class, please try again.")
		}

		setOpenDeleteClassModal(false)
		setIsEditClassModalOpen(false)
	}
	return (
		<Dialog
			open={openDeleteClassModal}
			onClose={() => setOpenDeleteClassModal(false)}
			className="relative z-[100]"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] h-auto overflow-auto rounded-xl bg-modalBgClr border-2 border-modalBorderClr">
					<div className="flex justify-between items-center border-b border-gray-400 pb-4">
						<Dialog.Title className="font-bold text-lg">
							Are you sure?
						</Dialog.Title>
						<button onClick={() => setOpenDeleteClassModal(false)}>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>

					<div className="flex flex-col items-center">
						<p className="text-sm font-bold text-red-500 text-center py-6">
							Warning: Deleting your class will permanently remove all class
							data! This can&apos;t be undone.
						</p>
						<div className="flex justify-evenly items-center w-full border-t border-gray-400">
							<button
								onClick={() => setOpenDeleteClassModal(false)}
								className="bg-modalBgClr hover:bg-white rounded-xl py-2 px-3 text-buttonClr font-bold mt-4"
							>
								Cancel
							</button>
							<button
								onClick={deleteClass}
								className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-5 text-primaryTextClr font-bold mt-4"
							>
								Delete your class
							</button>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default DeleteClassModal
