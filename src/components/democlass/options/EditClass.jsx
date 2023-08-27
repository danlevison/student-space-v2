import React, {Fragment, useContext, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image"
import StudentDataContext from "@/StudentDataContext"
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiFillCaretDown } from 'react-icons/ai'
import bagAvatar from "../../../../public/assets/avatars/bag.svg"
import origamiAvatar from "../../../../public/assets/avatars/origami.svg"
import bookBagAvatar from "../../../../public/assets/avatars/bookbag.svg"
import glueAvatar from "../../../../public/assets/avatars/glue.svg"
import rulerAvatar from "../../../../public/assets/avatars/ruler.svg"
import scissorsAvatar from "../../../../public/assets/avatars/scissors.svg"
import sketchbookAvatar from "../../../../public/assets/avatars/sketchbook.svg"
import compassAvatar from "../../../../public/assets/avatars/compass.svg"
import footballAvatar from "../../../../public/assets/avatars/football.svg"
import photosynthesisAvatar from "../../../../public/assets/avatars/photosynthesis.svg"
import hourglassAvatar from "../../../../public/assets/avatars/hourglass.svg"
import solarSystemAvatar from "../../../../public/assets/avatars/solar-system.svg"

const EditClass = ({ isEditClassModalOpen, setIsEditClassModalOpen, dbUserClassName, setDbUserClassName, setIsClassMade, classAvatar, setClassAvatar }) => {
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [user, loading] = useAuthState(auth)
    const [newClassName, setNewClassName] = useState(dbUserClassName)
    const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false)
    const [newClassAvatar, setNewClassAvatar] = useState(classAvatar)

    const resetForm = () => {
        setNewClassName(dbUserClassName)
        setNewClassAvatar(classAvatar)
    }
    
    const menuItemData = [
        { imageSrc: origamiAvatar, onClick: () => setNewClassAvatar(origamiAvatar) },
        { imageSrc: bagAvatar, onClick: () => setNewClassAvatar(bagAvatar) },
        { imageSrc: glueAvatar, onClick: () => setNewClassAvatar(glueAvatar) },
        { imageSrc: scissorsAvatar, onClick: () => setNewClassAvatar(scissorsAvatar) },
        { imageSrc: rulerAvatar, onClick: () => setNewClassAvatar(rulerAvatar) },
        { imageSrc: bookBagAvatar, onClick: () => setNewClassAvatar(bookBagAvatar) },
        { imageSrc: sketchbookAvatar, onClick: () => setNewClassAvatar(sketchbookAvatar) },
        { imageSrc: compassAvatar, onClick: () => setNewClassAvatar(compassAvatar) },
        { imageSrc: footballAvatar, onClick: () => setNewClassAvatar(footballAvatar) },
        { imageSrc: photosynthesisAvatar, onClick: () => setNewClassAvatar(photosynthesisAvatar) },
        { imageSrc: hourglassAvatar, onClick: () => setNewClassAvatar(hourglassAvatar) },
        { imageSrc: solarSystemAvatar, onClick: () => setNewClassAvatar(solarSystemAvatar) },
      ]

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
    }

    const handleDeleteClassModal = () => {
        setOpenDeleteClassModal(!openDeleteClassModal)
    }

    const deleteClass = async () => {
        try {
            const docRef = doc(db, "users", user.uid)
            if (userUid && userClassName) {
                // User has created their own class (Firebase)
                const classCollectionRef = collection(db, 'users', userUid, userClassName)
                const classDocumentRef = doc(classCollectionRef, userUid)

                await deleteDoc(classDocumentRef)
                await updateDoc(docRef, { className: "", isClassMade: false, classAvatar: bagAvatar}) 
            }

            setDbUserClassName("")
            setIsClassMade(false)
            setOpenDeleteClassModal(false)
            setIsEditClassModalOpen(false)
        } catch (error) {
            console.log("Error deleting class", error)
        }
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

              <form onSubmit={handleClassInfoSubmit} className="flex flex-col justify-around h-full">
                <div className="flex justify-center items-center">

                        {/* Class Avatar menu */}
                        <Menu as="div" className="inline-block mt-[-2em]">
                        <div>
                            <Menu.Button 
                                type="button" 
                                className="relative inline-flex w-full items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <Image
                                className="rounded-xl border-2 border-black bg-white p-3" 
                                src={newClassAvatar}
                                alt={"Class avatar"}
                                width={90}
                                height={90}
                            />
                            <AiFillCaretDown
                                className="absolute bottom-0 text-iconClr"
                                size={15}
                                aria-hidden="true"
                            /> 
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items 
                                className="absolute h-[320px] overflow-auto w-[80%] max-w-[420px] left-[50%] translate-x-[-50%] grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mt-2 p-4 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                            {menuItemData.map((menuItem, index) => (
                                <Menu.Item key={index} className="w-full">
                                    <button 
                                        onClick={menuItem.onClick} 
                                        type="button" 
                                        className="group flex justify-center items-center rounded-xl border-2 border-black p-2 hover:scale-105 duration-300"
                                    >
                                    <Image
                                        src={menuItem.imageSrc}
                                        alt="/"
                                        width={60}
                                        height={60}
                                        aria-hidden="true"
                                    />
                                </button>
                            </Menu.Item>
                        ))}
                        </Menu.Items>
                    </Transition>
                    </Menu>

                </div>
                    <div>
                        <label htmlFor="classroomName" className="pb-1 text-xl">Class name</label>
                        <input
                            className="border-2 border-gray-400 w-full rounded-lg p-4 outline-inputOutlineClr text-xl"
                            type="text"
                            id="classroomName"
                            name="classroomName"
                            required
                            value={newClassName}
                            onChange={updateClassName}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row-reverse justify-end items-center mt-5">
                        <div className="flex items-center justify-center gap-2">
                            <button 
                                onClick={() => {
                                    setIsEditClassModalOpen(false)
                                    resetForm()
                                }}
                                type="button" 
                                className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm sm:text-lg"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={!newClassName.trim()}
                                className="text-sm sm:text-lg font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                            >
                                Save
                            </button>
                        </div>
                        <button
                            onClick={handleDeleteClassModal} 
                            type="button" 
                            className="w-full sm:w-[180px] sm:mr-auto mt-3 sm:mt-0 bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm sm:text-lg text-primaryTextClr font-bold"
                        >
                            Delete class
                        </button>
                    </div>
              </form>
            </Dialog.Panel>
          </div>

          {/* Delete class Modal */}
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
                        <div className="flex justify-evenly items-center mt-6">
                            <button 
                                onClick={() => setOpenDeleteClassModal(false)}
                                className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteClass}
                                className="bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-sm text-primaryTextClr font-bold"
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