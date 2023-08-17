import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai';

const Instructions = ({ openInstructions, setOpenInstructions }) => {
    // State variables for various modals and data
    const [showInstructionsInputModal, setShowInstructionsInputModal] = useState(false)
    const [showAddInstructionModal, setShowAddInstructionModal] = useState(false)
    const [displayInstructionsModal, setDisplayInstructionsModal] = useState(false)
    const [instructionTitle, setInstructionTitle] = useState("")
    const [instruction, setInstruction] = useState("")
    const [instructionsList, setInstructionsList] = useState([])
    const [savedInstructions, setSavedInstructions] = useState([])
    const [showSavedInstructions, setShowSavedInstructions] = useState(false)
    const [activeSavedInstruction, setActiveSavedInstruction] = useState(null)

    // Handlers for opening and closing modals
    const handleInstructionsInputModal = () => {
        setShowInstructionsInputModal(!showInstructionsInputModal)
    }

    const handleAddInstructionModal = () => {
        setShowAddInstructionModal(!showAddInstructionModal)
    }

    // Adding an instruction to the list
    const addInstruction = () => {
        if (instruction.trim() !== "") {
            setInstructionsList([...instructionsList, instruction])
            setInstruction("")
        }
        setShowAddInstructionModal(false)
    }

    // Removing an instruction from the list
    const removeInstruction = (index) => {
        const updatedInstructions = instructionsList.filter((_, i) => i !== index)
        setInstructionsList(updatedInstructions)
    }

    // Displaying instructions in a modal
    const displayInstructions = () => {
        setDisplayInstructionsModal(!displayInstructionsModal)
    }

    // Handling saved instructions display
    const displaySavedInstructions = (savedInstructionIndex) => {
        setShowSavedInstructions(!showSavedInstructions)
        setActiveSavedInstruction(savedInstructionIndex)
    }

    // Saving instructions for later
    const saveInstructions = () => {
        if (instructionsList.length > 0 || instructionTitle) {
            const newInstructionSet = {
                title: instructionTitle === "" ? instructionsList[0] : instructionTitle,
                instructions: [...instructionsList]
            }
            setSavedInstructions([...savedInstructions, newInstructionSet])
            setInstructionTitle("")
            setInstructionsList([])
            setShowInstructionsInputModal(false)
        } else {
            setShowInstructionsInputModal(false)
        } 
    }

    // Deleting a saved instruction
    const deleteSavedInstruction = (index) => {
        setSavedInstructions((prevSavedInstructions) => {
            const updatedInstructions = [...prevSavedInstructions]
            updatedInstructions.splice(index, 1)
            return updatedInstructions
        })
    }

    // Reset modal states + data states on openInstructions change
    useEffect(() => {
        setShowInstructionsInputModal(false)
        setShowAddInstructionModal(false)
        setDisplayInstructionsModal(false)
        setShowSavedInstructions(false)
        setInstructionTitle("")
        setInstruction("")
        setInstructionsList([])
    }, [openInstructions])

  return (
    showInstructionsInputModal ? 
        <Dialog open={openInstructions} onClose={() => setOpenInstructions(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full max-w-[600px] h-[500px] overflow-auto rounded-xl bg-blue-100">
            <div className="flex justify-between items-center pb-4">
                <button onClick={() => setShowInstructionsInputModal(false)}>
                    <AiOutlineArrowLeft size={25} />
                </button>
                <Dialog.Title className="font-bold text-xl text-center">Create Instructions</Dialog.Title>
                <button onClick={() => setOpenInstructions(false)}>
                <AiOutlineClose
                    size={28}
                    className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                />
                </button>
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex flex-col w-full">
                    <label 
                        htmlFor="instruction-title"
                        className="text-lg py-2"
                    >
                            Instruction name {"(optional)"} 
                    </label>
                    <input 
                        type="text"
                        id="instruction-title"
                        name="instruction-title"
                        placeholder="e.g. Morning routine"
                        className="p-4 w-full rounded-lg border-2 border-gray-400"
                        value={instructionTitle}
                        onChange={(e) => setInstructionTitle(e.target.value)} 
                    />
                </div>
                <button
                    onClick={handleAddInstructionModal}
                    className="p-2 bg-buttonClr text-primaryTextClr mt-2 rounded-lg"
                >
                    Add instruction
                </button>
                
                <div className="mt-4">
                    {instructionsList.map((instruction, index) => (
                        <div key={index} className="flex justify-between items-center border-2 border-black rounded-lg p-3 mb-2">
                            <p className="text-lg">{`${index + 1}. ${instruction}`}</p>
                            <button onClick={() => removeInstruction(index)}>
                                <AiOutlineClose size={25} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-center items-center gap-6 mt-10">
                    <button 
                        onClick={displayInstructions}
                        disabled={instructionsList < 1}
                        className="w-[200px] bg-green-700 p-3 rounded-lg text-primaryTextClr text-lg disabled:bg-gray-400"
                    >
                        Display Instructions
                    </button>
                    <button 
                        onClick={saveInstructions}
                        className="w-[200px] bg-white border-2 border-green-700 p-3 rounded-lg text-secondaryTextClr text-lg disabled:bg-gray-400 disabled:text-primaryTextClr disabled:border-none"
                        >
                            Save for later
                    </button>
                </div>
            </div>
            </Dialog.Panel>
        </div>
            {/* Add instruction modal */}
            <Dialog open={showAddInstructionModal} onClose={() => setOpenInstructions(false)} className="relative z-50">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="p-5 w-full max-w-[550px] h-[250px] rounded-xl bg-blue-100">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="instruction"
                                    className="py-2 text-lg"
                                >
                                    Enter an instruction
                                </label>
                                <textarea
                                    name="instruction"
                                    id="instruction"
                                    rows={4}
                                    placeholder="e.g. Take out your reading book"
                                    className="p-2 rounded-lg border-2 border-gray-400"
                                    value={instruction}
                                    onChange={(e) => setInstruction(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end items-center gap-10">
                                <button onClick={() => setShowAddInstructionModal(false)}>Cancel</button>
                                <button onClick={addInstruction}>Add</button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Display instructions modal */}
            <Dialog open={displayInstructionsModal} onClose={() => setOpenInstructions(false)} className="relative z-50">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="p-5 w-full h-full rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center p-4">
                        <Dialog.Title className="font-bold text-6xl">{instructionTitle}</Dialog.Title>
                        <button onClick={() => setOpenInstructions(false)}>
                            <AiOutlineClose size={30} />
                        </button>
                    </div>
                    <div className="mt-10 p-4">
                        {instructionsList.map((instruction, index) => (
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
        </Dialog> 

        :
        
        <Dialog open={openInstructions} onClose={() => setOpenInstructions(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full max-w-[600px] h-[500px] overflow-auto rounded-xl bg-blue-100">
                <div className="flex justify-between items-center pb-4">
                    <Dialog.Title className="font-bold text-xl">Instructions</Dialog.Title>
                    <button onClick={() => setOpenInstructions(false)}>
                    <AiOutlineClose
                        size={28}
                        className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                    </button>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <button
                        onClick={handleInstructionsInputModal} 
                        className="w-full p-6 md:p-10 md:text-2xl text-center bg-buttonClr text-primaryTextClr rounded-lg hover:scale-[1.02] duration-300"
                    >
                        Create instructions
                    </button>

                    {/* Saved Instructions list */}
                    <div className="flex flex-col justify-center items-center h-full w-full">
                    {savedInstructions.map((savedInstruction, index) => (
                        <div key={index} className="w-full">
                            <div className="flex justify-between items-center gap-4">
                                <button 
                                    onClick={() => displaySavedInstructions(index)}
                                    className="p-4 border-2 border-gray-400 bg-white w-full text-lg rounded-lg mt-4"
                                >
                                    {savedInstruction.title}
                                </button>

                                <button onClick={() => deleteSavedInstruction(index)}
                                    className="mt-4">
                                    <AiOutlineClose size={25} />
                                </button>
                            </div>

                            {activeSavedInstruction === index && (
                                <Dialog open={showSavedInstructions} onClose={() => setOpenInstructions(false)} className="relative z-50">
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
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            </Dialog.Panel>
        </div>
        </Dialog>
  )
}

export default Instructions