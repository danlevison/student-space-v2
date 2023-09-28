import React, { useContext } from "react"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { updateStudentDataInClass } from "@/utils/updateStudentData"

type DeleteTableModalProps = {
	selectedTableName: string
	openCheckDeleteTableModal: boolean
	setOpenCheckDeleteTableModal: React.Dispatch<React.SetStateAction<boolean>>
	setOpenTableInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteTableModal = ({
	selectedTableName,
	openCheckDeleteTableModal,
	setOpenCheckDeleteTableModal,
	setOpenTableInfo
}: DeleteTableModalProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()

	const deleteTable = async () => {
		try {
			// Reset demoStudentData tableData property back to default and deletes table from demoClass
			const updatedStudentData = studentData.map((student) => {
				if (student.tableData.tableName === selectedTableName) {
					return {
						...student,
						tableData: {
							tableName: "",
							tablePoints: 0,
							isOnTable: false,
							selected: false
						}
					}
				}
				return student
			})

			// Set the updated student data to the state
			setStudentData(updatedStudentData)

			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error updating student information:", error)
		}

		setOpenCheckDeleteTableModal(false)
		setOpenTableInfo(false)
	}
	return (
		<Dialog
			open={openCheckDeleteTableModal}
			onClose={() => setOpenCheckDeleteTableModal(false)}
			className="relative z-[100]"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] h-auto overflow-auto rounded-xl bg-modalBgClr">
					<div className="flex justify-between items-center border-b border-gray-400 pb-4">
						<Dialog.Title className="font-bold text-lg">
							Delete this table group?
						</Dialog.Title>
						<button onClick={() => setOpenCheckDeleteTableModal(false)}>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>

					<div className="flex flex-col items-center">
						<p className="text-sm font-bold text-red-500 text-center py-6">
							Are you sure you want to delete this table group? This can&apos;t
							be undone.
						</p>
						<div className="flex justify-evenly items-center w-full border-t border-gray-400">
							<button
								onClick={() => setOpenCheckDeleteTableModal(false)}
								className="bg-modalBgClr hover:bg-white rounded-xl py-2 px-3 text-buttonClr font-bold mt-4"
							>
								Cancel
							</button>
							<button
								onClick={deleteTable}
								className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-5 text-primaryTextClr font-bold mt-4"
							>
								Delete table
							</button>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default DeleteTableModal
