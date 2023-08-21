import React, {useState, useContext, useEffect} from 'react'
import { db, auth } from '../../../../utils/firebase'
import { doc, updateDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import StudentDataContext from "@/StudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai'
import AddInstructions from "./AddInstructions"

const EditSavedInstructions = ({ showAddInstructionModalEdit, setShowAddInstructionModalEdit, showEditSavedInstructionsModal, setShowEditSavedInstructionsModal, setOpenInstructions, savedInstruction, savedInstructionIndex, handleAddInstructionModal, instruction, savedInstructions, setSavedInstructions, setInstruction, setIsEditInstructionActive, activeSavedInstruction }) => {
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [user, loading] = useAuthState(auth)  
    const [tempSavedInstructions, setTempSavedInstructions] = useState(savedInstructions || [])
 
    const resetTempInstructions = () => {
        setTempSavedInstructions(savedInstructions)
    }

    const updateSavedInstructionTitle = (e) => {
        const updatedTitle = e.target.value

        const updatedSavedInstructions = tempSavedInstructions.map((instruction, i) => {
            if (i === activeSavedInstruction) {
                return {...instruction, title: updatedTitle }
            }
            return instruction
        })
        setTempSavedInstructions(updatedSavedInstructions)
    }

    const addInstruction = () => {
        if (instruction.trim() !== "") {
            const updatedSavedInstructions = tempSavedInstructions.map((instructionSet, i) => {
                if (i === activeSavedInstruction) {
                    return {...instructionSet, instructions: [...instructionSet.instructions, instruction]}
                }
                return instructionSet
            })
            setTempSavedInstructions(updatedSavedInstructions)
            setInstruction("")
        }
        setShowAddInstructionModalEdit(false)
    }

    const removeInstruction = (index) => {
        const updatedSavedInstructions = tempSavedInstructions.map((instructionSet, i) => {
            if (i === activeSavedInstruction) {
                const updatedInstructions = instructionSet.instructions.filter((_, idx) => idx !== index)
                return { ...instructionSet, instructions: updatedInstructions }
            }
            return instructionSet
        })

        setTempSavedInstructions(updatedSavedInstructions)
    }

    const handleEditInstructionSubmit = async (e) => {
        e.preventDefault()
        try {
            setSavedInstructions(tempSavedInstructions)
            
            if (userUid && userClassName) {
                const docRef = doc(db, 'users', user.uid)
                const classDocumentRef = doc(collection(docRef, "users class"), user.uid)
    
                await updateDoc(classDocumentRef, {
                    instructionsData: tempSavedInstructions
                })
            }

        } catch (error) {
            console.error("Error saving changes", error)
        }

        setShowEditSavedInstructionsModal(!showEditSavedInstructionsModal)
    }
    
    const deleteSavedInstruction = async (savedInstructionIndex) => {
        try {
            const updatedInstructions = savedInstructions.filter((_, i) => i !== savedInstructionIndex)
            setSavedInstructions(updatedInstructions)
            setTempSavedInstructions(updatedInstructions)

            if (userUid && userClassName) {
                const docRef = doc(db, 'users', user.uid)
                const classDocumentRef = doc(collection(docRef, "users class"), user.uid)
    
                await updateDoc(classDocumentRef, {
                    instructionsData: updatedInstructions
                })
            }
        } catch (error) {
            console.error("Error deleting instruction", error)
        }
        
        
        setShowEditSavedInstructionsModal(!showEditSavedInstructionsModal)
        setIsEditInstructionActive(false)
    }
    
    return (
    <Dialog 
        open={showEditSavedInstructionsModal} 
        onClose={() => {
            setOpenInstructions(false)
            resetTempInstructions()
        }} 
        className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full max-w-[600px] h-[500px] overflow-auto rounded-xl bg-blue-100">
                <div className="flex justify-between items-center pb-4">
                    <button onClick={() => {
                        setShowEditSavedInstructionsModal(false)
                        resetTempInstructions()
                    }}>
                        <AiOutlineArrowLeft size={25} />
                    </button>
                    <Dialog.Title className="font-bold text-xl text-center">Edit {savedInstruction.title}</Dialog.Title>
                    <button onClick={() => setOpenInstructions(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                    </button>
                </div>
                    
                <form onSubmit={handleEditInstructionSubmit} className="flex flex-col justify-center">
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
                            value={tempSavedInstructions[activeSavedInstruction].title}
                            onChange={updateSavedInstructionTitle} 
                        />
                    </div>
                    <button
                        onClick={() => handleAddInstructionModal()}
                        type="button"
                        className="p-3 bg-buttonClr text-primaryTextClr mt-2 rounded-lg text-lg"
                    >
                        Add instruction
                    </button>
                                        
                    <div className="mt-4">
                        {/* Display saved instructions */}
                        {tempSavedInstructions[activeSavedInstruction].instructions.map((instruction, instructionIndex) => (
                            <div key={instructionIndex} className="flex justify-between items-center w-full bg-white border-2 border-black rounded-lg p-3 mb-2">
                                <p className="text-lg">{`${instructionIndex + 1}. ${instruction}`}</p>
                                <button 
                                    onClick={() => removeInstruction(instructionIndex)} 
                                    type="button"
                                >
                                    <AiOutlineClose size={25} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 mt-10">
                        <button
                            type="submit"
                            className="w-[200px] bg-white border-2 border-green-700 p-3 rounded-lg text-secondaryTextClr text-lg disabled:bg-gray-400 disabled:text-primaryTextClr disabled:border-none"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => deleteSavedInstruction(savedInstructionIndex)}
                            type="button"
                            className="w-[200px] bg-white border-2 border-red-600 p-3 rounded-lg text-secondaryTextClr text-lg disabled:bg-gray-400 disabled:text-primaryTextClr disabled:border-none"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
        <AddInstructions 
            showAddInstructionModal={showAddInstructionModalEdit}
            setShowAddInstructionModal={setShowAddInstructionModalEdit}
            setOpenInstructions={setOpenInstructions}
            instruction={instruction}
            setInstruction={setInstruction}
            addInstruction={addInstruction}
        />                   
    </Dialog>
  )
}

export default EditSavedInstructions