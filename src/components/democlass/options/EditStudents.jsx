import React, {useState, useContext, useEffect, Fragment} from 'react'
import Image from "next/image"
import { Menu, Transition } from '@headlessui/react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiFillCaretDown } from 'react-icons/ai'
import sheepAvatar from "../../../../public/assets/avatars/sheep.svg"
import monkeyAvatar from "../../../../public/assets/avatars/monkey.svg"
import rabbitAvatar from "../../../../public/assets/avatars/rabbit.svg"
import frogAvatar from "../../../../public/assets/avatars/frog.svg"
import snakeAvatar from "../../../../public/assets/avatars/snake.svg"
import chickenAvatar from "../../../../public/assets/avatars/chicken.svg"
import giraffeAvatar from "../../../../public/assets/avatars/giraffe.svg"
import pandaAvatar from "../../../../public/assets/avatars/panda.svg"
import penguinAvatar from "../../../../public/assets/avatars/penguin.svg"
import dogAvatar from "../../../../public/assets/avatars/dog.svg"
import cheetahAvatar from "../../../../public/assets/avatars/cheetah.svg"
import lionAvatar from "../../../../public/assets/avatars/lion.svg"
import otterAvatar from "../../../../public/assets/avatars/otter.svg"

const EditStudents = ({ isEditStudentsModalOpen, setIsEditStudentsModalOpen }) => {
    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [openStudentInfo, setOpenStudentInfo] = useState(false)
    const [checkDeleteStudentModal, setCheckDeleteStudentModal] = useState(false) 
    const [selectedStudent, setSelectedStudent] = useState({
        name: "",
        dob: ""
      })
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [newStudentAvatar, setNewStudentAvatar] = useState("")

    const menuItemData = [
      { imageSrc: sheepAvatar, onClick: () => setNewStudentAvatar(sheepAvatar) },
      { imageSrc: monkeyAvatar, onClick: () => setNewStudentAvatar(monkeyAvatar) },
      { imageSrc: rabbitAvatar, onClick: () => setNewStudentAvatar(rabbitAvatar) },
      { imageSrc: frogAvatar, onClick: () => setNewStudentAvatar(frogAvatar) },
      { imageSrc: snakeAvatar, onClick: () => setNewStudentAvatar(snakeAvatar) },
      { imageSrc: chickenAvatar, onClick: () => setNewStudentAvatar(chickenAvatar) },
      { imageSrc: giraffeAvatar, onClick: () => setNewStudentAvatar(giraffeAvatar) },
      { imageSrc: pandaAvatar, onClick: () => setNewStudentAvatar(pandaAvatar) },
      { imageSrc: penguinAvatar, onClick: () => setNewStudentAvatar(penguinAvatar) },
      { imageSrc: dogAvatar, onClick: () => setNewStudentAvatar(dogAvatar) },
      { imageSrc: cheetahAvatar, onClick: () => setNewStudentAvatar(cheetahAvatar) },
      { imageSrc: lionAvatar, onClick: () => setNewStudentAvatar(lionAvatar) },
      { imageSrc: otterAvatar, onClick: () => setNewStudentAvatar(otterAvatar) },
    ]
    
    useEffect(() => {
      setAlert(false)
    }, [openStudentInfo])

    const handleStudentModal = (student) => {
      // Format the student's dob to "yyyy-MM-dd"
      const formattedDob = (() => {
        const dobDate = new Date(student.dob)
        return `${dobDate.getFullYear()}-${(dobDate.getMonth() + 1).toString().padStart(2, '0')}-${dobDate.getDate().toString().padStart(2, '0')}`
      })()
    
      setSelectedStudent({
        ...student,
        dob: formattedDob
      })

      setNewStudentAvatar(student.avatar)
    
      setOpenStudentInfo(true)
    }

    const updateStudentName = (e) => {
        setSelectedStudent((prevSelectedStudent) => ({
            ...prevSelectedStudent,
            name: e.target.value
          }))
    }

    const updateStudentDob = (e) => {
      setSelectedStudent((prevSelectedStudent) => ({
        ...prevSelectedStudent,
        dob: e.target.value
      }))
    }

    const handleStudentInfoSubmit = async (e) => {
      try {
        e.preventDefault()
        const updatedName = e.target.name.value.trim() // removes empty spaces
        const updatedCapitalisedName = updatedName.charAt(0).toUpperCase() + updatedName.slice(1)
        const updatedDob = e.target.dob.value 

        const existingStudent = studentData.find((student) => student.name === updatedCapitalisedName)
        
        if (existingStudent && existingStudent.uuid !== selectedStudent.uuid) {
          setAlert(true)
          setAlertMessage("A student with this name already exists!")
          e.target.name.value = updatedCapitalisedName
          return
        }

        // Update the student name, dob and avatar in the demoClass
        const updatedStudentData = studentData.map((student) => {
          if (student.uuid === selectedStudent.uuid) {
            return { ...student, name: updatedCapitalisedName, dob: updatedDob, avatar:newStudentAvatar }
          }
          return student
        })
      
        setStudentData(updatedStudentData) // Update the local state with the updated student data
        
        if (userUid && userClassName) {
          // User is in their own class context (Firebase)
          const classCollectionRef = collection(db, 'users', userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
        
          // Update the Firestore document with the updated studentData (Updates student name in users class)
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }
        
        setOpenStudentInfo(false)
        } catch (error) {
            console.error('Error updating student information:', error)
        }
    }

    const removeStudent = async () => {
      try {
          // Filter out the student with the same UUID as the selectedStudent
          const updatedDemoStudentData = studentData.filter((student) => student.uuid !== selectedStudent.uuid)
          // Removes student from demoClass
          setStudentData(updatedDemoStudentData)
          
          if (userUid && userClassName) {
          // User is in their own class context (Firebase)
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classDocumentRef = doc(classCollectionRef, userUid)
          
            // Update the Firestore document with the updated studentData (Removes student from users class)
            await updateDoc(classDocumentRef, {
              studentData: updatedDemoStudentData,
            })
          }
          
        } catch (error) {
          console.error('Error removing student:', error)
        }
        setOpenStudentInfo(false)
        setCheckDeleteStudentModal(false)
      }

    return (
        <>
          <Dialog
            open={isEditStudentsModalOpen}
            onClose={() => setIsEditStudentsModalOpen(false)}
            className="relative z-40"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
      
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="p-5 w-full max-w-[800px] rounded-xl bg-modalBgClr">
                <div className="flex justify-between items-center gap-6">
                  <Dialog.Title className="font-bold text-xl">Edit Students</Dialog.Title>
                  <button onClick={() => setIsEditStudentsModalOpen(false)}>
                    <AiOutlineClose
                      size={28}
                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                  </button>
                </div>
                {studentData.length === 0 ? (
                  <div className="flex justify-center items-center h-full min-h-[300px] text-center">
                    <p className="text-xl">No student data available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 items-start h-auto max-h-[370px] overflow-auto mt-4 p-4">
                    {studentData.map((student) => (
                      <button
                        key={student.uuid}
                        onClick={() => handleStudentModal(student)}
                        className="text-center text-lg bg-white p-4 shadow-lg rounded-xl hover:scale-105 duration-300 break-words"
                      > 
                        {student.name}
                      </button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </div>

            {/* Student Info Modal */}
            {openStudentInfo && (
                <Dialog
                open={openStudentInfo}
                onClose={() => setOpenStudentInfo(false)}
                className="relative z-50"
                >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col p-5 w-full max-w-[500px] h-[500px] rounded-xl bg-modalBgClr">
                      <div className="flex justify-between items-center pb-2 z-10">
                          <Dialog.Title className="font-bold text-xl">{selectedStudent.name}</Dialog.Title>
                          <button onClick={() => setOpenStudentInfo(false)}>
                            <AiOutlineClose
                                size={28}
                                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                            />
                          </button>
                      </div>
                      <form onSubmit={handleStudentInfoSubmit} className="flex flex-col justify-between h-full">
                        {/* Student Avatar menu */}
                        <Menu as="div" className="inline-block mt-[-2em]">
                        <div>
                            <Menu.Button 
                                type="button" 
                                className="relative mt-10 mx-auto flex justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <Image 
                                  src={newStudentAvatar}
                                  alt="/"
                                  width={80}
                                  height={80}
                                />
                                <AiFillCaretDown
                                    className="absolute bottom-[-1em] text-iconClr"
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

                        <div>
                          <div className="flex flex-col">
                            {alert ?
                              <p className="font-bold text-red-500 pb-1 text-lg">{alertMessage}</p> : <label htmlFor="name" className="pb-1 text-lg">First name</label> }
                              <input
                                className={alert ? "border-2 border-red-500 w-full rounded-lg p-3 outline-none" : "border-2 border-gray-400 w-full rounded-lg p-3 outline-inputOutlineClr"}
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={selectedStudent.name}
                                onChange={updateStudentName}
                              />
                          </div>
                            <div className="flex flex-col mt-4">
                              <label htmlFor="dob" className="pt-3 text-lg">Date of birth</label>
                              <input
                                className="border-2 border-gray-400 w-full rounded-lg p-3 outline-inputOutlineClr" 
                                type="date"
                                id="dob"
                                name="dob"
                                required
                                value={selectedStudent.dob}
                                onChange={updateStudentDob}
                              />
                            </div>
                        </div> 
                            
                          <div className="flex flex-col sm:flex-row-reverse items-center">
                              <div className="flex items-center justify-center gap-2">
                                  <button 
                                    onClick={() => setOpenStudentInfo(false)} 
                                    type="button" 
                                    className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    disabled={!selectedStudent.name.trim()} 
                                    className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                  >
                                    Save
                                  </button>
                              </div>
                              <button 
                                onClick={() => setCheckDeleteStudentModal(!checkDeleteStudentModal)} 
                                type="button" 
                                className="w-full sm:w-[230px] sm:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-sm text-primaryTextClr font-bold mt-3 sm:mt-0"
                              >
                                Remove student from class
                              </button>
                          </div>
                      </form>
                    </Dialog.Panel>
                </div>
                  <Dialog
                        open={checkDeleteStudentModal}
                        onClose={() => setCheckDeleteStudentModal(false)}
                        className="relative z-[100]"
                        >
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
                
                        {/* Full-screen container to center the panel */}
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] h-auto overflow-auto rounded-xl bg-modalBgClr">
                              <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                                <Dialog.Title className="font-bold text-lg">Remove {selectedStudent.name} from the class?</Dialog.Title>
                                <button onClick={() => setCheckDeleteStudentModal(false)}>
                                  <AiOutlineClose
                                      size={28}
                                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                                  />
                                </button>
                              </div>

                              <div className="flex flex-col items-center">
                                <p className="text-sm font-bold text-red-500 text-center py-6">Do you want to remove this student from your class? This will remove all information for this student. It can't be undone.</p>
                                <div className="flex justify-evenly items-center w-full border-t border-gray-400">
                                  <button 
                                    onClick={() => setCheckDeleteStudentModal(false)}
                                    className="bg-modalBgClr hover:bg-white rounded-xl py-2 px-3 text-buttonClr font-bold mt-4"
                                    >
                                    Cancel
                                  </button>
                                  <button 
                                  onClick={removeStudent}
                                  className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-5 text-primaryTextClr font-bold mt-4"
                                  >
                                    Remove student
                                  </button>
                                </div>
                              </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Dialog>
            )}
          </Dialog>
      
        </>
      )
}

export default EditStudents