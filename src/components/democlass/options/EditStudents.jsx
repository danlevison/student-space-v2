import React, {useState, useContext, useEffect} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditStudents = ({ isEditStudentsModalOpen, setIsEditStudentsModalOpen }) => {
    const [openStudentInfo, setOpenStudentInfo] = useState(false) 
    const [selectedStudent, setSelectedStudent] = useState({
        name: "",
        dob: ""
      })
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    
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

        // Update the student name and dob in the demoClass
        const updatedStudentData = studentData.map((student) => {
          if (student.uuid === selectedStudent.uuid) {
            return { ...student, name: updatedCapitalisedName, dob: updatedDob }
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
          
          setOpenStudentInfo(false)
          } catch (error) {
            console.error('Error removing student:', error)
          }
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
              <Dialog.Panel className="p-5 w-full max-w-[500px] h-[365px] rounded-xl bg-modalBgClr">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="font-bold text-xl">Edit Students</Dialog.Title>
                  <button onClick={() => setIsEditStudentsModalOpen(false)}>
                    <AiOutlineClose
                      size={28}
                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                  </button>
                </div>
                {studentData.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-xl">No student data available</p>
                  </div>
                ) : (
                  <div className="overflow-auto h-5/6 mt-4">
                    {studentData.map((student) => (
                      <button
                        key={student.uuid}
                        onClick={() => handleStudentModal(student)}
                        className="block w-full bg-gray-100 hover:bg-gray-400 border-b border-gray-400 py-2"
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
                    <Dialog.Panel className="flex flex-col p-5 w-full max-w-[500px] h-auto rounded-xl bg-modalBgClr">
                      <div className="flex justify-between items-center pb-2">
                          <Dialog.Title className="font-bold text-xl">{selectedStudent.name}</Dialog.Title>
                          <button onClick={() => setOpenStudentInfo(false)}>
                          <AiOutlineClose
                              size={28}
                              className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                          />
                          </button>
                      </div>
                      <form onSubmit={handleStudentInfoSubmit} className="flex flex-col">
                        {alert ? <p className="font-bold text-red-500 pb-1">{alertMessage}</p> : <label htmlFor="name" className="pb-1">First name</label> }
                          <input
                            className={alert ? "border-2 border-red-500 w-full rounded-lg p-2 outline-none" : "border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr"}
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={selectedStudent.name}
                            onChange={updateStudentName}
                          />
                          <label htmlFor="dob" className="pt-3">Date of birth</label>
                          <input
                            className="border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr" 
                            type="date"
                            id="dob"
                            name="dob"
                            required
                            value={selectedStudent.dob}
                            onChange={updateStudentDob}
                          />
                            
                          <div className="flex flex-col md:flex-row items-center mt-5">
                              <button onClick={removeStudent} type="button" className="md:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold">Remove student from class</button>
                              <div className="flex items-center justify-center gap-2 mt-3 md:mt-0">
                                  <button 
                                    onClick={() => setOpenStudentInfo(false)} 
                                    type="button" 
                                    className="bg-modalBgClr hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    disabled={!selectedStudent.name.trim()} 
                                    className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-3 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                  >
                                    Save
                                  </button>
                              </div>
                          </div>
                      </form>
                    </Dialog.Panel>
                </div>
                </Dialog>
            )}
          </Dialog>
      
        </>
      )
      
}

export default EditStudents