import React from 'react'
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'

const DisplaySavedInstructions = ({ displaySavedInstructionsModal, savedInstruction, setOpenInstructions }) => {
  return (
    <Dialog open={displaySavedInstructionsModal} onClose={() => setOpenInstructions(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
                    
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full h-full rounded-xl bg-blue-100">
                <div className="flex justify-between items-center p-4">
                    <Dialog.Title className="font-bold text-6xl">{savedInstruction.title}</Dialog.Title>
                    <button onClick={() => setOpenInstructions(false)}>
                        <AiOutlineClose size={30} />
                    </button>
                </div>
                <div className="mt-10 p-4">
                    {savedInstruction.instructions.map((instruction, index) => (
                        <p 
                            key={index}
                            className="text-5xl mb-10"
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

export default DisplaySavedInstructions