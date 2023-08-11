import React, {useContext, useState} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'

const EditClass = ({ isEditClassModalOpen, setIsEditClassModalOpen, dbUserClassName, setDbUserClassName, setIsClassMade }) => {
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [newClassName, setNewClassName] = useState(dbUserClassName)
    const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false)

    const updateClassName = (e) => {
        setNewClassName(e.target.value)
    }

    const handleClassInfoSubmit = async (e) => {
        try {
            e.preventDefault()
            const docRef = doc(db, "users", userUid)
            await updateDoc(docRef, { className: newClassName.trim()})

            setDbUserClassName(newClassName)
            setIsEditClassModalOpen(false)
            
        } catch (error) {
            console.error("Class name could not be updated", error)
        }
    }

    const handleDeleteClassModal = () => {
        setOpenDeleteClassModal(!openDeleteClassModal)
    }

    const deleteClass = async () => {
        try {
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classDocumentRef = doc(classCollectionRef, userUid)
            const docRef = doc(db, "users", userUid)
            
            await deleteDoc(classDocumentRef)
            await updateDoc(docRef, { className: "", isClassMade: false})

            setDbUserClassName("")
            setIsClassMade(false)
            setOpenDeleteClassModal(false)
            setIsEditClassModalOpen(false)
        } catch (error) {
            console.log("Error deleting class", error)
        }
    }

    return (
        <Dialog open={isEditClassModalOpen} onClose={() => setIsEditClassModalOpen(false)} className="relative z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full h-auto sm:w-[500px] rounded-xl bg-blue-100">
              <div className="flex justify-between items-center pb-4">
                <Dialog.Title className="font-bold text-xl">Edit Class</Dialog.Title>
                <button onClick={() => setIsEditClassModalOpen(false)}>
                  <AiOutlineClose
                    size={28}
                    className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                  />
                </button>
              </div>

              <form onSubmit={handleClassInfoSubmit}>
                    <label htmlFor="classroomName" className="pb-1">Class name</label>
                    <input
                        className="border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr"
                        type="text"
                        id="classroomName"
                        name="classroomName"
                        required
                        value={newClassName}
                        onChange={updateClassName}
                    />

                    <div className="flex flex-col md:flex-row items-center mt-5">
                        <button
                            onClick={handleDeleteClassModal} 
                            type="button" 
                            className="md:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold"
                        >
                            Delete class
                        </button>
                        <div className="flex items-center justify-center gap-2 mt-3 md:mt-0">
                            <button 
                                onClick={() => setIsEditClassModalOpen(false)} 
                                type="button" 
                                className="bg-modalBgClr hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={!newClassName.trim()}
                                className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-3 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                            >
                                Save
                            </button>
                        </div>
                    </div>
              </form>
            </Dialog.Panel>
          </div>

          {/* Reset class Modal */}
          {openDeleteClassModal && (
                <Dialog
                open={openDeleteClassModal}
                onClose={() => setOpenDeleteClassModal(false)}
                className="relative z-50"
                >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] h-auto rounded-xl bg-modalBgClr">
                      <div className="flex justify-between items-center pb-2">
                          <Dialog.Title className="font-bold text-xl">Delete Class</Dialog.Title>
                          <button onClick={() => setOpenDeleteClassModal(false)}>
                          <AiOutlineClose
                              size={28}
                              className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                          />
                          </button>
                      </div>
                      
                      <div>
                        <p className="text-lg font-bold text-red-400 mt-4 text-center">Warning: Deleting your class will permanently remove all class data! This action cannot be reversed.</p>
                        <div className="flex justify-end items-center gap-4 mt-6">
                            <button 
                                onClick={() => setOpenDeleteClassModal(false)}
                                className="bg-modalBgClr hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteClass}
                                className="bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold"
                            >
                                Delete your class
                            </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                </div>
                </Dialog>
            )} 
        </Dialog>
      )
}

export default EditClass