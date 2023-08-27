import React, {useContext, useState, useRef} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai"

const AddStudent = ({ isAddStudentModalOpen, setIsAddStudentModalOpen, avatars }) => {

    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [studentName, setStudentName] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const nameInputRef = useRef(null) 
    
    const handleInputChange = (e) => {
      setStudentName(e.target.value.trim())
    }
    
    const handleAddStudentSubmit = async (e) => {
      e.preventDefault()
      const randomIndex = Math.floor(Math.random() * avatars.length)
      const name = e.target.name.value.trim() // removes empty spaces
      const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1)
      const dob = e.target.dob.value
      const uuid = crypto.randomUUID()
      const existingStudent = studentData.find((student) => student.name === capitalisedName)
        
      if (existingStudent) {
        setAlert(true)
        setAlertMessage("A student with this name already exists!")
        return
      }
    
      const newStudent = {
        name: capitalisedName,
        dob: dob,
        points: 0,
        avatar: avatars[randomIndex],
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: uuid,
      }
    
      try {
        // Update demoStudentData and display added students in the demoClass
        const updatedStudentData = [...studentData, newStudent]
        setStudentData(updatedStudentData)
    
        if (userUid && userClassName) {
          // Get a reference to the document in the className subcollection
          const classCollectionRef = collection(db, "users", userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
        
          // Update the Firestore document with the updated studentData (Add new student in the users class)
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }
      } catch (error) {
        console.error('Error adding student to user class collection:', error)
      }
    
      e.target.reset() // Reset the form fields
      nameInputRef.current.focus()
      setAlert(false)
    }

  return (
    <>
        <Dialog
            open={isAddStudentModalOpen}
            onClose={() => setIsAddStudentModalOpen(false)}
            className="relative z-50"
            initialFocus={nameInputRef}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                
                <Dialog.Panel className="p-5 w-[400px] h-[300px] rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl capitalize">Add student</Dialog.Title>
                        <button onClick={() => setIsAddStudentModalOpen(false)}>
                            <AiOutlineClose size={28} className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"/>
                        </button>
                    </div>
                    <form onSubmit={handleAddStudentSubmit} className="flex flex-col py-4">
                        {alert ? <p className="font-bold text-red-500 pb-1">{alertMessage}</p> : <label htmlFor="name" className="pb-1">First name</label> }
                        <input
                          onChange={handleInputChange}  
                          className={alert ? "border-2 border-red-500 w-full rounded-lg p-2 outline-none" : "border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr"}
                          type="text" 
                          id="name" 
                          name="name"
                          ref={nameInputRef} 
                          required 
                        />

                        <div className="flex items-center gap-2 pt-4 relative">
                          <label htmlFor="dob">Date of birth</label>
                          <AiOutlineInfoCircle size={20} className="peer mb-1"/>
                          <span className="absolute w-auto p-2 min-w-max left-[-18px] sm:left-0 top-[-22px] rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left peer-hover:scale-100">
                            We use DOB to display students birthdays
                          </span>
                        </div>
                        <input
                          className="border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr" 
                          type="date" 
                          id="dob" 
                          name="dob" 
                          required 
                        />
                    
                        <button 
                          className="bg-buttonClr p-3 mt-4 rounded-lg text-primaryTextClr w-full hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0"
                          disabled={!studentName} 
                          aria-label="Submit add student form"
                        >
                          Add Student
                        </button>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddStudent