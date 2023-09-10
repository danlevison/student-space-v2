import React, {useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from "../../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import ClassAvatarMenu from "./ClassAvatarMenu"
import DeleteClassModal from "./DeleteClassModal"
import { toast } from "react-toastify"

const EditClass = ({ isEditClassModalOpen, setIsEditClassModalOpen, dbUserClassName, setDbUserClassName, setIsClassMade, classAvatar, setClassAvatar }) => {
    const [user, loading] = useAuthState(auth)
    const [newClassName, setNewClassName] = useState(dbUserClassName)
    const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false)
    const [newClassAvatar, setNewClassAvatar] = useState(classAvatar)

    const resetForm = () => {
        setNewClassName(dbUserClassName)
        setNewClassAvatar(classAvatar)
    }

    const updateClassName = (e) => {
        setNewClassName(e.target.value)
    }

    const handleClassInfoSubmit = async (e) => {
        const docRef = doc(db, "users", user.uid)  
        try {
            e.preventDefault()          
            await updateDoc(docRef, { className: newClassName.trim(), classAvatar: newClassAvatar})

            setDbUserClassName(newClassName)
            setClassAvatar(newClassAvatar)
            setIsEditClassModalOpen(false)
            
        } catch (error) {
            console.error("Class name could not be updated", error)
        }
        toast.success("Class edited successfully!")
    }

    const handleDeleteClassModal = () => {
        setOpenDeleteClassModal(!openDeleteClassModal)
    }

    return (
        <Dialog 
            open={isEditClassModalOpen} 
            onClose={() => {
                setIsEditClassModalOpen(false)
                resetForm()
            }}  
            className="relative z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="p-5 w-full h-[500px] sm:w-[500px] rounded-xl bg-blue-100">
              <div className="flex justify-between items-center">
                <Dialog.Title className="font-bold text-xl">Edit {dbUserClassName}</Dialog.Title>
                <button 
                    onClick={() => {
                        setIsEditClassModalOpen(false)
                        resetForm()
                    }}
                >
                  <AiOutlineClose
                    size={28}
                    className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                  />
                </button>
              </div>

              <form onSubmit={handleClassInfoSubmit} className="flex flex-col justify-around h-full mt-2">
                <div className="flex justify-center items-center">
                    <ClassAvatarMenu newClassAvatar={newClassAvatar} setNewClassAvatar={setNewClassAvatar} />
                </div>
                    <div>
                        <label htmlFor="classroomName" className="pb-1 text-xl">Class name</label>
                        <input
                            className="border-2 border-gray-400 w-full rounded-lg p-3 outline-inputOutlineClr text-xl"
                            type="text"
                            id="classroomName"
                            name="classroomName"
                            required
                            value={newClassName}
                            onChange={updateClassName}
                        />
                    </div>

                    <div className="flex flex-row-reverse justify-between items-center mt-14">
                        <div className="flex items-center justify-center gap-2">
                            <button 
                                onClick={() => {
                                    setIsEditClassModalOpen(false)
                                    resetForm()
                                }}
                                type="button" 
                                className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={!newClassName.trim()}
                                className="font-bold text-sm bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                            >
                                Save
                            </button>
                        </div>
                        <button
                            onClick={handleDeleteClassModal} 
                            type="button" 
                            className="w-[110px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-primaryTextClr text-sm font-bold"
                        >
                            Delete class
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
        <DeleteClassModal 
            openDeleteClassModal={openDeleteClassModal} 
            setOpenDeleteClassModal={setOpenDeleteClassModal} 
            setDbUserClassName={setDbUserClassName}
            setIsClassMade={setIsClassMade}
            setIsEditClassModalOpen={setIsEditClassModalOpen}
        />
    </Dialog>
)
}

export default EditClass