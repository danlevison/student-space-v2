import React, { useEffect, useState, useContext } from 'react'
import { auth, db } from '../../../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc, getDocs, collection, arrayUnion } from 'firebase/firestore'
import StudentDataContext from "@/StudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai'
import { CiEdit } from "react-icons/ci"
import AddInstructions from "./AddInstructions"
import DisplayInstructions from "./DisplayInstructions"
import DisplaySavedInstructions from "./DisplaySavedInstructions"
import EditSavedInstructions from "./EditSavedInstructions"

const Instructions = ({ openInstructions, setOpenInstructions }) => {
    // State variables for various modals and data
    const [showCreateInstructionsModal, setShowCreateInstructionsModal] = useState(false)
    const [showAddInstructionModalCreate, setShowAddInstructionModalCreate] = useState(false) // TODO: check if we need both states for add instruction
    const [showAddInstructionModalEdit, setShowAddInstructionModalEdit] = useState(false)
    const [showEditSavedInstructionsModal, setShowEditSavedInstructionsModal] = useState(false)
    const [displayInstructionsModal, setDisplayInstructionsModal] = useState(false)
    const [displaySavedInstructionsModal, setDisplaySavedInstructionsModal] = useState(false)
    const [instructionTitle, setInstructionTitle] = useState("")
    const [instruction, setInstruction] = useState("")
    const [instructionsList, setInstructionsList] = useState([])
    const [savedInstructions, setSavedInstructions] = useState([])
    const [activeSavedInstruction, setActiveSavedInstruction] = useState(null)
    const [isEditInstructionActive, setIsEditInstructionActive] = useState(false)
    
    const [user, loading] = useAuthState(auth)
    const { userUid, userClassName } = useContext(StudentDataContext)

    // Fetch the user's instructions data from the Firestore subcollection when userUid and className are available
    useEffect(() => {
        if (userUid && userClassName) {
          fetchInstructionData()
        }
      }, [userUid, userClassName])

    // Handlers for opening and closing modals
    const handleCreateInstructionsModal = () => {
        setShowCreateInstructionsModal(!showCreateInstructionsModal)
        setIsEditInstructionActive(false)
        setInstructionTitle("")
        setInstruction("")
        setInstructionsList([])
    }

    const handleAddInstructionModal = () => {
        isEditInstructionActive ? setShowAddInstructionModalEdit(true) : setShowAddInstructionModalCreate(true)
        setInstruction("")
    }

    const handleEditSavedInstruction = (savedInstruction, savedInstructionIndex) => {
        setIsEditInstructionActive(true)
        setShowEditSavedInstructionsModal(!showEditSavedInstructionsModal)
        setActiveSavedInstruction(savedInstructionIndex)
    }

    // Handling displaying saved instructions modal
    const displaySavedInstructions = (savedInstructionIndex) => {
        setDisplaySavedInstructionsModal(!displaySavedInstructionsModal)
        setActiveSavedInstruction(savedInstructionIndex)
    }

    // Adding an instruction to the list
    const addInstruction = () => {
        if (instruction.trim() !== "") {
            setInstructionsList([...instructionsList, instruction])
            setInstruction("")
        }
        setShowAddInstructionModalCreate(false)
    }

    // Removing an instruction from the list
    const removeInstruction = (index) => {
        // Remove the instruction from the instructionsList
        const updatedInstructionsList = instructionsList.filter((_, i) => i !== index)
        setInstructionsList(updatedInstructionsList)
    }

    const saveCurrentInstructions = async () => {
        try {
            let newInstructionSet = null
            if (!isEditInstructionActive && instructionsList.length > 0 || instructionTitle) {
                newInstructionSet = {
                    title: instructionTitle === "" ? instructionsList[0] : instructionTitle,
                    instructions: [...instructionsList]
                }

                setSavedInstructions(prevInstructions => [...prevInstructions, newInstructionSet])
            }

            if (userUid && userClassName) {
                const docRef = doc(db, 'users', user.uid)
                const classDocumentRef = doc(collection(docRef, "users class"), user.uid)

                // Add a new field to the class collection
                await updateDoc(classDocumentRef, {
                    instructionsData: arrayUnion(newInstructionSet)
                })
            } 
            
        } catch (error) {
            console.error("Error adding instruction data:", error)
        }
    }

    const fetchInstructionData = async () => {
        try {
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classSnapshot = await getDocs(classCollectionRef)
            const fbInstructionsData = classSnapshot.docs.map((doc) => doc.data().instructionsData).filter((data) => data !== null && data !== undefined) // Filter out null or undefined instructionsData
            setSavedInstructions(fbInstructionsData.flat()) // The flat() method is used to merge these arrays into a single array 
            
        } catch (error) {
            console.log('Error fetching instructions data from Firestore:', error)
        }
    }

    // Displaying instructions + saving them
    const displayInstructions = () => {
        setDisplayInstructionsModal(!displayInstructionsModal)
        saveCurrentInstructions()
    }

    // Saving instructions for later
    const saveInstructions = () => {
        saveCurrentInstructions()
    
        setShowCreateInstructionsModal(false)
        setIsEditInstructionActive(false)
        setInstructionTitle("")
        setInstruction("")
        setInstructionsList([])
    }

    // Reset modal and data states on openInstructions change
    useEffect(() => {
        setShowCreateInstructionsModal(false)
        setShowAddInstructionModalCreate(false)
        setShowAddInstructionModalEdit(false)
        setShowEditSavedInstructionsModal(false)
        setDisplayInstructionsModal(false)
        setDisplaySavedInstructionsModal(false)
        setIsEditInstructionActive(false)
        setInstructionTitle("")
        setInstruction("")
        setInstructionsList([])
    }, [openInstructions])

  return (
    showCreateInstructionsModal ?
    // Create instructions modal
        <Dialog open={showCreateInstructionsModal} onClose={() => setOpenInstructions(false)} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="p-5 w-full max-w-[600px] h-[500px] overflow-auto rounded-xl bg-blue-100">
                <div className="flex justify-between items-center pb-4">
                    <button onClick={() => setShowCreateInstructionsModal(false)}>
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
                        className="p-3 bg-buttonClr text-primaryTextClr mt-2 rounded-lg text-lg"
                    >
                        Add instruction
                    </button>
                    
                    <div className="mt-4">
                        {instructionsList.map((instruction, index) => (
                            <div key={index} className="flex justify-between items-center bg-white border-2 border-black rounded-lg p-3 mb-2">
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
                            disabled={instructionsList.length < 1}
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
            <AddInstructions 
                showAddInstructionModal={showAddInstructionModalCreate}
                setShowAddInstructionModal={setShowAddInstructionModalCreate}
                setOpenInstructions={setOpenInstructions}
                instruction={instruction}
                setInstruction={setInstruction}
                addInstruction={addInstruction}
            />
           
            {/* Display instructions modal */}
            <DisplayInstructions 
                displayInstructionsModal={displayInstructionsModal}
                setOpenInstructions={setOpenInstructions}
                instructionTitle={instructionTitle}
                instructionsList={instructionsList}
            />
        </Dialog>

        :

        // Instructions menu modal
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
                            onClick={handleCreateInstructionsModal} 
                            className="w-full p-6 md:p-10 text-xl sm:text-2xl text-center bg-buttonClr text-primaryTextClr rounded-lg hover:scale-[1.02] duration-300"
                        >
                            Create instructions
                        </button>

                        {/* Saved instructions list */}
                        {savedInstructions.length > 0 && (
                            <div className="flex flex-col justify-center items-center h-full w-full">
                            {savedInstructions.map((savedInstruction, index) => (
                                <div key={index} className="w-full">
                                    <div className="flex justify-between items-center gap-2">
                                        <button 
                                            onClick={() => displaySavedInstructions(index)}
                                            className="p-4 border-2 border-gray-400 bg-white w-full text-lg rounded-lg mt-4"
                                        >
                                            {savedInstruction.title}
                                        </button>

                                        <button onClick={() => handleEditSavedInstruction(savedInstruction, index)}
                                            className="mt-4">
                                            <CiEdit size={30} />
                                        </button>
                                    </div>
                                
                                {/* Edit saved instruction */}
                                {activeSavedInstruction === index && (
                                    <EditSavedInstructions
                                        showAddInstructionModalEdit={showAddInstructionModalEdit}
                                        setShowAddInstructionModalEdit={setShowAddInstructionModalEdit} 
                                        showEditSavedInstructionsModal={showEditSavedInstructionsModal}
                                        setShowEditSavedInstructionsModal={setShowEditSavedInstructionsModal}
                                        setOpenInstructions={setOpenInstructions}
                                        savedInstruction={savedInstruction}
                                        savedInstructionIndex={index}
                                        handleAddInstructionModal={handleAddInstructionModal}
                                        instruction={instruction}
                                        setInstruction={setInstruction}
                                        savedInstructions={savedInstructions}
                                        setSavedInstructions={setSavedInstructions}
                                        setIsEditInstructionActive={setIsEditInstructionActive}
                                        activeSavedInstruction={activeSavedInstruction}
                                    />
                                )}

                                {/* Display saved instructions modal */}
                                {activeSavedInstruction === index && (
                                    <DisplaySavedInstructions 
                                        displaySavedInstructionsModal={displaySavedInstructionsModal}
                                        setOpenInstructions={setOpenInstructions}
                                        savedInstruction={savedInstruction}
                                    />
                                )}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
  )
}

export default Instructions  