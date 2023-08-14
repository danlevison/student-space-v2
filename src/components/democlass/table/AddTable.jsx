import React, {useContext, useState} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"

const AddTable = ({ isAddTableModalOpen, setIsAddTableModalOpen }) => {
    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")  
    
    const getSelectedStudent = async (e) => {
        try {
          const studentName = e.target.name
          
          // Update studentData with the new selected status for the student in demoClass
          const updatedStudentData = studentData.map((student) => {
            if (student.name === studentName) {
              return {
                ...student,
                tableData: { ...student.tableData, selected: !student.tableData?.selected || false },
              }
            }
            return student
          })
      
          // Set the updated student data to the state
          setStudentData(updatedStudentData)
      
          if (userUid && userClassName) {
            // User is in their own class context (Firebase)
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classDocumentRef = doc(classCollectionRef, userUid)
      
            // Update the Firestore document with the updated studentData (// Update studentData tableData property with the new selected status for the student in users class)
            await updateDoc(classDocumentRef, {
              studentData: updatedStudentData,
            })
          }
        } catch (error) {
          console.error('Error updating student information:', error)
        }
      }

      const handleAddTableSubmit = async (e) => {
        e.preventDefault()
        const tableName = e.target.tableName.value.trim() // removes empty spaces 
        const capitalisedTableName = tableName.charAt(0).toUpperCase() + tableName.slice(1)
        
        const existingTable = studentData.find((student) => student.tableData.tableName === capitalisedTableName)
      
        if (existingTable) {
          setAlert(true)
          setAlertMessage("A table with this name already exists!")
          return
        }
      
        // Update demoStudentData tableData locally in demoClass context
        const updatedStudentData = studentData.map((student) => {
          if (student.tableData.selected) {
            return { ...student, tableData: {...student.tableData, tableName: capitalisedTableName, isOnTable: true, selected: false } }
          }
          return student
        })
      
        setStudentData(updatedStudentData)
      
        if (userUid && userClassName) {
          try {
            // User is in their own class context (Firebase)
            const classCollectionRef = collection(db, "users", userUid, userClassName)
            const classDocumentRef = doc(classCollectionRef, userUid)
      
            // Update the Firestore document with the updated studentData
            await updateDoc(classDocumentRef, {
              studentData: updatedStudentData,
            })
          } catch (error) {
            console.error("Error updating tableData in user class collection:", error)
          }
        }
      
        e.target.reset() // Reset the form fields
        setIsAddTableModalOpen(false)
      }

  return (
    <>
        <Dialog
            open={isAddTableModalOpen}
            onClose={() => setIsAddTableModalOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                
                <Dialog.Panel className="p-5 w-full max-w-[1200px] h-full 2xl:h-auto overflow-auto rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">Add Table</Dialog.Title>
                        <button onClick={() => setIsAddTableModalOpen(false)}>
                            <AiOutlineClose size={28} className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"/>
                        </button>
                    </div>
                    <form onSubmit={handleAddTableSubmit} className="flex flex-col py-4">
                        <div className="flex flex-col items-center">
                            {alert ? <p className="font-bold text-xl text-red-500 pb-1">{alertMessage}</p> : <label htmlFor="tableName" className="text-xl pb-1">Table name</label>}
                            <input 
                              className={alert ? "w-full sm:w-[400px] border-2 border-red-500 rounded-lg p-2 outline-none" : "w-full sm:w-[400px] border-2 border-gray-400 rounded-lg p-2 outline-inputOutlineClr"} 
                              type="text" 
                              id="tableName" 
                              name="tableName" 
                              required 
                            />
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 items-center py-4">
                            {studentData.map((student) => (
                                <div key={student.uuid} className="flex flex-col items-center gap-2">
                                    <input 
                                        onChange={getSelectedStudent} 
                                        type="checkbox" 
                                        id={student.name} 
                                        name={student.name} 
                                        checked={student.tableData.selected}
                                        className="hidden peer"
                                        disabled={student.tableData.tableName ? true : false}
                                    />
                                    <label 
                                        htmlFor={student.name} 
                                        className="flex flex-col items-center w-28 cursor-pointer text-center bg-white p-4 shadow-lg rounded-xl peer-disabled:bg-gray-200 peer-checked:bg-green-200 peer-hover:scale-105 duration-300 select-none"
                                    >
                                        <Image 
                                          src={student.avatar} 
                                          alt="/" 
                                          width={40} 
                                          height={40} 
                                          className="select-none"
                                        />
                                        <span className="font-bold mt-1 text-lg">{student.name}</span>
                                        <span>{student.tableData.tableName}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-10 mt-4">
                            <button 
                                onClick={() => setIsAddTableModalOpen(false)} 
                                type="button" 
                                className="w-full text-sm sm:text-base sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300" 
                                aria-label="Cancel"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="w-full text-sm sm:text-base sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0" 
                                aria-label="Submit add student form"
                                disabled={!studentData.some((student) => student.tableData.selected)}
                            >
                                Add Table
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddTable