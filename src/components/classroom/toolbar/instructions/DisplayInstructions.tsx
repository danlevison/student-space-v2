import React from "react"
import { Dialog } from "@headlessui/react"
import { AiOutlineClose } from "react-icons/ai"

type DisplayInstructionsProps = {
	displayInstructionsModal: boolean
	setOpenInstructions: React.Dispatch<React.SetStateAction<boolean>>
	instructionTitle: string
	instructionsList: string[]
}

const DisplayInstructions = ({
	displayInstructionsModal,
	setOpenInstructions,
	instructionTitle,
	instructionsList
}: DisplayInstructionsProps) => {
	return (
		<Dialog
			open={displayInstructionsModal}
			onClose={() => setOpenInstructions(false)}
			className="relative z-50"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="p-2 sm:p-5 md:p-10 w-full h-full rounded-xl bg-blue-100 border-[20px] md:border-[50px] border-blue-400 overflow-auto">
					<div className="flex justify-between items-center">
						<Dialog.Title className="font-bold text-3xl sm:text-5xl md:text-6xl w-[95%] break-words">
							{instructionTitle}
						</Dialog.Title>
						<button onClick={() => setOpenInstructions(false)}>
							<AiOutlineClose
								size={30}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>
					<div className="mt-10">
						{instructionsList.map((instruction, index) => (
							<p
								key={index}
								className="text-3xl sm:text-4xl md:text-5xl mb-10 w-full break-words"
							>
								{`${index + 1}. ${instruction}`}
							</p>
						))}
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default DisplayInstructions
