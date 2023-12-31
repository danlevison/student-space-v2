import React from "react"
import { Dialog } from "@headlessui/react"

type AddInstructionsProps = {
	showAddInstructionModal: boolean
	setShowAddInstructionModal: React.Dispatch<React.SetStateAction<boolean>>
	instruction: string
	setInstruction: React.Dispatch<React.SetStateAction<string>>
	addInstruction: () => void
}

const AddInstructions = ({
	showAddInstructionModal,
	setShowAddInstructionModal,
	instruction,
	setInstruction,
	addInstruction
}: AddInstructionsProps) => {
	return (
		<Dialog
			open={showAddInstructionModal}
			onClose={() => setShowAddInstructionModal(false)}
			className="relative z-[100]"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="p-5 w-full max-w-[550px] h-full max-h-[250px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
					<div className="flex flex-col justify-between h-full">
						<div className="flex flex-col">
							<label
								htmlFor="instruction"
								className="py-2 text-lg"
							>
								Enter an instruction
							</label>
							<textarea
								onChange={(e) => setInstruction(e.target.value)}
								value={instruction}
								name="instruction"
								id="instruction"
								rows={4}
								placeholder="e.g. Take out your reading book"
								className="p-2 rounded-lg"
							/>
						</div>
						<div className="flex justify-end items-center gap-10 pt-4">
							<button onClick={() => setShowAddInstructionModal(false)}>
								Cancel
							</button>
							<button onClick={addInstruction}>Add</button>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default AddInstructions
