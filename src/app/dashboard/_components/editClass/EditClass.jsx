import React, {useState, useEffect, useContext} from 'react'
import StudentDataContext from "@/context/StudentDataContext"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "@/utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import ClassAvatarMenu from "./ClassAvatarMenu"
import DeleteClassModal from "./DeleteClassModal"
import { toast } from "react-toastify"

const EditClass = ({ isEditClassModalOpen, setIsEditClassModalOpen, classData }) => {
    const { userUid } = useContext(StudentDataContext)
    const [userClassName, setUserClassName] = useState(classData?.className || "")
    const [userClassAvatar, setUserClassAvatar] = useState(classData?.classAvatar || "")
    const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false)

    // update state when classData prop changes
  useEffect(() => {
    setUserClassName(classData?.className || "")
    setUserClassAvatar(classData?.classAvatar || "") 
  }, [classData])

    const updateClassName = (e) => {
        setUserClassName(e.target.value)
    }

    const handleClassInfoSubmit = async (e) => {
        e.preventDefault()
        try {
            if(classData.classId) {
                const docRef = doc(db, "users", userUid, "classes", classData.classId)          
                await updateDoc(docRef, { className: userClassName.trim(), classAvatar: userClassAvatar})
            }
            setUserClassName(userClassName)
            setUserClassAvatar(userClassAvatar)

        } catch (error) {
            console.error("Class name could not be updated", error)
        }

        setIsEditClassModalOpen(false)
        toast.success("Class edited successfully!")
    }

    const resetForm = () => {
        setUserClassName(classData.className || "")
        setUserClassAvatar(classData.classAvatar || "")
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

            <Dialog.Panel className="p-5 w-full max-w-[500px] h-full max-h-[450px] min-h-[30vh] rounded-xl bg-blue-100 overflow-auto">
              <div className="flex justify-between items-center">
                <Dialog.Title className="font-bold text-xl">Edit {userClassName}</Dialog.Title>
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

              <form onSubmit={handleClassInfoSubmit} className="flex flex-col mt-16">
                <div className="flex justify-center items-center">
                    <ClassAvatarMenu userClassAvatar={userClassAvatar} setUserClassAvatar={setUserClassAvatar} />
                </div>
                    <label htmlFor="classroomName" className="pb-1 text-xl">Class name</label>
                    <input
                        className="border-2 border-gray-400 w-full rounded-lg p-3 outline-inputOutlineClr text-xl"
                        type="text"
                        id="classroomName"
                        name="classroomName"
                        value={userClassName}
                        onChange={updateClassName}
                        required
                    />
                    <div className="flex flex-row-reverse justify-between items-center pt-32">
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
                                // disabled={!userClassName.trim()}
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
            setIsEditClassModalOpen={setIsEditClassModalOpen}
            classData={classData}
        />
    </Dialog>
)
}

export default EditClass